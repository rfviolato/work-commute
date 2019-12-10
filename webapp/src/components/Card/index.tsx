import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICardProps } from './interface';

const Root = styled.div`
  padding: 20px;
  border: 1px solid whitesmoke;
  border-radius: 4px;
  background-color: #404040;
`;

export const Card: React.FC<ICardProps> = ({ children }) => {
  return <Root>{children}</Root>;
};
