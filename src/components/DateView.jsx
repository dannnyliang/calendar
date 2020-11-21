import { isThisMonth, isToday } from "date-fns";
import { format } from "date-fns/fp";
import PropTypes from "prop-types";
import { map } from "ramda";
import React from "react";
import styled from "styled-components";

import { getDateList, getWeekList } from "../helpers";
import Cell from "./Cell";

function WeekHeader() {
  const formatWeekList = map(format("EEEEEE"))(getWeekList());

  return map((week) => (
    <Cell key={week} clickable={false}>
      {week}
    </Cell>
  ))(formatWeekList);
}

const propTypes = {
  className: PropTypes.string,
};

function DateView(props) {
  return (
    <div className={props.className}>
      <WeekHeader />
      {map(
        (date) => (
          <Cell
            key={format("yyyy-MM-dd", date)}
            isCurrent={isToday(date)}
            disabled={!isThisMonth(date)}
          >
            {format("d", date)}
          </Cell>
        ),
        getDateList()
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
