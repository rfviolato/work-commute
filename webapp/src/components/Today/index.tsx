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
`;

const Content = styled.div`
  display: flex;
`;

const TimeDisplayContainer = styled.div`
  &:not(:first-of-type) {
    margin-left: 32px;
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

  if (!data) {
    return <Root>No data 🤔</Root>;
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
      <Content>
        <TimeDisplayContainer>
          <TimeDisplay
            {...totalMorningCommuteTime}
            icon={faSunHaze}
            label="Morning commute"
          />
        </TimeDisplayContainer>

        <TimeDisplayContainer>
          <TimeDisplay
            {...totalTimeAtOffice}
            icon={faBuilding}
            label="Time at the office"
          />
        </TimeDisplayContainer>

        <TimeDisplayContainer>
          <TimeDisplay
            {...totalEveningCommuteTime}
            icon={faCloudsMoon}
            label="Evening commute"
          />
        </TimeDisplayContainer>
      </Content>
    </Root>
  );
};
