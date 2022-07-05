import { createSlice } from "@reduxjs/toolkit";
import {
  clearNotificationsService,
  getNotificationsService,
} from "../../../services/notificationService";
import { setKeyTable } from "../../../utils/utils";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    loading: false,
    notificationList: [],
    hub: null,
    totalNotificationsPending: 0,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setNotificationList: (state, action) => {
      state.notificationList = setKeyTable(action.payload);
    },
    setHub: (state, action) => {
      state.hub = action.payload;
    },
    setTotalNotificationsPending: (state, action) => {
      state.totalNotificationsPending = action.payload;
    },
    incrementTotalNotificationsPending: (state, action) => {
      state.totalNotificationsPending += 1;
    },
  },
});

export const {
  setLoading,
  setNotificationList,
  setHub,
  setTotalNotificationsPending,
  incrementTotalNotificationsPending,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

//Mejor diseñado
export const getNotifications = () => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await getNotificationsService();
  dispatch(setLoading(false));
  if (!response.data) return;
  dispatch(setNotificationList(response.data));
  return response.data;
};

export const clearNotifications = () => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await clearNotificationsService();
  dispatch(setLoading(false));
  if (!response.data) return;
  dispatch(setNotificationList([]));
  return response.data;
};
