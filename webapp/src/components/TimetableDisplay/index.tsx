import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITimetableDisplay } from './interface';
import { Card } from '../Card';
import moment from 'moment';

const CSS_VARIABLES = {
  MOBILE_BREAKPOINT: 360,
};

const Content = styled.div`
  display: flex;

  @media (max-width: ${CSS_VARIABLES.MOBILE_BREAKPOINT}px) {
    flex-direction: column;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px 0 10px;
  margin-right: 34px;
  border-right: 1px solid #aaa;
  font-size: 42px;

  @media (max-width: ${CSS_VARIABLES.MOBILE_BREAKPOINT}px) {
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

const Timetable = styled.li`
  display: flex;
  align-items: center;
  padding: 7px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #aaa;
  }

  @media (max-width: ${CSS_VARIABLES.MOBILE_BREAKPOINT}px) {
    justify-content: center;
  }
`;

const TimetableLabel = styled.span`
  display: inline-block;
  min-width: 125px;
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
}) => {
  return (
    <Card>
      <Content>
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
                  <TimetableLabel>{timetableLabel}</TimetableLabel>
                  <TimetableTimestamp>n/a</TimetableTimestamp>
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
      </Content>
    </Card>
  );
};
