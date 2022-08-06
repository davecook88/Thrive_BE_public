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

export interface PaginationParams {
  limit?: number;
  page?: number;
}

export interface PostAvailabilityPayload {
  timeframe: { start: Date; end: Date };
  events: CreateAvailabilityCalendarEvent[];
}

enum ApiEndpoints {
  verifyGoogleToken = "/auth/google",
  teacherAvailability = "/bookings/teacher-availability",
  paymentCreateIntent = "/payment/create-payment-intent",
  course = "/course",
  courseClass = "/course/class",
  teacher = "/teacher",
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
    }
  ) {
    const token = options?.token || getTokenFromLocalStorage();
    if (!token) {
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
      params: options?.params,
    });
    return res.data;
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
    })) as { secret: string };
  }

  static async getCourseById(id: string) {
    return await this.callApi(`${ApiEndpoints.course}/${id}`, "GET");
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

  static async listTeachers() {
    return (await this.callApi(
      ApiEndpoints.teacher,
      "GET",
      {}
    )) as ListTeachersResponse[];
  }
}

export default ApiAdaptor;
