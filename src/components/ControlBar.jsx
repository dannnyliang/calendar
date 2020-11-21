import {
  addDays,
  addMonths,
  addYears,
  endOfDecade,
  format,
  startOfDecade,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { VIEW } from "../constant";
import { GRAY } from "../styles/color";
import { m } from "../styles/space";

const getLabelContent = (currentView, selectedDate) => {
  if (currentView === VIEW.YEAR) {
    const decadeInterval = {
      start: startOfDecade(selectedDate),
      end: endOfDecade(selectedDate),
    };
    return `${format(decadeInterval.start, "yyyy")}-${format(
      decadeInterval.end,
      "yyyy"
    )}`;
  }
  if (currentView === VIEW.MONTH) {
    return format(selectedDate, "yyyy");
  }
  if (currentView === VIEW.DATE) {
    return format(selectedDate, "MMM yyyy");
  }
};

const getNewSelectedDate = ({ view, direction, selectedDate }) => {
  switch (view) {
    case VIEW.DATE:
      return direction === "next"
        ? addDays(selectedDate, 1)
        : subDays(selectedDate, 1);
    case VIEW.MONTH:
      return direction === "next"
        ? addMonths(selectedDate, 1)
        : subMonths(selectedDate, 1);
    case VIEW.YEAR:
      return direction === "next"
        ? addYears(selectedDate, 1)
        : subYears(selectedDate, 1);
    default:
      return selectedDate;
  }
};

const propTypes = {
  className: PropTypes.string,
  currentView: PropTypes.string,
  selectedDate: PropTypes.object,
  handleChangeView: PropTypes.func,
  handleSelectDate: PropTypes.func,
};

function ControlBar(props) {
  const {
    className,
    currentView,
    selectedDate,
    handleChangeView,
    handleSelectDate,
  } = props;

  const handleClickLabel = () => handleChangeView();
  const handleClickDirection = (direction) => {
    const newSelectedDate = getNewSelectedDate({
      selectedDate,
      view: currentView,
      direction,
    });
    handleSelectDate(newSelectedDate);
  };
  const handleClickNext = () => handleClickDirection("next");
  const handleClickPrev = () => handleClickDirection("prev");

  return (
    <div className={className}>
      <div className="prev" onClick={handleClickPrev}>
        &lt;
      </div>
      <div className="label" onClick={handleClickLabel}>
        {getLabelContent(currentView, selectedDate)}
      </div>
      <div className="next" onClick={handleClickNext}>
        &gt;
      </div>
    </div>
  );
}

ControlBar.propTypes = propTypes;

const gridStyle = css`
  .prev {
    grid-column: 1 / 2;
  }
  .label {
    grid-column: span 5;
  }
  .next {
    grid-column: -2 / -1;
  }
`;

const StyledControlBar = styled(ControlBar)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  padding: ${m} 0;

  & > div {
    cursor: pointer;
  }

  .prev,
  .next {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .label {
    padding: ${m} 0;
    border-radius: ${m};

    :hover {
      background-color: ${GRAY};
    }
  }

  ${gridStyle}
`;

StyledControlBar.propTypes = propTypes;

export default StyledControlBar;
