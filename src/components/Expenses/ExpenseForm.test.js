import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ExpenseForm from "./ExpenseForm";

const mockStore = configureMockStore();

describe("ExpenseForm", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      expense: {
        totalAmount: 0,
        premium: false,
      },
    });
  });

  it("should render a form with expense input, description input, and category input", () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    expect(screen.getByLabelText(/expense/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });

  it("should show an error message if expense input is not valid", () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    const expenseInput = screen.getByLabelText(/expense/i);
    fireEvent.change(expenseInput, { target: { value: "" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please enter a valid expense amount/i)).toBeInTheDocument();
  });

  it("should show an error message if description input is not valid", () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    const descriptionInput = screen.getByLabelText(/description/i);
    fireEvent.change(descriptionInput, { target: { value: "" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please enter a description/i)).toBeInTheDocument();
  });

  it("should show an error message if category input is not valid", () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    const categoryInput = screen.getByLabelText(/category/i);
    fireEvent.change(categoryInput, { target: { value: "" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please enter a category/i)).toBeInTheDocument();
  });
});