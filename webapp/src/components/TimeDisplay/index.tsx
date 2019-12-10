import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITimeDisplayProps } from './interface';

const Root = styled.div`
  font-size: 24px;
`;

const Unit = styled.span`
  font-size: 0.6em;
`;

const ZeroUnitContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ZeroUnitLabel = styled.div`
  height: 3px;
  width: 20px;
  border-radius: 30%;
  background-color: currentColor;
  margin-left: 5px;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1.1em;
  position: relative;
  top: -1px;
  margin-right: 8px;
`;

export const TimeDisplay: React.FC<ITimeDisplayProps> = ({
  hours,
  minutes,
  icon,
}) => {
  if (hours === 0 && minutes === 0) {
    return (
      <Root>
        <ZeroUnitContainer>
          <Icon icon={icon} />
          <ZeroUnitLabel />
        </ZeroUnitContainer>
      </Root>
    );
  }

  return (
    <Root>
      <Icon icon={icon} />
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
    </Root>
  );
};
