import { addMonths } from "date-fns";
import React from "react";

import MonthView from "../components/MonthView";

export default {
  title: "components/MonthView",
  component: MonthView,
};

export const Default = (args) => <MonthView {...args} />;
Default.args = {
  displayDate: new Date(),
  selectedDate: addMonths(new Date(), 1),
};
