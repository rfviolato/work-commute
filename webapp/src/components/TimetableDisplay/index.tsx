import React from 'react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import { ITimetableDisplayProps } from './interface';
import {
  IconContainer,
  Root,
  DisplayIconContainer,
  ErrorDisplay,
  Timetable,
  TimetableLabel,
  TimetableTimestamp,
} from './styled';

export const TimetableDisplay: React.FC<ITimetableDisplayProps> = ({
  icon,
  timetables,
  isLoading,
  hasError,
}) => {
  return (
    <Root>
      <IconContainer>
        <DisplayIconContainer>
          {hasError && <ErrorDisplay />}
          {icon}
        </DisplayIconContainer>
      </IconContainer>

      <ul>
        {timetables.map(({ timestamp, label }) => {
          const timetableDate = moment(timestamp, 'HH:mm:ssZ');
          const timetableLabel = `${label}: `;

          if (timetableDate && !timetableDate.isValid()) {
            return (
              <Timetable key={label}>
                <TimetableLabel>
                  {isLoading ? <Skeleton width={100} /> : timetableLabel}
                </TimetableLabel>
                <TimetableTimestamp>
                  {isLoading ? <Skeleton width={45} /> : 'n/a'}
                </TimetableTimestamp>
              </Timetable>
            );
          }

          return (
            <Timetable key={label}>
              <TimetableLabel>{timetableLabel}</TimetableLabel>
              <TimetableTimestamp>
                {timetableDate.format('HH:mm')}
              </TimetableTimestamp>
            </Timetable>
          );
        })}
      </ul>
    </Root>
  );
};
