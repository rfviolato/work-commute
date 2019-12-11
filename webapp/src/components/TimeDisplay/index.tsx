import React from 'react';
import styled from '@emotion/styled';
import { ITimeDisplayProps } from './interface';

const Root = styled.div`
  display: flex;
`;

const Unit = styled.span`
  font-size: 0.6em;
`;

const UnitDisplay = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

export const TimeDisplay: React.FC<ITimeDisplayProps> = ({
  hours,
  minutes,
}) => {
  return (
    <Root>
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
  );
};
