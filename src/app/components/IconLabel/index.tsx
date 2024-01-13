import React from 'react';
import { IIconLabelProps } from './interface';
import {
  Root,
  IconContainer,
  ErrorDisplay,
  Icon,
  Label,
  Content,
} from './styled';

export const IconLabel: React.FC<IIconLabelProps> = ({
  children,
  icon,
  label,
  hasError,
}) => {
  return (
    <Root>
      <IconContainer>
        {hasError && <ErrorDisplay />}
        <Icon>{icon}</Icon>
      </IconContainer>

      <Label>{label}</Label>

      <Content>{children}</Content>
    </Root>
  );
};
