import { format } from "date-fns";
import PropTypes from "prop-types";
import { isNil } from "ramda";
import React, { useState } from "react";
import styled, { css } from "styled-components";

import { BREAKPOINTS } from "../styles/breakpoints";
import { BLUE, DEFAULT, GRAY } from "../styles/color";
import { m, s } from "../styles/space";
import Calendar from "./Calendar";

const propTypes = {
  className: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSelect: PropTypes.func,
};

function DatePicker(props) {
  const { className, date, onSelect } = props;

  const [isFocus, setIsFocus] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const isControlled = typeof date !== "undefined";
  const controlledDate = new Date(date);
  const selected = isControlled ? controlledDate : selectedDate;

  const handleOpenCalendar = () => setIsFocus(true);
  const handleCloseCalendar = () => setIsFocus(false);
  const handleUncontrolledSelect = (date) => {
    setSelectedDate(date);
    handleCloseCalendar();
  };
  const handleSelect = isControlled
    ? (date) => {
        handleCloseCalendar();
        onSelect?.(date);
      }
    : (date) => handleUncontrolledSelect(date);

  return (
    <Wrapper className={className}>
      <DateInput isFocus={isFocus} onClick={handleOpenCalendar}>
        <i className="material-icons">calendar_today</i>
        <DateLabel isEmpty={isNil(selected)}>
          {selected ? format(selected, "yyyy-MM-dd") : "____-__-__"}
        </DateLabel>
      </DateInput>
      {isFocus && (
        <>
          <Overlay onClick={handleCloseCalendar} />
          <StyledCalendar date={selected} onSelect={handleSelect} />
        </>
      )}
    </Wrapper>
  );
}

DatePicker.propTypes = propTypes;

const focusStyle = css`
  border-color: ${BLUE};
  i {
    color: ${BLUE};
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1;
`;

const StyledCalendar = styled(Calendar)`
  position: absolute;
  width: 300px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,
    rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  z-index: 1;

  @media (max-width: ${BREAKPOINTS.S}) {
    width: 100%;
    left: 0;
  }
`;

const DateLabel = styled.span`
  color: ${(props) => (props.isEmpty ? GRAY : DEFAULT)};
`;

const DateInput = styled.div`
  border: 2px solid ${GRAY};
  border-radius: ${s};
  padding: ${s} ${m};

  min-width: 150px;

  display: flex;
  align-items: center;

  cursor: pointer;

  ${(props) => props.isFocus && focusStyle}
`;

const Wrapper = styled.div`
  display: inline-block;
  i {
    margin-right: ${s};
  }
`;

export default DatePicker;
