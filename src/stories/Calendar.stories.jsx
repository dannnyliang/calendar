import { subDays } from "date-fns/esm";
import React from "react";

import Calendar from "../components/Calendar";

export default {
  title: "app/Calendar",
  component: Calendar,
};

export const Default = (args) => <Calendar {...args} />;
Default.args = {
  date: subDays(new Date(), 7),
};
