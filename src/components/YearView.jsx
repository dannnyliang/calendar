import {
  endOfDecade,
  getYear,
  isAfter,
  isBefore,
  isSameYear,
  isThisYear,
  setYear,
  startOfDecade,
} from "date-fns";
import { format } from "date-fns/fp";
import PropTypes from "prop-types";
import { map } from "ramda";
import React from "react";
import styled from "styled-components";

import { YEARVIEW_COLUMN } from "../constant";
import { getYearList } from "../helpers";
import Cell from "./Cell";

const propTypes = {
  className: PropTypes.string,
  selectedDate: PropTypes.object,
  handleChangeView: PropTypes.func,
};

function YearView(props) {
  const { className, selectedDate, handleChangeView } = props;

  const isDisabled = (year) =>
    isBefore(year, startOfDecade(selectedDate)) ||
    isAfter(year, endOfDecade(selectedDate));

  const handleClick = (year) => {
    const selectedYear = getYear(year);
    const newSelectedDate = setYear(selectedDate, selectedYear);
    handleChangeView(newSelectedDate);
  };

  return (
    <div className={className}>
      {map(
        (year) => (
          <div key={format("yyyy", year)} onClick={() => handleClick(year)}>
            <Cell
              isCurrent={isThisYear(year)}
              isActive={isSameYear(selectedDate, year)}
              disabled={isDisabled(year)}
            >
              {format("yyyy", year)}
            </Cell>
          </div>
        ),
        getYearList(selectedDate)
      )}
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
