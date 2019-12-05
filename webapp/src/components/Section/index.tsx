import React from 'react';
import { ISectionProps } from './interface';

import styled from '@emotion/styled';

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 32px;
  text-align: center;
`;

export const Section: React.FC<ISectionProps> = ({ title, children }) => {
  return (
    <article>
      <Title>{title}</Title>
      {children}
    </article>
  );
};
