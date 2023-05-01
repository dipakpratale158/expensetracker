import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
   expense: [], 
  totalAmount: 0,
   premium: false 
  };

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      console.log(action.payload);
      state.expense = [...action.payload];

      state.totalAmount = 0;
      for (let i = 0; i < state.expense.length; i++) {
        state.totalAmount += Number(state.expense[i].expense);
      }

      console.log(state.totalAmount);
    },
    activatePremium(state) {
      state.premium = true;
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
