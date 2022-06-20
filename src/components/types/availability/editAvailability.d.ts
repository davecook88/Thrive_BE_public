export interface EditAvailabilityEntry {
  id: string;
  start: string | null;
  end: string | null;
}

export interface EditAvailabilityObject {
  [key: string]: EditAvailabilityEntry[];
}

export interface EditAvailabilityState {
  dayNames: string[];
  config: EditAvailabilityObject;
}

export interface AddAvailabilityEntryPayload {
  dayName: string;
}
export interface RemoveAvailabilityEntryPayload {
  dayName: string;
}

export interface EditAvailabilityEntryPayload {
  dayName: string;
  entryIndex: number;
  entry: EditAvailabilityEntry;
}

export interface ClearEditAvailabilityStorePayload {}
