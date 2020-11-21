import { format } from "date-fns";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";

import { VIEW } from "../constant";
import { BREAKPOINTS } from "../styles/breakpoints";
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
    <div className={className}>
      <div className="selected-date">
        Selected Date: {format(selectedDate, "yyyy-MM-dd")}
      </div>
      <ControlBar
        currentView={currentView}
        selectedDate={selectedDate}
        onChangeView={handleChangeView}
        onSelectDate={handleSelectDate}
      />
      {currentView === VIEW.DATE && (
        <DateView selectedDate={selectedDate} onSelectDate={handleSelectDate} />
      )}
      {currentView === VIEW.MONTH && (
        <MonthView
          selectedDate={selectedDate}
          onChangeView={handleChangeView}
        />
      )}
      {currentView === VIEW.YEAR && (
        <YearView selectedDate={selectedDate} onChangeView={handleChangeView} />
      )}
    </div>
  );
}

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;

const StyledCalendar = styled(Calendar)`
  max-width: 400px;
  margin: 0 auto;

  .selected-date {
    text-align: center;
  }

  @media (max-width: ${BREAKPOINTS.S}) {
    max-width: initial;
    width: 100%;
    font-size: 20px;
  }
`;

StyledCalendar.propTypes = propTypes;
StyledCalendar.defaultProps = defaultProps;

export default StyledCalendar;
