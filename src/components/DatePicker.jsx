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
};

function DatePicker(props) {
  const { className } = props;
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(null);

  const handleOpenCalendar = () => setIsFocus(true);
  const handleCloseCalendar = () => setIsFocus(false);
  const handleSelect = (date) => {
    setDate(date);
    handleCloseCalendar();
  };

  return (
    <div className={className}>
      <Wrapper isFocus={isFocus} onClick={handleOpenCalendar}>
        <i className="material-icons">calendar_today</i>
        <DateLabel isEmpty={isNil(date)}>
          {date ? format(date, "yyyy-MM-dd") : "____-__-__"}
        </DateLabel>
      </Wrapper>
      {isFocus && (
        <>
          <Overlay onClick={handleCloseCalendar} />
          <StyledCalendar date={date} onSelect={handleSelect} />
        </>
      )}
    </div>
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
    max-width: initial;
    width: 100%;
    left: 0;
    font-size: 20px;
  }
`;

const DateLabel = styled.span`
  color: ${(props) => (props.isEmpty ? GRAY : DEFAULT)};
`;

const Wrapper = styled.div`
  border: 2px solid ${GRAY};
  border-radius: ${s};
  padding: ${s} ${m};

  min-width: 150px;

  display: flex;
  align-items: center;

  cursor: pointer;

  ${(props) => props.isFocus && focusStyle}
`;

const StyledDatePicker = styled(DatePicker)`
  display: inline-block;
  i {
    margin-right: ${s};
  }
`;

export default StyledDatePicker;
