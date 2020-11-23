import { subDays } from "date-fns";
import React from "react";

import DatePicker from "../components/DatePicker";

export default {
  title: "app/DatePicker",
  component: DatePicker,
  argTypes: {
    date: { control: "date" },
  },
};

const Template = (args) => <DatePicker {...args} />;

export const Controlled = Template.bind({});
Controlled.args = {
  date: subDays(new Date(), 7),
};

export const UnControlled = Template.bind({});
UnControlled.args = {};
