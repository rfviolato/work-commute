import React from 'react';
import { ISectionProps } from './interface';

import styled from '@emotion/styled';

const Title = styled.h1`
  position: relative;
  left: -2px;
  font-size: 40px;
  margin-bottom: 16px;

  @media (max-width: 960px) {
    left: 0;
    text-align: center;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

export const Section: React.FC<ISectionProps> = ({ title, children }) => {
  return (
    <article>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </article>
  );
};
