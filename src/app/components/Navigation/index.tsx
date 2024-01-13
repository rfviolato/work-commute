import React from 'react';
import { Root, Link } from './styled';

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
