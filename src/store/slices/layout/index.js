import { createSlice } from "@reduxjs/toolkit";

const breadcrumbInit = [{ label: "Inicio", path: "/", isClickeable: true }];

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    sideMenuCollapsed: false,
    breadCrumb: [{ label: "Inicio", path: "/", isClickeable: true }],
  },
  reducers: {
    sideMenuCollapse: (state, action) => {
      state.sideMenuCollapsed =
        action.payload == undefined ? !state.sideMenuCollapsed : action.payload;
    },
    setBreadcrumb: (state, action) => {
      state.breadCrumb = breadcrumbInit.copyWithin();
      state.breadCrumb = state.breadCrumb.concat(action.payload);
    },
  },
});

export const { sideMenuCollapse, setBreadcrumb } = layoutSlice.actions;

export default layoutSlice.reducer;
