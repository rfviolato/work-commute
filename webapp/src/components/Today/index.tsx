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
import { faClock } from '@fortawesome/pro-regular-svg-icons';
import { ITodayQueryData } from './interface';
import { LoadingSpinner } from '../LoadingSpinner';
import { TimeDisplay } from '../TimeDisplay';
import { IconLabelCard } from '../IconLabelCard';
import { Card } from '../Card';
import { TimetableDisplay } from '../TimetableDisplay';

const QUERY = gql`
  query getDay($day: String!) {
    Day(day: $day) {
      homeLeaveTime
      workArriveTime
      workLeaveTime
      homeArriveTime

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
};

const TimetableContainer = styled.div`
  margin-bottom: ${CSS_VARS.GRID_GUTTER}px;

  @media (max-width: 360px) {
    width: 250px;
  }
`;

const Root = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TimeCardsGrid = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-column-gap: ${CSS_VARS.GRID_GUTTER}px;
  justify-content: center;

  @media (max-width: 720px) {
    grid-template-columns: 200px;
    grid-column-gap: 0;
    grid-row-gap: ${CSS_VARS.GRID_GUTTER}px;
  }
`;

export const Today: React.FC = () => {
  const { loading, error, data } = useQuery<ITodayQueryData>(QUERY, {
    variables: {
      // day: moment().format('YYYY-MM-DD'),
      day: '2019-12-12',
    },
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
      homeLeaveTime,
      homeArriveTime,
      workArriveTime,
      workLeaveTime,
    },
  } = data;

  return (
    <Root>
      <TimetableContainer>
        <TimetableDisplay
          icon={faClock}
          timetables={[
            { timestamp: homeLeaveTime, label: 'Home leave time' },
            { timestamp: workArriveTime, label: 'Work arrive time' },
            { timestamp: workLeaveTime, label: 'Work leave time' },
            { timestamp: homeArriveTime, label: 'Home arrive time' },
          ]}
        />
      </TimetableContainer>

      <TimeCardsGrid>
        <IconLabelCard icon={faSunHaze} label="Morning commute">
          <TimeDisplay {...totalMorningCommuteTime} />
        </IconLabelCard>

        <IconLabelCard icon={faBuilding} label="Time at the office">
          <TimeDisplay {...totalTimeAtOffice} />
        </IconLabelCard>

        <IconLabelCard icon={faCloudsMoon} label="Evening commute">
          <TimeDisplay {...totalEveningCommuteTime} />
        </IconLabelCard>
      </TimeCardsGrid>
    </Root>
  );
};
