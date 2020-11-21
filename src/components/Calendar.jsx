import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";

import { VIEW } from "../constant";
import { WHITE } from "../styles/color";
import ControlBar from "./ControlBar";
import DateView from "./DateView";
import MonthView from "./MonthView";
import YearView from "./YearView";

function getLowerView(currentView) {
  switch (currentView) {
    case VIEW.DATE:
      return VIEW.DATE;
    case VIEW.MONTH:
      return VIEW.DATE;
    case VIEW.YEAR:
      return VIEW.MONTH;
  }
}

function getHigherView(currentView) {
  switch (currentView) {
    case VIEW.DATE:
      return VIEW.MONTH;
    case VIEW.MONTH:
      return VIEW.YEAR;
    case VIEW.YEAR:
      return VIEW.YEAR;
  }
}

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
  const { className, date, onSelect } = props;
  const initialDate = date ? new Date(date) : new Date();

  const [currentView, setCurrentView] = useState(initialView);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [displayDate, setDisplayDate] = useState(initialDate);

  const handleChangeDisplay = (displayDate) => setDisplayDate(displayDate);

  const handleChangeView = (displayDate) => {
    if (displayDate) {
      setCurrentView(getLowerView);
      handleChangeDisplay(displayDate);
    } else {
      setCurrentView(getHigherView);
    }
  };

  const handleSelectDate = (selectedDate) => {
    setSelectedDate(selectedDate);
    handleChangeView(selectedDate);
    onSelect?.(selectedDate);
  };

  return (
    <div className={className}>
      <ControlBar
        currentView={currentView}
        displayDate={displayDate}
        onChangeView={handleChangeView}
        onChangeDisplay={handleChangeDisplay}
      />
      {currentView === VIEW.DATE && (
        <DateView
          selectedDate={selectedDate}
          displayDate={displayDate}
          onSelectDate={handleSelectDate}
        />
      )}
      {currentView === VIEW.MONTH && (
        <MonthView
          selectedDate={selectedDate}
          displayDate={displayDate}
          onChangeView={handleChangeView}
        />
      )}
      {currentView === VIEW.YEAR && (
        <YearView
          selectedDate={selectedDate}
          displayDate={displayDate}
          onChangeView={handleChangeView}
        />
      )}
    </div>
  );
}

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;

const StyledCalendar = styled(Calendar)`
  max-width: 400px;
  background-color: ${WHITE};
  position: relative;
`;

StyledCalendar.propTypes = propTypes;
StyledCalendar.defaultProps = defaultProps;

export default StyledCalendar;
