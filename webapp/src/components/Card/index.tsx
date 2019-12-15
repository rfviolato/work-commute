import React from 'react';
import styled from '@emotion/styled';
import { ICardProps } from './interface';

const Root = styled.div`
  padding: 30px;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  background-color: #404040;
`;

export const Card: React.FC<ICardProps> = ({ children }) => {
  return <Root>{children}</Root>;
};
