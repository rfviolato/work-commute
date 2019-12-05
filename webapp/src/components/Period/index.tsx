import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faTrain } from '@fortawesome/pro-solid-svg-icons';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { IPeriodQueryData } from './interface';
import { LoadingSpinner } from '../LoadingSpinner';

const QUERY = gql`
  {
    Period(periodStart: "2019-01-01", periodEnd: "2019-12-31") {
      averageTimeWorking {
        hours
        minutes
      }
      averageTimeCommuting
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

interface IPeriodProps {}

export const Period: React.FC<IPeriodProps> = () => {
  const { loading, error, data } = useQuery<IPeriodQueryData>(QUERY);

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
    Period: { averageTimeCommuting, averageTimeWorking },
  } = data;

  return (
    <Root>
      <Content>
        <TimeDisplay>
          <div>
            <TimeIcon icon={faTrain} />
          </div>
          <div>
            <span>{averageTimeCommuting}</span>
            <TimeUnit>min.</TimeUnit>
          </div>
        </TimeDisplay>

        <TimeDisplay>
          <div>
            <TimeIcon icon={faBriefcase} />
          </div>
          <div>
            <span>{averageTimeWorking.hours}</span>
            <TimeUnit>hrs.</TimeUnit>
          </div>
          <div>
            <span>{averageTimeWorking.minutes}</span>
            <TimeUnit>min.</TimeUnit>
          </div>
        </TimeDisplay>
      </Content>
    </Root>
  );
};
