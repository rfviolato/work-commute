import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { ITimeDisplayProps } from './interface';
import { UnitDisplay, Root, Unit } from './styled';

export const TimeDisplay: React.FC<ITimeDisplayProps> = ({
  hours = 0,
  minutes = 0,
  isLoading,
}) => {
  return (
    <Root>
      <UnitDisplay>
        {isLoading ? (
          <Skeleton width={65} />
        ) : (
          <>
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
          </>
        )}
      </UnitDisplay>
    </Root>
  );
};
