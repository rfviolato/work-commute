import React from 'react';
import { faBriefcase, faTrain } from '@fortawesome/pro-solid-svg-icons';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { IAveragesQueryData } from './interface';
import { LoadingSpinner } from '../LoadingSpinner';
import { TimeDisplay } from '../TimeDisplay';
import { IconLabel } from '../IconLabel';
import { Card } from '../Card';

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

const CSS_VARS = {
  GRID_GUTTER: 32,
  GRID_COL_SIZE: 200,
};

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeDisplayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, ${CSS_VARS.GRID_COL_SIZE}px);
  grid-column-gap: ${CSS_VARS.GRID_GUTTER}px;

  @media (max-width: 520px) {
    grid-template-columns: ${CSS_VARS.GRID_COL_SIZE}px;
    grid-column-gap: 0;
    grid-row-gap: ${CSS_VARS.GRID_GUTTER}px;
  }
`;

interface IAveragesProps {}

export const Averages: React.FC<IAveragesProps> = () => {
  const { loading, error, data } = useQuery<IAveragesQueryData>(QUERY, {
    variables: {
      periodStart: '2019-01-01',
      periodEnd: '2020-12-31',
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
      <Card>
        <TimeDisplayGrid>
          <IconLabel icon={faTrain} label="Time commuting">
            <TimeDisplay {...averageTimeCommuting} />
          </IconLabel>

          <IconLabel icon={faBriefcase} label="Time at the office">
            <TimeDisplay {...averageTimeAtOffice} />
          </IconLabel>
        </TimeDisplayGrid>
      </Card>
    </Root>
  );
};
