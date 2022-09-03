import { CreateAvailabilityCalendarEvent } from "../components/scheduling/BigBookingCalendar";
import { AvailabilityState } from "../components/types/calendar/types";
import axios from "axios";
import { getTokenFromLocalStorage } from "../auth/utils";
import { ThriveUser } from "../auth/types";
import moment from "moment";
import { CreatePaymentIntentPayload } from "../components/payment/stripe/types";
import {
  CreateCourseClassPayload,
  CreateCoursePayload,
} from "../components/types/course/payloads";
import { ListTeachersResponse } from "../components/types/teacher/responses";
import {
  CreateLevelPayload,
  CreateUnitPayload,
} from "../components/types/level/payloads";
import { RouteCreator } from "../components/utils/routeConstants";

export interface PaginationParams {
  limit?: number;
  page?: number;
}

export interface PostAvailabilityPayload {
  timeframe: { start: Date; end: Date };
  events: CreateAvailabilityCalendarEvent[];
}

export enum ApiEndpoints {
  verifyGoogleToken = "/auth/google",
  teacherAvailability = "/bookings/teacher-availability",
  paymentCreateIntent = "/payment/create-payment-intent",
  course = "/course",
  courseClass = "/course/class",
  teacher = "/teacher",
  teacherAdmin = "/admin/teacher",
  level = "/level",
  unit = "/level/unit",
  bookCourse = "/book/course",
  user = "/user",
}

export class MissingTokenError extends Error {}

class ApiAdaptor {
  static client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
  });

  private static async callApi(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    options?: {
      payload?: object;
      token?: string;
      params?: object;
      serverSide?: boolean;
      noAuth?: boolean;
    }
  ) {
    const token = options?.noAuth
      ? null
      : options?.token || ApiAdaptor.getToken(options?.serverSide);
    if (!token && !options?.noAuth) {
      throw new MissingTokenError();
    }
    const res = await ApiAdaptor.client.request({
      method,
      url,
      data: options?.payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      validateStatus: (status) => true,
      params: options?.params,
    });
    return res.data;
  }

  private static getToken(serverSide?: boolean) {
    const token = serverSide
      ? process.env.SERVER_SIDE_TOKEN
      : getTokenFromLocalStorage();
    if (!token) {
      throw new MissingTokenError();
    }
    return token;
  }

  static async verifyGoogleToken(
    token: string,
    email: string,
    googleId: string
  ) {
    const respone = await ApiAdaptor.callApi(
      ApiEndpoints.verifyGoogleToken,
      "POST",
      {
        payload: {
          token,
          email,
          google_id: googleId,
        },
        token,
      }
    );
    return respone as ThriveUser;
  }

  static async getAvailability(
    fromDate: Date,
    untilDate: Date,
    limit: number = 100,
    page: number = 1
  ) {
    const response: BaseAPIAvailability[] = await this.callApi(
      ApiEndpoints.teacherAvailability,
      "GET",
      {
        params: {
          from_date: fromDate,
          until_date: untilDate,
          limit,
          page,
        },
      }
    );
    response.forEach((entry) => {
      console.log(new Date(entry.start), new Date(entry.end));
    });

    const result: AvailabilityState = {
      loadStatus: "ready",
      booked: [],
      available: response.map((entry) => ({
        end: moment.utc(entry.end).valueOf(),
        start: moment.utc(entry.start).valueOf(),
        status: entry.type,
        id: entry.id,
      })),
      unavailable: [],
    };

    return result;
  }

  static async postAvailability(payload: PostAvailabilityPayload) {
    return await this.callApi(ApiEndpoints.teacherAvailability, "POST", {
      payload,
    });
    // Overwrites availability for a given period
  }

  static async updateAvailabilityEntry(
    entryId: string,
    entry: CreateAvailabilityCalendarEvent
  ) {
    return await this.callApi(
      `${ApiEndpoints.teacherAvailability}/${entryId}`,
      "PUT",
      {
        payload: {
          ...entry,
          start: entry.start.toISOString(),
          end: entry.end.toISOString(),
        },
      }
    );
  }

  static async deleteAvailabilityEntry(entryId: string) {
    return await this.callApi(
      `${ApiEndpoints.teacherAvailability}/${entryId}`,
      "DELETE"
    );
  }

  static async createStripePaymentIntent(payload: CreatePaymentIntentPayload) {
    return (await this.callApi(`${ApiEndpoints.paymentCreateIntent}`, "POST", {
      payload,
      noAuth: true,
    })) as { secret: string };
  }

  static async listLevels(params?: PaginationParams) {
    return await this.callApi(`${ApiEndpoints.level}`, "GET", {
      params,
      noAuth: true,
    });
  }

  static async getLevelById(levelId: number) {
    return await this.callApi(`${ApiEndpoints.level}/${levelId}`, "GET");
  }

  static async postLevel(payload?: CreateLevelPayload) {
    return await this.callApi(`${ApiEndpoints.level}`, "POST", {
      payload,
    });
  }

  static async putLevel(levelId: number, payload?: CreateLevelPayload) {
    return await this.callApi(`${ApiEndpoints.level}/${levelId}`, "PUT", {
      payload,
    });
  }

  static async deleteLevel(levelId: number) {
    return await this.callApi(`${ApiEndpoints.level}/${levelId}`, "DELETE");
  }

  static async listUnits(levelId: number) {
    return await this.callApi(`${ApiEndpoints.level}/${levelId}/units`, "GET");
  }

  static async listLevelCourses(levelId: number) {
    return await this.callApi(
      RouteCreator.listLevelCoursesRoute(levelId),
      "GET",
      { noAuth: true }
    );
  }

  static async postUnit(payload?: CreateUnitPayload) {
    return await this.callApi(`${ApiEndpoints.unit}`, "POST", {
      payload,
    });
  }

  static async putUnit(unitId: number, payload?: CreateUnitPayload) {
    return await this.callApi(`${ApiEndpoints.unit}/${unitId}`, "PUT", {
      payload,
    });
  }

  static async deleteUnit(unitId: number) {
    return await this.callApi(`${ApiEndpoints.unit}/${unitId}`, "DELETE");
  }

  static async getCourseById(id: number, options?: { serverSide?: boolean }) {
    return await this.callApi(`${ApiEndpoints.course}/${id}`, "GET", {
      serverSide: options?.serverSide || false,
      noAuth: true,
    });
  }

  static async listCourses(params?: PaginationParams) {
    return await this.callApi(`${ApiEndpoints.course}`, "GET", {
      params,
    });
  }

  static async postCourse(payload: CreateCoursePayload) {
    return await this.callApi(ApiEndpoints.course, "POST", {
      payload,
    });
  }

  static async putCourse(courseId: number, payload: CreateCoursePayload) {
    return await this.callApi(`${ApiEndpoints.course}/${courseId}`, "PUT", {
      payload,
    });
  }

  static async deleteCourse(courseId: number) {
    return await this.callApi(`${ApiEndpoints.course}/${courseId}`, "DELETE");
  }

  static async postCourseClass(payload: CreateCourseClassPayload) {
    return await this.callApi(ApiEndpoints.courseClass, "POST", {
      payload,
    });
  }

  static async putCourseClass(
    courseClassId: number,
    payload: CreateCourseClassPayload
  ) {
    return await this.callApi(
      `${ApiEndpoints.courseClass}/${courseClassId}`,
      "POST",
      {
        payload,
      }
    );
  }

  static async deleteCourseClass(courseClassId: number) {
    return await this.callApi(
      `${ApiEndpoints.courseClass}/${courseClassId}`,
      "DELETE"
    );
  }

  static async listTeachers(options?: { serverSide?: boolean }) {
    return (await this.callApi(ApiEndpoints.teacher, "GET", {
      serverSide: options?.serverSide,
    })) as ListTeachersResponse[];
  }

  static async createTeacher(email: string) {
    return await this.callApi(`${ApiEndpoints.teacherAdmin}/add`, "POST", {
      payload: { email },
    });
  }

  static async getUserMe() {
    return await this.callApi(RouteCreator.userMeRoute(), "GET", {});
  }
}

export default ApiAdaptor;
