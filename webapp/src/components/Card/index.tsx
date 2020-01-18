import React from 'react';
import { ICardProps } from './interface';
import { Root } from './styled';

export const Card: React.FC<ICardProps> = ({ children, className }) => {
  return <Root className={className}>{children}</Root>;
};
