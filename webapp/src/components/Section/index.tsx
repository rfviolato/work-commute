import React from 'react';
import styled from '@emotion/styled';
import { ISectionProps } from './interface';

const Content = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

export const Section: React.FC<ISectionProps> = ({ children }) => {
  return (
    <section>
      <Content>{children}</Content>
    </section>
  );
};
