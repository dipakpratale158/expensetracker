import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = { theme: "light" };

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    switchTheme(state) {
      if (state.theme === "light") {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
