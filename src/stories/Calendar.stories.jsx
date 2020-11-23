import { subDays } from "date-fns/esm";
import React from "react";

import Calendar from "../components/Calendar";

export default {
  title: "app/Calendar",
  component: Calendar,
  argTypes: {
    date: { control: "date" },
  },
};

const Template = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const GivenDate = Template.bind({});
GivenDate.args = {
  date: subDays(new Date(), 7),
};
