import React from 'react';
import { faBriefcase, faTrain } from '@fortawesome/pro-solid-svg-icons';
import moment from 'moment';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { IPeriodQueryData, ITime } from './interface';
import { LoadingSpinner } from '../LoadingSpinner';
import { TimeDisplay } from '../TimeDisplay';
import { IconLabel } from '../IconLabel';
import { Card } from '../Card';
import { PeriodBarChat } from '../PeriodBarChart';

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

      timetableChart {
        day

        totalTimeAtOffice {
          hours
          minutes
        }
        totalMorningCommuteTime {
          hours
          minutes
        }
        totalEveningCommuteTime {
          hours
          minutes
        }
      }
    }
  }
`;

const CSS_VARS = {
  GRID_GUTTER: 32,
  GRID_COL_SIZE: 200,
};

const Root = styled.div`
  width: 100%;
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

const ChartWrapper = styled.div`
  width: 100%;
  margin-bottom: 60px;
`;

interface IPeriodProps {}

const defaultPeriodEnd = moment()
  .add(1, 'day')
  .format('YYYY-MM-DD');
const defaultPeriodStart = moment()
  .subtract(1, 'month')
  .format('YYYY-MM-DD');

export const Period: React.FC<IPeriodProps> = () => {
  const { loading, error, data } = useQuery<IPeriodQueryData>(QUERY, {
    variables: {
      periodStart: defaultPeriodStart,
      periodEnd: defaultPeriodEnd,
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
    Period: { averageTimeCommuting, averageTimeAtOffice, timetableChart },
  } = data;

  return (
    <Root>
      <Card>
        <ChartWrapper>
          <PeriodBarChat data={timetableChart} />
        </ChartWrapper>

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
