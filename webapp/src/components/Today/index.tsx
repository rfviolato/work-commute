import React from 'react';
import moment from 'moment';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from '@emotion/styled';
import {
  faBuilding,
  faSunHaze,
  faCloudsMoon,
} from '@fortawesome/pro-solid-svg-icons';
import { ITodayQueryData } from './interface';
import { LoadingSpinner } from '../LoadingSpinner';
import { TimeDisplay } from '../TimeDisplay';
import { IconLabel } from '../IconLabel';
import { IS_DEV } from '../../constants';
import { Card } from '../Card';
import { DayTimetable } from '../../DayTimetable';

const DEVELOPMENT_DAY = '2019-12-12';
const QUERY = gql`
  query getDay($day: String!) {
    Day(day: $day) {
      totalMorningCommuteTime {
        hours
        minutes
      }

      totalEveningCommuteTime {
        hours
        minutes
      }

      totalTimeAtOffice {
        hours
        minutes
      }
    }
  }
`;

const CSS_VARS = {
  GRID_GUTTER: 32,
  MQ: {
    MEDIUM: 960,
    SMALL: 620,
    X_SMALL: 375,
  },
};

const Root = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 100%;

  @media (max-width: ${CSS_VARS.MQ.MEDIUM}px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TimetableContainer = styled.div`
  margin-right: 40px;
  flex: 0 1 auto;

  @media (max-width: ${CSS_VARS.MQ.MEDIUM}px) {
    margin-right: 0;
    margin-bottom: 40px;
  }

  @media (max-width: ${CSS_VARS.MQ.X_SMALL}px) {
    width: 100%;
    max-width: 250px;
  }
`;

const TimeCardsContainer = styled(Card)`
  flex: 1 1 auto;

  @media (max-width: ${CSS_VARS.MQ.SMALL}px) {
    max-width: 250px;
  }

  @media (max-width: ${CSS_VARS.MQ.MEDIUM}px) {
    width: 100%;
    flex: 1 0 auto;
  }
`;

const TimeCardsGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: ${CSS_VARS.GRID_GUTTER}px;
  justify-content: center;

  @media (max-width: ${CSS_VARS.MQ.SMALL}px) {
    grid-template-columns: 100%;
    grid-column-gap: 0;
    grid-row-gap: 45px;
  }
`;

export const Today: React.FC = () => {
  const day = IS_DEV ? DEVELOPMENT_DAY : moment().format('YYYY-MM-DD');
  const { loading, error, data } = useQuery<ITodayQueryData>(QUERY, {
    variables: { day },
  });

  if (loading) {
    return (
      <Root>
        <LoadingSpinner />
      </Root>
    );
  }

  if (error) {
    return <Root>Error 😟</Root>;
  }

  if (!data || !data.Day) {
    return <Root>No data yet</Root>;
  }

  const {
    Day: {
      totalEveningCommuteTime,
      totalTimeAtOffice,
      totalMorningCommuteTime,
    },
  } = data;

  return (
    <Root>
      <TimetableContainer>
        <Card>
          <DayTimetable />
        </Card>
      </TimetableContainer>

      <TimeCardsContainer>
        <TimeCardsGrid>
          <IconLabel icon={faSunHaze} label="Morning commute">
            <TimeDisplay {...totalMorningCommuteTime} />
          </IconLabel>

          <IconLabel icon={faBuilding} label="Time at the office">
            <TimeDisplay {...totalTimeAtOffice} />
          </IconLabel>

          <IconLabel icon={faCloudsMoon} label="Evening commute">
            <TimeDisplay {...totalEveningCommuteTime} />
          </IconLabel>
        </TimeCardsGrid>
      </TimeCardsContainer>
    </Root>
  );
};
