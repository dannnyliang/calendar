import {
  endOfMonth,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  startOfMonth,
} from "date-fns";
import { format } from "date-fns/fp";
import PropTypes from "prop-types";
import { map } from "ramda";
import React from "react";
import styled from "styled-components";

import { getDateList, weekList } from "../helpers";
import Cell from "./Cell";

function WeekHeader() {
  const formatWeekList = map(format("EEEEEE"))(weekList);

  return map((week) => (
    <Cell key={week} clickable={false}>
      {week}
    </Cell>
  ))(formatWeekList);
}

const propTypes = {
  className: PropTypes.string,
  selectedDate: PropTypes.object,
  handleSelectDate: PropTypes.func,
};

function DateView(props) {
  const { className, selectedDate, handleSelectDate } = props;

  const isDisabled = (date) =>
    isBefore(date, startOfMonth(selectedDate)) ||
    isAfter(date, endOfMonth(selectedDate));

  return (
    <div className={className}>
      <WeekHeader />
      {map(
        (date) => (
          <div
            key={format("yyyy-MM-dd", date)}
            onClick={() => handleSelectDate(date)}
          >
            <Cell
              isCurrent={isToday(date)}
              isActive={isSameDay(selectedDate, date)}
              disabled={isDisabled(date)}
            >
              {format("d", date)}
            </Cell>
          </div>
        ),
        getDateList(selectedDate)
      )}
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
