import { addYears } from "date-fns";
import React from "react";

import YearView from "../components/YearView";

export default {
  title: "components/YearView",
  component: YearView,
  argTypes: {
    displayDate: { control: "date" },
    selectedDate: { control: "date" },
  },
};

export const Default = (args) => <YearView {...args} />;
Default.args = {
  displayDate: new Date(),
  selectedDate: addYears(new Date(), 1),
};
