import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/pro-regular-svg-icons';

const Root = styled.span`
  color: orangered;
  font-size: 18px;
`;

export const QueryErrorIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <Root>
    <FontAwesomeIcon className={className} icon={faExclamationCircle} />
  </Root>
);
