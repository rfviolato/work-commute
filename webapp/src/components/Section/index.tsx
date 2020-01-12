import React from 'react';
import { ISectionProps } from './interface';

import styled from '@emotion/styled';

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
