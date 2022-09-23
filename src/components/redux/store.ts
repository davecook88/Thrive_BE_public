import { configureStore } from "@reduxjs/toolkit";
import availabilityReducer from "./reducers/calendar/availabilitySlice";
import editAvailabilityConfigReducer from "./reducers/calendar/editAvailabilitySlice";
import userReducer from "../../auth/userSlice";
import toastReducer from "../common/alerts/toastSlice";
import adminReducer from "../admin/adminSlice";
import teacherProfilePageReducer from "./reducers/teachers/TeacherProfilePageSlice/slice";
import teacherReducer from "./reducers/teachers/teacherSlice";
import bookingReducer from "./reducers/bookings/bookingsSlice";

export const store = configureStore({
  reducer: {
    availability: availabilityReducer,
    editAvailabilityConfig: editAvailabilityConfigReducer,
    user: userReducer,
    toast: toastReducer,
    admin: adminReducer,
    teacherProfilePage: teacherProfilePageReducer,
    teachers: teacherReducer,
    bookings: bookingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
