import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IIconLabelProps } from './interface';

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: 2px solid #f1f1f1;
  border-radius: 50%;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 25px;
  position: relative;
  top: -1px;
  opacity: 0.9;
`;

const Label = styled.div`
  font-size: 14px;
  margin-top: 10px;
  opacity: 0.9;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid #aaa;
  width: 100%;
  text-align: center;
  margin-top: 20px;
  padding-top: 18px;
  line-height: 1;
`;

export const IconLabel: React.FC<IIconLabelProps> = ({
  children,
  icon,
  label,
}) => {
  return (
    <Root>
      <IconContainer>
        <Icon icon={icon} />
      </IconContainer>

      <Label>{label}</Label>

      <Content>{children}</Content>
    </Root>
  );
};