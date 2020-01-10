import React from 'react';
import styled from '@emotion/styled';
import { ICardProps } from './interface';

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  background-color: #404040;
`;

export const Card: React.FC<ICardProps> = ({ children, className }) => {
  return <Root className={className}>{children}</Root>;
};
