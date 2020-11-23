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
      <HeaderCell key={week} clickable={false}>
        {week}
      </HeaderCell>
    ));
}

const propTypes = {
  className: PropTypes.string,
  displayDate: PropTypes.object.isRequired,
  selectedDate: PropTypes.object.isRequired,
  onSelectDate: PropTypes.func,
};

function DateView(props) {
  const { className, displayDate, selectedDate, onSelectDate } = props;

  const isDisabled = (date) =>
    isBefore(date, startOfMonth(displayDate)) ||
    isAfter(date, endOfMonth(displayDate));

  const handleClick = (date) => onSelectDate?.(date);

  return (
    <Wrapper className={className}>
      <WeekHeader />
      {getDateList(displayDate).map((date) => (
        <div key={format(date, "yyyy-MM-dd")} onClick={() => handleClick(date)}>
          <Cell
            isCurrent={isToday(date)}
            isActive={isSameDay(selectedDate, date)}
            disabled={isDisabled(date)}
          >
            {format(date, "d")}
          </Cell>
        </div>
      ))}
    </Wrapper>
  );
}

DateView.propTypes = propTypes;

const HeaderCell = styled(Cell)`
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export default DateView;
