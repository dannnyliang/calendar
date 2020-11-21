import { getMonth, isSameMonth, isThisMonth, setMonth } from "date-fns";
import { format } from "date-fns/fp";
import PropTypes from "prop-types";
import { map } from "ramda";
import React from "react";
import styled from "styled-components";

import { MONTHVIEW_COLUMN } from "../constant";
import { getMonthList } from "../helpers";
import Cell from "./Cell";

const propTypes = {
  className: PropTypes.string,
  selectedDate: PropTypes.object,
  handleChangeView: PropTypes.func,
};

function MonthView(props) {
  const { className, selectedDate, handleChangeView } = props;

  const handleClick = (month) => {
    const selectedMonth = getMonth(month);
    const newSelectedDate = setMonth(selectedDate, selectedMonth);
    handleChangeView(newSelectedDate);
  };

  return (
    <div className={className}>
      {map(
        (month) => (
          <div key={format("MMM", month)} onClick={() => handleClick(month)}>
            <Cell
              isCurrent={isThisMonth(month)}
              isActive={isSameMonth(selectedDate, month)}
            >
              {format("MMM", month)}
            </Cell>
          </div>
        ),
        getMonthList(selectedDate)
      )}
    </div>
  );
}

MonthView.propTypes = propTypes;

const StyledMonthView = styled(MonthView)`
  display: grid;
  grid-template-columns: repeat(${MONTHVIEW_COLUMN}, 1fr);
`;

StyledMonthView.propTypes = propTypes;

export default StyledMonthView;
