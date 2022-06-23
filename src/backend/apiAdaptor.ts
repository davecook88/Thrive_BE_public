import { CreateAvailabilityCalendarEvent } from "../components/scheduling/BigBookingCalendar";
import { AvailabilityState } from "../components/types/calendar/types";
import axios from "axios";
import { getTokenFromLocalStorage } from "../auth/utils";
import { ThriveUser } from "../auth/types";

export interface PostAvailabilityPayload {
  timeframe: { start: Date; end: Date };
  events: CreateAvailabilityCalendarEvent[];
}

enum ApiEndpoints {
  verifyGoogleToken = "/auth/google",
  teacherAvailability = "/bookings/teacher-availability",
}

export class MissingTokenError extends Error {}

class ApiAdaptor {
  static client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
  });

  private static async callApi(
    url: string,
    method: "GET" | "POST" | "PUT",
    options?: {
      payload?: object;
      token?: string;
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
      },
    });
    debugger;
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

  static async getAvailability() {
    const result: AvailabilityState = {
      loadStatus: "ready",
      booked: [
        {
          id: "1",
          start: new Date("2022-06-23T12:48:33.492Z").getTime(),
          end: new Date("2022-06-23T14:48:33.492Z").getTime(),
          status: "booked",
          title: "Karen: Basic 101",
        },
      ],
      available: [
        {
          id: "2",
          start: new Date("2022-06-20").getTime(),
          end: new Date("2022-06-25").getTime(),
          status: "available",
        },
      ],
      unavailable: [],
    };
    return result;
  }

  static async postAvailability(payload: PostAvailabilityPayload) {
    debugger;
    return await this.callApi(ApiEndpoints.teacherAvailability, "POST", {
      payload,
    });
    // Overwrites availability for a given period
  }

  static async updateAvailabilityEntry(
    entryId: string,
    entry: CreateAvailabilityCalendarEvent
  ) {}
}

export default ApiAdaptor;
