import { addDays } from "date-fns";
import React from "react";

import DateView from "../components/DateView";

export default {
  title: "components/DateView",
  component: DateView,
  argTypes: {
    displayDate: { control: "date" },
    selectedDate: { control: "date" },
  },
};

export const Default = (args) => <DateView {...args} />;
Default.args = {
  displayDate: new Date(),
  selectedDate: addDays(new Date(), 1),
};
