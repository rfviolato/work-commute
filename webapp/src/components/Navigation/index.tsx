import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const Root = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: #434343;
  border-bottom: 1px solid #aaa;
`;

const Link = styled(NavLink)`
  &:visited {
    color: currentColor;
  }

  color: #fff;
  text-decoration: none;
  font-size: 20px;
  transition: opacity 300ms ease-out;

  &:not(:last-child) {
    margin-right: 30px;
  }

  &.active {
    opacity: 0.5;
  }
`;

export const Navigation: React.FC = () => {
  return (
    <Root>
      <Link exact activeClassName="active" to="/">
        Today
      </Link>
      <Link activeClassName="active" to="/period">
        Period
      </Link>
    </Root>
  );
};
