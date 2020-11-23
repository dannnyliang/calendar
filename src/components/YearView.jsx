import {
  endOfDecade,
  format,
  getYear,
  isAfter,
  isBefore,
  isSameYear,
  isThisYear,
  setYear,
  startOfDecade,
} from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { YEARVIEW_COLUMN } from "../constant";
import { getYearList } from "../helpers";
import Cell from "./Cell";

const propTypes = {
  className: PropTypes.string,
  selectedDate: PropTypes.object.isRequired,
  displayDate: PropTypes.object.isRequired,
  onChangeView: PropTypes.func,
};

function YearView(props) {
  const { className, selectedDate, displayDate, onChangeView } = props;

  const isDisabled = (year) =>
    isBefore(year, startOfDecade(displayDate)) ||
    isAfter(year, endOfDecade(displayDate));

  const handleClick = (year) => {
    const selectedYear = getYear(year);
    const newDisplayDate = setYear(displayDate, selectedYear);
    onChangeView?.(newDisplayDate);
  };

  return (
    <Wrapper className={className}>
      {getYearList(displayDate).map((year) => (
        <div key={format(year, "yyyy")} onClick={() => handleClick(year)}>
          <Cell
            isCurrent={isThisYear(year)}
            isActive={isSameYear(selectedDate, year)}
            disabled={isDisabled(year)}
          >
            {format(year, "yyyy")}
          </Cell>
        </div>
      ))}
    </Wrapper>
  );
}

YearView.propTypes = propTypes;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${YEARVIEW_COLUMN}, 1fr);
`;

export default YearView;
