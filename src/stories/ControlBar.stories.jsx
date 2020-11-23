import React from "react";

import ControlBar from "../components/ControlBar";
import { VIEW } from "../constant";

export default {
  title: "components/ControlBar",
  component: ControlBar,
  argTypes: {
    currentView: {
      control: {
        type: "inline-radio",
        options: Object.values(VIEW),
      },
    },
  },
};

const Template = (args) => <ControlBar {...args} />;

export const DateView = Template.bind({});
DateView.args = {
  displayDate: new Date(),
  currentView: VIEW.DATE,
};

export const MonthView = Template.bind({});
MonthView.args = {
  displayDate: new Date(),
  currentView: VIEW.MONTH,
};

export const YearView = Template.bind({});
YearView.args = {
  displayDate: new Date(),
  currentView: VIEW.YEAR,
};
