import React from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skeleton from 'react-loading-skeleton';
import { ITimetableDisplay } from './interface';

const CSS_VARIABLES = {
  LABEL_MIN_WIDTH: 125,
  MQ: { X_SMALL: 375 },
};

const Root = styled.div`
  display: flex;

  @media (max-width: ${CSS_VARIABLES.MQ.X_SMALL}px) {
    flex-direction: column;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px 0 0;
  margin-right: 34px;
  border-right: 1px solid #aaa;
  font-size: 42px;

  @media (max-width: ${CSS_VARIABLES.MQ.X_SMALL}px) {
    border-right: none;
    padding: 0 0 20px 0;
    margin: 0;
    justify-content: center;
  }
`;

const TimetableContainer = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

interface ITimetableProps {
  isLoading?: boolean;
}
const Timetable = styled.li<ITimetableProps>`
  display: ${({ isLoading }) => (isLoading ? 'initial' : 'flex')};
  align-items: center;
  padding: 7px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #aaa;
  }

  @media (max-width: ${CSS_VARIABLES.MQ.X_SMALL}px) {
    justify-content: center;
  }
`;

const TimetableLabel = styled.span`
  display: inline-block;
  min-width: ${CSS_VARIABLES.LABEL_MIN_WIDTH}px;
  font-size: 0.75em;
  font-size: 14px;
  opacity: 0.9;
`;

const TimetableTimestamp = styled.span`
  font-weight: bold;
`;

export const TimetableDisplay: React.FC<ITimetableDisplay> = ({
  icon,
  timetables,
  isLoading,
}) => {
  return (
    <Root>
      <IconContainer>
        <FontAwesomeIcon icon={icon} />
      </IconContainer>

      <TimetableContainer>
        {timetables.map(({ timestamp, label }) => {
          const timetableDate = moment(timestamp, 'HH:mm:ssZ');
          const timetableLabel = `${label}: `;

          if (timetableDate && !timetableDate.isValid()) {
            return (
              <Timetable>
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
            <Timetable>
              <TimetableLabel>{timetableLabel}</TimetableLabel>
              <TimetableTimestamp>
                {timetableDate.format('HH:mm')}
              </TimetableTimestamp>
            </Timetable>
          );
        })}
      </TimetableContainer>
    </Root>
  );
};
