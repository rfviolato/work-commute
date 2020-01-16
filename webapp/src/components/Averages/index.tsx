import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faTrain } from '@fortawesome/pro-solid-svg-icons';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { IAveragesQueryData } from './interface';
import { LoadingSpinner } from '../LoadingSpinner';

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

const TimeDisplay = styled.div`
  display: flex;
  align-self: flex-start;
  font-size: 24px;

  &:not(:first-of-type) {
    margin-left: 32px;
  }
`;

const TimeUnit = styled.span`
  font-size: 0.6em;
`;

const TimeIcon = styled(FontAwesomeIcon)`
  font-size: 1.1em;
  position: relative;
  top: -1px;
  margin-right: 8px;
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
        <TimeDisplay>
          <div>
            <TimeIcon icon={faTrain} />
          </div>
          {averageTimeCommuting.hours > 0 && (
            <div>
              <span>{averageTimeCommuting.hours}</span>
              <TimeUnit>hrs.</TimeUnit>
            </div>
          )}
          <div>
            <span>{averageTimeCommuting.minutes}</span>
            <TimeUnit>min.</TimeUnit>
          </div>
        </TimeDisplay>

        <TimeDisplay>
          <div>
            <TimeIcon icon={faBriefcase} />
          </div>
          <div>
            <span>{averageTimeAtOffice.hours}</span>
            <TimeUnit>hrs.</TimeUnit>
          </div>
          <div>
            <span>{averageTimeAtOffice.minutes}</span>
            <TimeUnit>min.</TimeUnit>
          </div>
        </TimeDisplay>
      </Content>
    </Root>
  );
};
