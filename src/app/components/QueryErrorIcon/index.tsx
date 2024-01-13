import React from 'react';
import { Root } from './styled';

export const QueryErrorIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <Root>
    <i className={`far fa-exclamation-circle ${className}`} />
  </Root>
);
