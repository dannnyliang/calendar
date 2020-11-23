import {
  addMonths,
  addYears,
  endOfDecade,
  format,
  startOfDecade,
  subMonths,
  subYears,
} from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { VIEW } from "../constant";
import { DISABLE } from "../styles/color";
import { m } from "../styles/space";

const getLabelContent = (currentView, displayDate) => {
  if (currentView === VIEW.YEAR) {
    const decadeInterval = {
      start: startOfDecade(displayDate),
      end: endOfDecade(displayDate),
    };
    return `${format(decadeInterval.start, "yyyy")}-${format(
      decadeInterval.end,
      "yyyy"
    )}`;
  }
  if (currentView === VIEW.MONTH) {
    return format(displayDate, "yyyy");
  }
  if (currentView === VIEW.DATE) {
    return format(displayDate, "MMM yyyy");
  }
};

const getNewDisplayDate = ({ view, direction, displayDate }) => {
  switch (view) {
    case VIEW.DATE:
      return direction === "next"
        ? addMonths(displayDate, 1)
        : subMonths(displayDate, 1);
    case VIEW.MONTH:
      return direction === "next"
        ? addYears(displayDate, 1)
        : subYears(displayDate, 1);
    case VIEW.YEAR:
      return direction === "next"
        ? addYears(displayDate, 10)
        : subYears(displayDate, 10);
    default:
      return displayDate;
  }
};

const propTypes = {
  className: PropTypes.string,
  currentView: PropTypes.string,
  displayDate: PropTypes.object.isRequired,
  onChangeView: PropTypes.func,
  onChangeDisplay: PropTypes.func,
};

function ControlBar(props) {
  const {
    className,
    currentView,
    displayDate,
    onChangeView,
    onChangeDisplay,
  } = props;

  const handleClickLabel = () => onChangeView?.();
  const handleClickDirection = (direction) => {
    const newSelectedDate = getNewDisplayDate({
      displayDate,
      view: currentView,
      direction,
    });
    onChangeDisplay?.(newSelectedDate);
  };
  const handleClickNext = () => handleClickDirection("next");
  const handleClickPrev = () => handleClickDirection("prev");

  return (
    <Wrapper className={className}>
      <PrevButton onClick={handleClickPrev}>&lt;</PrevButton>
      <Label onClick={handleClickLabel}>
        {getLabelContent(currentView, displayDate)}
      </Label>
      <NextButton onClick={handleClickNext}>&gt;</NextButton>
    </Wrapper>
  );
}

ControlBar.propTypes = propTypes;

const PrevButton = styled.div``;
const NextButton = styled.div``;
const Label = styled.div``;

const gridStyle = css`
  ${PrevButton} {
    grid-column: 1 / 2;
  }
  ${Label} {
    grid-column: span 5;
  }
  ${NextButton} {
    grid-column: -2 / -1;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  padding: ${m} 0;

  & > div {
    cursor: pointer;
  }

  ${PrevButton},
  ${NextButton} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ${Label} {
    padding: ${m} 0;
    border-radius: ${m};

    :hover {
      background-color: ${DISABLE};
    }
  }

  ${gridStyle}
`;

export default ControlBar;
