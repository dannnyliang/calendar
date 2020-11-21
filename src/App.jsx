import { format } from "date-fns";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";

import Calendar from "./components/Calendar";
import DatePicker from "./components/DatePicker";

const propTypes = {
  className: PropTypes.string,
};

function App(props) {
  const [date, setDate] = useState(null);
  const handleSelect = (date) => setDate(date);

  return (
    <div className={props.className}>
      Hello React
      <h1>DatePicker</h1>
      <DatePicker />
      <br />
      <h1>Calendar</h1>
      <div className="selected-date">
        Selected Date: {date && format(date, "yyyy-MM-dd")}
      </div>
      <Calendar date={date} onSelect={handleSelect} />
    </div>
  );
}

App.propTypes = propTypes;

const StyledApp = styled(App)`
  text-align: center;

  ${Calendar}, ${DatePicker} {
    margin: 0 auto;
  }
`;

export default StyledApp;
