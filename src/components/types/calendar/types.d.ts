type BookingStatus = "available" | "booked" | "unavailable";
type LoadStatus = "ready" | "loading" | "error";

export interface AvailabilityState {
  loadStatus: LoadStatus;
  available: AvailabilityStateEntry[];
  booked: AvailabilityStateEntry[];
  unavailable: AvailabilityStateEntry[];
}

export interface AvailabilityStateEntry {
  title?: string;
  status: BookingStatus;
  from: Date;
  until: Date;
}

interface SetAvailabilityAction {
  status: BookingStatus;
  entries: AvailabilityStateEntry[];
}
