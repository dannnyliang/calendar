import { isThisMonth } from "date-fns";
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
};

function MonthView(props) {
  return (
    <div className={props.className}>
      {map(
        (month) => (
          <Cell key={format("MMM", month)} isCurrent={isThisMonth(month)}>
            {format("MMM", month)}
          </Cell>
        ),
        getMonthList()
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
