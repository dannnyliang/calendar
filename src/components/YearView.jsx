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
  onChangeView: PropTypes.func,
};

function YearView(props) {
  const { className, selectedDate, onChangeView } = props;

  const isDisabled = (year) =>
    isBefore(year, startOfDecade(selectedDate)) ||
    isAfter(year, endOfDecade(selectedDate));

  const handleClick = (year) => {
    const selectedYear = getYear(year);
    const newSelectedDate = setYear(selectedDate, selectedYear);
    onChangeView?.(newSelectedDate);
  };

  return (
    <div className={className}>
      {getYearList(selectedDate).map((year) => (
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
    </div>
  );
}

YearView.propTypes = propTypes;

const StyledYearView = styled(YearView)`
  display: grid;
  grid-template-columns: repeat(${YEARVIEW_COLUMN}, 1fr);
`;

StyledYearView.propTypes = propTypes;

export default StyledYearView;
