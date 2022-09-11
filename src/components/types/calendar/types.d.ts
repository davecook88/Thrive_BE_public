type BookingStatus = "available" | "booked" | "unavailable";
type LoadStatus = "ready" | "loading" | "error";

export interface AvailabilityState {
  loadStatus: LoadStatus;
  available: AvailabilityStateEntry[];
  booked: AvailabilityStateEntry[];
  unavailable: AvailabilityStateEntry[];
}

export interface AvailabilityStateEntry {
  id?: string;
  start: number;
  end: number;
}

interface SetAvailabilityAction {
  status: BookingStatus;
  entries: AvailabilityStateEntry[];
}
