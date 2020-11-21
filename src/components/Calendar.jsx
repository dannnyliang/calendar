import { format } from "date-fns";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { VIEW } from "../constant";
import { getHigherView, getLowerView } from "../utils";
import ControlBar from "./ControlBar";
import DateView from "./DateView";
import MonthView from "./MonthView";
import YearView from "./YearView";

const propTypes = {
  className: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSelect: PropTypes.func,
};

const defaultProps = {
  date: null,
};

const initialView = VIEW.DATE;

function Calendar(props) {
  const { date, onSelect } = props;
  const initialDate = new Date(date);

  const [currentView, setCurrentView] = useState(initialView);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleSelectDate = (selectedDate) => {
    setSelectedDate(selectedDate);
    onSelect?.(selectedDate);
  };

  const handleChangeView = (selectedDate) => {
    if (selectedDate) {
      setCurrentView(getLowerView);
      handleSelectDate(selectedDate);
    } else {
      setCurrentView(getHigherView);
    }
  };

  return (
    <>
      <div>{format(selectedDate, "yyyy-MM-dd")}</div>
      <ControlBar
        currentView={currentView}
        selectedDate={selectedDate}
        handleChangeView={handleChangeView}
        handleSelectDate={handleSelectDate}
      />
      {currentView === VIEW.DATE && (
        <DateView
          selectedDate={selectedDate}
          handleSelectDate={handleSelectDate}
        />
      )}
      {currentView === VIEW.MONTH && (
        <MonthView
          selectedDate={selectedDate}
          handleChangeView={handleChangeView}
        />
      )}
      {currentView === VIEW.YEAR && (
        <YearView
          selectedDate={selectedDate}
          handleChangeView={handleChangeView}
        />
      )}
    </>
  );
}

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;

export default Calendar;
