export interface EditAvailabilityEntry {
  id: string;
  start: number | null;
  end: number | null;
}
export interface CompleteEditAvailabilityEntry extends EditAvailabilityEntry {
  start: number;
  end: number;
}

export const editAvailabilityEntryIsComplete = (
  entry: EditAvailabilityEntry
): entry is CompleteEditAvailabilityEntry =>
  Boolean(entry.end) && Boolean(entry.start);
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
