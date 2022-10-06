import axios from "axios";
import { getTokenFromLocalStorage } from "../auth/utils";
import { ThriveUser } from "../auth/types";
import { CreatePaymentIntentPayload } from "../components/payment/stripe/types";
import {
  CreateCourseClassPayload,
  CreateCoursePayload,
} from "../components/types/course/payloads";
import {
  ListTeachersResponse,
  TeacherResponse,
} from "../components/types/teacher/responses";
import {
  CreateLevelPayload,
  CreateUnitPayload,
} from "../components/types/level/payloads";
import { RouteCreator } from "../components/utils/routeConstants";
import { CreateAvailabilityCalendarEvent } from "../components/scheduling/BigBookingCalendar/types";
import {
  CreatePrivateClassBookingPayload,
  CreatePrivateClassCoursePayload,
  CreatePrivateClassPackagePayload,
  PrivateClassOptionBase,
} from "../components/types/privateClass/payloads";
import {
  PrivateClassOption,
  PrivateClassPackageBooking,
} from "../components/types/privateClass/responses";
import { Course } from "../components/types/course/responses";
import { ListPackageBookingsParams } from "./params";
import { ApiEndpoints, MissingTokenError } from "./constants";
import {
  GetAvailabilityResponse,
  PaginationParams,
  PostAvailabilityPayload,
} from "./types";
import {
  AddCourseBookingLineItemPayload,
  AddPackageBookingLineItemPayload,
} from "../components/types/invoice/payloads";

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
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const res = await ApiAdaptor.client.request({
      method,
      url,
      data: options?.payload,
      headers,
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
    teacherId: number,
    fromDate: Date,
    untilDate: Date,
    limit: number = 100,
    page: number = 1
  ) {
    const response = await this.callApi(
      `${ApiEndpoints.teacherAvailability}/${teacherId}`,
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
    return response as GetAvailabilityResponse;
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

  static async postPrivateClassOption(payload: PrivateClassOptionBase) {
    return (await this.callApi(
      `${ApiEndpoints.privateClass}/create_option`,
      "POST",
      { payload }
    )) as PrivateClassOption;
  }

  static async putPrivateClassOption(
    optionId: number,
    payload: PrivateClassOptionBase
  ) {
    return (await this.callApi(
      `${ApiEndpoints.privateClass}/${optionId}`,
      "PUT",
      { payload }
    )) as PrivateClassOption;
  }

  static async deletePrivateClassOption(privateClassOptionId: number) {
    return (await this.callApi(
      `${ApiEndpoints.privateClass}/${privateClassOptionId}`,
      "DELETE"
    )) as PrivateClassOption;
  }

  static async listPrivateClassesByTeacher(teacherId: number) {
    return (await this.callApi(
      `${ApiEndpoints.privateClass}/teacher/${teacherId}`,
      "GET"
    )) as PrivateClassOption[];
  }

  static async createPrivateClassCourse(
    privateClassOptionId: number,
    payload: CreatePrivateClassCoursePayload
  ) {
    return (await this.callApi(
      `${ApiEndpoints.privateClass}/create-course/${privateClassOptionId}`,
      "POST",
      { payload }
    )) as Course;
  }

  static async createPrivateClassPackage(
    privateClassOptionId: number,
    payload: CreatePrivateClassPackagePayload
  ) {
    return await this.callApi(
      `${ApiEndpoints.privateClass}/${privateClassOptionId}/package`,
      "POST",
      { payload }
    );
  }

  static async deletePrivateClassPackage(packageId: number) {
    return await this.callApi(
      `${ApiEndpoints.privateClass}/package/${packageId}`,
      "DELETE"
    );
  }

  static async createPrivateClassPackageBooking(
    packageId: number,
    payload: CreatePrivateClassBookingPayload
  ) {
    /*
    This creates the private class package booking so that a payment
    intent can be issued against it.

    Once the payment intent is marked paid, the package booking will be activated.

    */
    return await this.callApi(
      `${ApiEndpoints.privateClass}/package/${packageId}/create-booking`,
      "POST",
      { payload }
    );
  }

  static async listPrivatePackageBookings(params?: ListPackageBookingsParams) {
    return (await this.callApi(
      `${ApiEndpoints.privateClass}/package-booking/list`,
      "GET",
      { params }
    )) as PrivateClassPackageBooking[];
  }

  static async bookPrivateClassPackageBooking(
    packageId: number,
    start_time: Date
  ) {
    /*
    If a student has an active package and want to use their credits to book a 
    class, this is the route to use.
    */
    return await this.callApi(
      `${ApiEndpoints.privateClass}/package-booking/${packageId}/book`,
      "POST",
      {
        payload: {
          start_time,
        },
      }
    );
  }

  static async listTeachers(options?: { serverSide?: boolean }) {
    return (await this.callApi(ApiEndpoints.teacher, "GET", {
      serverSide: options?.serverSide,
    })) as ListTeachersResponse[];
  }

  static async getTeacherById(
    teacherId: number,
    options?: { serverSide?: boolean }
  ) {
    const url = `${ApiEndpoints.teacher}/${teacherId}`;

    return (await this.callApi(url, "GET", {
      serverSide: options?.serverSide,
    })) as TeacherResponse;
  }

  static async createTeacher(email: string) {
    return await this.callApi(`${ApiEndpoints.teacherAdmin}/add`, "POST", {
      payload: { email },
    });
  }

  static async getUserMe() {
    return await this.callApi(RouteCreator.userMeRoute(), "GET", {});
  }

  static async getPaymentConfirmation(paymentIntentId: string) {
    return await this.callApi(
      `${ApiEndpoints.payment}/confirmation?payment_intent_id=${paymentIntentId}`,
      "GET"
    );
  }

  static async getInvoice(invoiceId: number) {
    return await this.callApi(`${ApiEndpoints.invoice}/${invoiceId}`, "GET");
  }

  static async createInvoice() {
    return await this.callApi(`${ApiEndpoints.invoice}`, "POST");
  }

  static async addPackageBookingLineItem(
    invoiceId: number,
    payload: AddPackageBookingLineItemPayload
  ) {
    return await this.callApi(
      `${ApiEndpoints.invoice}/${invoiceId}/item/booking`,
      "POST",
      { payload }
    );
  }
  static async addCourseLineItem(
    invoiceId: number,
    payload: AddCourseBookingLineItemPayload
  ) {
    return await this.callApi(
      `${ApiEndpoints.invoice}/${invoiceId}/item/course`,
      "POST",
      { payload }
    );
  }

  static async deleteLineItem(invoiceId: number, lineItemId: number) {
    return await this.callApi(
      `${ApiEndpoints.invoice}/${invoiceId}/item/${lineItemId}`,
      "DELETE"
    );
  }
}

export default ApiAdaptor;
