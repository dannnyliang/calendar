import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { DISABLE, PRIMARY, WHITE } from "../styles/color";

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
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
  const {
    className,
    children,
    clickable,
    isActive,
    isCurrent,
    disabled,
  } = props;

  return (
    <Wrapper
      className={className}
      clickable={clickable}
      isActive={isActive}
      isCurrent={isCurrent}
      disabled={disabled}
    >
      <CellSlot>
        <CellContent>{children}</CellContent>
      </CellSlot>
    </Wrapper>
  );
}

Cell.propTypes = propTypes;
Cell.defaultProps = defaultProps;

const CellSlot = styled.div``;
const CellContent = styled.div``;

const currentStyle = css`
  color: ${PRIMARY};
`;

const activeStyle = css`
  color: ${WHITE};
  background-color: ${PRIMARY};
`;

const disableStyle = css`
  color: ${DISABLE};
`;

const clickableStyle = css`
  cursor: pointer;
  :hover {
    ${activeStyle}
  }
  ${(props) => props.isActive && activeStyle}
`;

const squareStyle = css`
  ${CellSlot} {
    width: 100%;
    position: relative;
    &::before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    ${CellContent} {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
    }
  }
`;

const Wrapper = styled.div`
  ${CellSlot} > ${CellContent} {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) => props.isCurrent && currentStyle}
    ${(props) => props.clickable && clickableStyle}
    ${(props) => props.disabled && disableStyle}
  }
  ${squareStyle}
`;

export default Cell;
