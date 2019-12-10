import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITimeDisplayProps } from './interface';

const Root = styled.div`
  align-self: flex-start;
  font-size: 24px;

  &:not(:first-of-type) {
    margin-left: 32px;
  }
`;

const Unit = styled.span`
  font-size: 0.6em;
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
