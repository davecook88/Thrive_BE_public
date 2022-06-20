type BookingStatus = "available" | "booked" | "unavailable";
type LoadStatus = "ready" | "loading" | "error";

export interface AvailabilityState {
  loadStatus: LoadStatus;
  available: AvailabilityStateEntry[];
  booked: AvailabilityStateEntry[];
  unavailable: AvailabilityStateEntry[];
}

export interface AvailabilityStateEntry {
  id: string;
  title?: string;
  status: BookingStatus;
  start: Date;
  end: Date;
}

interface SetAvailabilityAction {
  status: BookingStatus;
  entries: AvailabilityStateEntry[];
}
