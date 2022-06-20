import { CreateAvailabilityCalendarEvent } from "../components/scheduling/BigBookingCalendar";
import { AvailabilityState } from "../components/types/calendar/types";

export interface PostAvailabilityPayload {
  timeframe: { from: Date; until: Date };
  events: CreateAvailabilityCalendarEvent[];
}

class ApiAdaptor {
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
    // Overwrites availability for a given period
  }

  static async updateAvailabilityEntry(
    entryId: string,
    entry: CreateAvailabilityCalendarEvent
  ) {}
}

export default ApiAdaptor;
