interface GetAvailabilityResponseEntry {
  end: string;
  id?: string;
  start: string;
}

interface GetAvailabilityResponse {
  booked: GetAvailabilityResponseEntry[];
  available: GetAvailabilityResponseEntry[];
}
