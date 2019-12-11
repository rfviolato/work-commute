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

const TimeDisplayContainer = styled.div`
  width: 200px;

  &:not(:first-of-type) {
    margin-left: 32px;
  }

  @media (max-width: 900px) {
    &:not(:first-of-type) {
      margin-left: 0;
      margin-top: 32px;
    }
  }
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }

  &:not(:first-of-type) {
    margin-top: 32px;
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
      <ContentRow>
        <LoadingSpinner />
      </ContentRow>
    );
  }

  if (error) {
    return <ContentRow>Error 😟</ContentRow>;
  }

  if (!data || !data.Day) {
    return <ContentRow>No data yet</ContentRow>;
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
    <div>
      <ContentRow>
        <TimeDisplayContainer style={{ width: 'auto' }}>
          <TimetableDisplay
            icon={faClock}
            timetables={[
              { timestamp: homeLeaveTime, label: 'Home leave time' },
              { timestamp: workArriveTime, label: 'Work arrive time' },
              { timestamp: workLeaveTime, label: 'Work leave time' },
              { timestamp: homeArriveTime, label: 'Home arrive time' },
            ]}
          />
        </TimeDisplayContainer>
      </ContentRow>

      <ContentRow>
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
      </ContentRow>
    </div>
  );
};

/**
        <TimeDisplayContainer>
          <IconLabelCard icon={faClock} label="Home leave time">
            {homeLeaveTime
              ? moment(homeLeaveTime, 'HH:mm:ssZ').format('HH:mm')
              : 'n/a'}
          </IconLabelCard>
        </TimeDisplayContainer>

        <TimeDisplayContainer>
          <IconLabelCard icon={faClock} label="Work arrive time">
            {homeLeaveTime
              ? moment(workArriveTime, 'HH:mm:ssZ').format('HH:mm')
              : 'n/a'}
          </IconLabelCard>
        </TimeDisplayContainer>

        <TimeDisplayContainer>
          <IconLabelCard icon={faClock} label="Work leave time">
            {homeLeaveTime
              ? moment(workLeaveTime, 'HH:mm:ssZ').format('HH:mm')
              : 'n/a'}
          </IconLabelCard>
        </TimeDisplayContainer>
        <TimeDisplayContainer>
          <IconLabelCard icon={faClock} label="Home arrive time">
            {homeLeaveTime
              ? moment(homeArriveTime, 'HH:mm:ssZ').format('HH:mm')
              : 'n/a'}
          </IconLabelCard>
        </TimeDisplayContainer>
 */
