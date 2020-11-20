import { render } from "@testing-library/react";
import React from "react";

import App from "./App";

test("renders app", () => {
  const wrapper = render(<App />);
  const app = wrapper.getByText(/hello react/i);
  expect(app).toBeInTheDocument();
});
