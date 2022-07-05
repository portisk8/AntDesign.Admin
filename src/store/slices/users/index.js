import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import { axiosRequest } from "../../../utils/requests";
import CONFIG from "../../../common/environment";
import { loginService } from "../../../services/user";

const API_URL = CONFIG.API_URL;

export const userSlice = createSlice({
  name: "users",
  initialState: {
    logedIn: false,
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.logedIn = true;
      const user = jwt(action.payload.access_token); // decode your token here

      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    deleteCurrentUser: (state, action) => {
      state.currentUser = null;
      state.logedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    },
  },
});

export const { setCurrentUser, deleteCurrentUser } = userSlice.actions;

export default userSlice.reducer;

// export const login = () =>{
//     return ()=>{}
// }
//Mejor diseñado
export const login = (user) => async (dispatch) => {
  let param = {
    username: user.username,
    password: user.password,
  };
  const response = await loginService(param);

  if (!response.data) return;
  dispatch(setCurrentUser(response.data));
  return response.data;
};

export const logout = () => async (dispatch) => {
  console.log("DELETE USER");
  dispatch(deleteCurrentUser());
};
