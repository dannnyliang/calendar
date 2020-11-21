import {
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  startOfMonth,
} from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { getDateList, weekList } from "../helpers";
import Cell from "./Cell";

function WeekHeader() {
  return weekList
    .map((week) => format(week, "EEEEEE"))
    .map((week) => (
      <Cell key={week} clickable={false}>
        {week}
      </Cell>
    ));
}

const propTypes = {
  className: PropTypes.string,
  selectedDate: PropTypes.object.isRequired,
  onSelectDate: PropTypes.func,
};

function DateView(props) {
  const { className, selectedDate, onSelectDate } = props;

  const isDisabled = (date) =>
    isBefore(date, startOfMonth(selectedDate)) ||
    isAfter(date, endOfMonth(selectedDate));

  return (
    <div className={className}>
      <WeekHeader />
      {getDateList(selectedDate).map((date) => (
        <div
          key={format(date, "yyyy-MM-dd")}
          onClick={() => onSelectDate?.(date)}
        >
          <Cell
            isCurrent={isToday(date)}
            isActive={isSameDay(selectedDate, date)}
            disabled={isDisabled(date)}
          >
            {format(date, "d")}
          </Cell>
        </div>
      ))}
    </div>
  );
}

DateView.propTypes = propTypes;

const StyledDateView = styled(DateView)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

StyledDateView.propTypes = propTypes;

export default StyledDateView;
