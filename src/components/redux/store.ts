import { configureStore } from "@reduxjs/toolkit";
import themeModeReducer from "./reducers/darkMode";
import availabilityReducer from "./reducers/calendar/availabilitySlice";
import editAvailabilityConfigReducer from "./reducers/calendar/editAvailabilitySlice";

export const store = configureStore({
  reducer: {
    themeMode: themeModeReducer,
    availability: availabilityReducer,
    editAvailabilityConfig: editAvailabilityConfigReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
