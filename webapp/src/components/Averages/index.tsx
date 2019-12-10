import React from 'react';
import { faBriefcase, faTrain } from '@fortawesome/pro-solid-svg-icons';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { IAveragesQueryData } from './interface';
import { LoadingSpinner } from '../LoadingSpinner';
import { TimeDisplay } from '../TimeDisplay';

const QUERY = gql`
  query getPeriod($periodStart: String!, $periodEnd: String!) {
    Period(periodStart: $periodStart, periodEnd: $periodEnd) {
      totalTimeAtOffice {
        hours
        minutes
      }

      averageTimeAtOffice {
        hours
        minutes
      }

      averageTimeCommuting {
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

interface IAveragesProps {}

export const Averages: React.FC<IAveragesProps> = () => {
  const { loading, error, data } = useQuery<IAveragesQueryData>(QUERY, {
    variables: {
      periodStart: '2019-01-01',
      periodEnd: '2019-12-31',
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
    Period: { averageTimeCommuting, averageTimeAtOffice },
  } = data;

  return (
    <Root>
      <Content>
        <TimeDisplayContainer>
          <TimeDisplay
            {...averageTimeCommuting}
            icon={faTrain}
            label="Time commuting"
          />
        </TimeDisplayContainer>

        <TimeDisplayContainer>
          <TimeDisplay
            {...averageTimeAtOffice}
            icon={faBriefcase}
            label="Time at the office"
          />
        </TimeDisplayContainer>
      </Content>
    </Root>
  );
};
