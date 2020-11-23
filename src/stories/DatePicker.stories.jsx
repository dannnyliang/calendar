import React from "react";

import DatePicker from "../components/DatePicker";

export default {
  title: "app/DatePicker",
  component: DatePicker,
};

export const Default = (args) => <DatePicker {...args} />;
Default.args = {};
