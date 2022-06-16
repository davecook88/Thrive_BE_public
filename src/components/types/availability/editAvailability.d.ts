export interface EditAvailabilityEntry {
  from: string | null;
  until: string | null;
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
