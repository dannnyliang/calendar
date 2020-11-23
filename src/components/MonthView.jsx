import { format, getMonth, isSameMonth, isThisMonth, setMonth } from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { MONTHVIEW_COLUMN } from "../constant";
import { getMonthList } from "../helpers";
import Cell from "./Cell";

const propTypes = {
  className: PropTypes.string,
  displayDate: PropTypes.object.isRequired,
  selectedDate: PropTypes.object.isRequired,
  onChangeView: PropTypes.func,
};

function MonthView(props) {
  const { className, displayDate, selectedDate, onChangeView } = props;

  const handleClick = (month) => {
    const selectedMonth = getMonth(month);
    const newDisplayDate = setMonth(displayDate, selectedMonth);
    onChangeView?.(newDisplayDate);
  };

  return (
    <Wrapper className={className}>
      {getMonthList(displayDate).map((month) => (
        <div key={format(month, "MMM")} onClick={() => handleClick(month)}>
          <Cell
            isCurrent={isThisMonth(month)}
            isActive={isSameMonth(selectedDate, month)}
          >
            {format(month, "MMM")}
          </Cell>
        </div>
      ))}
    </Wrapper>
  );
}

MonthView.propTypes = propTypes;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${MONTHVIEW_COLUMN}, 1fr);
`;

export default MonthView;
