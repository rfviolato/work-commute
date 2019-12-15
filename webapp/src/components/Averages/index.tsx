import React from 'react';
import { faBriefcase, faTrain } from '@fortawesome/pro-solid-svg-icons';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { IAveragesQueryData } from './interface';
import { LoadingSpinner } from '../LoadingSpinner';
import { TimeDisplay } from '../TimeDisplay';
import { IconLabelCard } from '../IconLabelCard';

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
  align-items: center;
  justify-content: center;
`;

const TimeDisplayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 200px);
  grid-column-gap: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 200px;
    grid-column-gap: 0;
    grid-row-gap: 32px;
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
      <TimeDisplayGrid>
        <IconLabelCard icon={faTrain} label="Time commuting">
          <TimeDisplay {...averageTimeCommuting} />
        </IconLabelCard>

        <IconLabelCard icon={faBriefcase} label="Time at the office">
          <TimeDisplay {...averageTimeAtOffice} />
        </IconLabelCard>
      </TimeDisplayGrid>
    </Root>
  );
};
