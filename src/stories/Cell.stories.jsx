import React from "react";

import Cell from "../components/Cell";

export default {
  title: "components/Cell",
  component: Cell,
  argTypes: {
    children: { control: "text" },
  },
};

const Template = (args) => (
  <div style={{ width: 100 }}>
    <Cell {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = { children: 15 };

export const UnClickable = Template.bind({});
UnClickable.args = { clickable: false, children: 15 };

export const Active = Template.bind({});
Active.args = { isActive: true, children: 15 };

export const Current = Template.bind({});
Current.args = { isCurrent: true, children: 15 };

export const Disable = Template.bind({});
Disable.args = { disabled: true, children: 15 };
