import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface ISectionProps {
  title: string;
  children: ReactNode;
}

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
