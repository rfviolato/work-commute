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
import { IconLabelCard } from '../IconLabelCard';

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

const Root = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TimeDisplayContainer = styled.div`
  width: 200px;

  &:not(:first-of-type) {
    margin-left: 32px;
  }

  @media (max-width: 720px) {
    &:not(:first-of-type) {
      margin-left: 0;
      margin-top: 32px;
    }
  }
`;

export const Today: React.FC = () => {
  const { loading, error, data } = useQuery<ITodayQueryData>(QUERY, {
    variables: {
      day: moment().format('YYYY-MM-DD'),
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
    },
  } = data;

  return (
    <Root>
      <TimeDisplayContainer>
        <IconLabelCard icon={faSunHaze} label="Morning commute">
          <TimeDisplay {...totalMorningCommuteTime} />
        </IconLabelCard>
      </TimeDisplayContainer>

      <TimeDisplayContainer>
        <IconLabelCard icon={faBuilding} label="Time at the office">
          <TimeDisplay {...totalTimeAtOffice} />
        </IconLabelCard>
      </TimeDisplayContainer>

      <TimeDisplayContainer>
        <IconLabelCard icon={faCloudsMoon} label="Evening commute">
          <TimeDisplay {...totalEveningCommuteTime} />
        </IconLabelCard>
      </TimeDisplayContainer>
    </Root>
  );
};
