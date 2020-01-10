import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/pro-regular-svg-icons';

const Icon = styled(FontAwesomeIcon)`
  color: orangered;
`;

export const QueryErrorIcon: React.FC = () => (
  <Icon icon={faExclamationCircle} />
);
