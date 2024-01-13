import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { COLORS } from '../../global-styles';

export const Root = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: ${COLORS.LIGHT_BLACK};
  border-bottom: 1px solid #aaa;
`;

export const Link = styled(NavLink)`
  &:visited {
    color: currentColor;
  }

  position: relative;
  top: -2px;
  opacity: 0.6;
  color: ${COLORS.WHITE};
  text-decoration: none;
  font-size: 20px;
  transition: opacity 300ms ease-out;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 55%;
    height: 1px;
    bottom: -2px;
    background-color: currentColor;
    opacity: 0.85;
    transform: scaleX(0);
    transition: transform 300ms ease-out;
  }

  &::before {
    right: -5%;
    transform-origin: left;
  }

  &::after {
    left: -5%;
    transform-origin: right;
  }

  &:not(:last-child) {
    margin-right: 30px;
  }

  &.active {
    opacity: 1;

    &::before,
    &::after {
      transform: scaleX(1);
    }
  }

  &:hover:not(.active) {
    opacity: 0.8;
  }
`;
