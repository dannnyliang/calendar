import {
  endOfDecade,
  isAfter,
  isBefore,
  isThisYear,
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
};

function YearView(props) {
  const decadeInterval = {
    start: startOfDecade(new Date()),
    end: endOfDecade(new Date()),
  };

  const isDisabled = (year) =>
    isBefore(year, decadeInterval.start) || isAfter(year, decadeInterval.end);

  return (
    <div className={props.className}>
      {map(
        (year) => (
          <Cell
            key={format("yyyy", year)}
            isCurrent={isThisYear(year)}
            disabled={isDisabled(year)}
          >
            {format("yyyy", year)}
          </Cell>
        ),
        getYearList()
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
