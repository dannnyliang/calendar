import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { GRAY } from "../styles/color";
import { m } from "../styles/space";

const propTypes = {
  className: PropTypes.string,
};

function ControlBar(props) {
  return (
    <div className={props.className}>
      <div className="prev">&lt;</div>
      <div className="current">Nov 2020</div>
      <div className="next">&gt;</div>
    </div>
  );
}

ControlBar.propTypes = propTypes;

const gridStyle = css`
  .prev {
    grid-column: 1 / 2;
  }
  .current {
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
  .current {
    padding: ${m} 0;
    border-radius: ${m};
    background-color: ${GRAY};
  }

  ${gridStyle}
`;

StyledControlBar.propTypes = propTypes;

export default StyledControlBar;
