import { render } from "@testing-library/react";
import React from "react";

import App from "../App";

test("renders app", () => {
  const wrapper = render(<App />);

  const datePickerLabel = wrapper.getByText(/datepicker/i);
  expect(datePickerLabel).toBeInTheDocument();

  const calendarLabel = wrapper.getByText(/calendar$/i);
  expect(calendarLabel).toBeInTheDocument();
});
