import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITimeDisplayProps } from './interface';
import { Card } from '../Card';

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Unit = styled.span`
  font-size: 0.6em;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: 2px solid whitesmoke;
  border-radius: 50%;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 25px;
  position: relative;
  top: -1px;
`;

const Label = styled.div`
  font-size: 14px;
  margin-top: 10px;
  opacity: 0.85;
`;

const UnitDisplay = styled.div`
  margin-top: 20px;
  font-size: 28px;
  font-weight: bold;
`;

export const TimeDisplay: React.FC<ITimeDisplayProps> = ({
  hours,
  minutes,
  label,
  icon,
}) => {
  return (
    <Card>
      <Root>
        <IconContainer>
          <Icon icon={icon} />
        </IconContainer>

        <Label>{label}</Label>

        <UnitDisplay>
          {hours > 0 && (
            <span>
              <span>{hours}</span>
              <Unit>hrs.</Unit>
            </span>
          )}{' '}
          <span>
            <span>{minutes}</span>
            <Unit>min.</Unit>
          </span>
        </UnitDisplay>
      </Root>
    </Card>
  );
};
