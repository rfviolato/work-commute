import React from 'react';
import { ISectionProps } from './interface';
import { Content } from './styled';

export const Section: React.FC<ISectionProps> = ({ children }) => {
  return (
    <section>
      <Content>{children}</Content>
    </section>
  );
};
