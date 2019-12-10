import React from 'react';
import moment from 'moment';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from '@emotion/styled';
import { ITodayQueryData } from './interface';
import { LoadingSpinner } from '../LoadingSpinner';

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

  console.log({ data });

  return <Root>hey!</Root>;
};
