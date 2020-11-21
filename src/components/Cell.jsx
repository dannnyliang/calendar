import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { GRAY, PRIMARY, WHITE } from "../styles/color";

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  clickable: PropTypes.bool,
  isActive: PropTypes.bool,
  isCurrent: PropTypes.bool,
  disabled: PropTypes.bool,
};

const defaultProps = {
  clickable: true,
  isActive: false,
  isCurrent: false,
  disabled: false,
};

function Cell(props) {
  return (
    <div className={props.className}>
      <div className="cell-wrapper">
        <div className="cell-content">{props.children}</div>
      </div>
    </div>
  );
}

Cell.propTypes = propTypes;
Cell.defaultProps = defaultProps;

const currentStyle = css`
  color: ${PRIMARY};
`;

const activeStyle = css`
  color: ${WHITE};
  background-color: ${PRIMARY};
`;

const disableStyle = css`
  color: ${GRAY};
`;

const clickableStyle = css`
  cursor: pointer;
  :hover {
    ${activeStyle}
  }
  ${(props) => props.isActive && activeStyle}
`;

const squareStyle = css`
  .cell-wrapper {
    width: 100%;
    position: relative;
    &::before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    .cell-content {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
    }
  }
`;

const StyledCell = styled(Cell)`
  .cell-wrapper > .cell-content {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) => props.clickable && clickableStyle}
    ${(props) => props.isCurrent && currentStyle}
    ${(props) => props.disabled && disableStyle}
  }
  ${squareStyle}
`;

StyledCell.propTypes = propTypes;
StyledCell.defaultProps = defaultProps;

export default StyledCell;
