import { configureStore } from "@reduxjs/toolkit";
//reducers
import users from "./slices/users";
import layout from "./slices/layout";
export default configureStore({
  reducer: {
    users,
    layout,
  },
});
