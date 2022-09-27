export interface PaginationParams {
  limit?: number;
  page?: number;
}

export interface PostAvailabilityPayload {
  timeframe: { start: Date; end: Date };
  events: CreateAvailabilityCalendarEvent[];
}

interface GetAvailabilityResponseEntry {
  end: string;
  id?: string;
  start: string;
}

interface GetAvailabilityResponse {
  booked: GetAvailabilityResponseEntry[];
  available: GetAvailabilityResponseEntry[];
}
