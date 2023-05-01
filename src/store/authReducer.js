import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialEmail = localStorage.getItem("email");

const userIsLoggedIn = !!initialToken;
const initialAuthState = {
  isAuthenticated: userIsLoggedIn,
  token: initialToken,
  email: initialEmail,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      console.log(action);
      state.token = action.payload.token;
      state.email = action.payload.email;
      console.log(state.email);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);

      state.isAuthenticated = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
