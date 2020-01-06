import React from 'react';
import { faBriefcase, faTrain } from '@fortawesome/pro-solid-svg-icons';
import moment from 'moment';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { IPeriodQueryData } from './interface';
import { LoadingSpinner } from '../LoadingSpinner';
import { TimeDisplay } from '../TimeDisplay';
import { IconLabel } from '../IconLabel';
import { Card } from '../Card';
import { PeriodBarChat } from '../PeriodBarChart';
import { MonthPicker } from '../MonthPicker';
import { IMonthPickerValue } from '../MonthPicker/interface';

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
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PeriodSwitcherContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
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

const defaultPeriodEndDate = moment()
  .endOf('month')
  .add(1, 'day');
const defaultPeriodStartDate = moment().startOf('month');
const defaultPeriodEnd = defaultPeriodEndDate.format('YYYY-MM-DD');
const defaultPeriodStart = defaultPeriodStartDate.format('YYYY-MM-DD');

export const Period: React.FC<IPeriodProps> = () => {
  const [periodStart, setPeriodStart] = React.useState(defaultPeriodStart);
  const [periodEnd, setPeriodEnd] = React.useState(defaultPeriodEnd);
  const [currentSelectedMonth, setCurrentSelectedMonth] = React.useState(
    defaultPeriodStartDate.format('MM'),
  );
  const [currentSelectedYear, setCurrentSelectedYear] = React.useState(
    defaultPeriodEndDate.format('YYYY'),
  );
  const onPeriodSwitch = React.useCallback(
    ({ year, month }: IMonthPickerValue) => {
      const newPeriodStartDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD');
      const newPeriodEndDate = moment(newPeriodStartDate).endOf('month');

      setPeriodStart(newPeriodStartDate.format('YYYY-MM-DD'));
      setPeriodEnd(newPeriodEndDate.add(1, 'day').format('YYYY-MM-DD'));
      setCurrentSelectedMonth(newPeriodStartDate.format('MM'));
      setCurrentSelectedYear(newPeriodStartDate.format('YYYY'));
    },
    [],
  );
  const { loading, error, data } = useQuery<IPeriodQueryData>(QUERY, {
    variables: {
      periodStart,
      periodEnd,
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
        <PeriodSwitcherContainer>
          <MonthPicker
            minYear="2019"
            minMonth="11"
            maxYear="2020"
            maxMonth="01"
            currentMonth={currentSelectedMonth}
            currentYear={currentSelectedYear}
            onSwitch={onPeriodSwitch}
          />
        </PeriodSwitcherContainer>

        <ChartWrapper>
          <PeriodBarChat
            data={timetableChart}
            periodStart={periodStart}
            periodEnd={periodEnd}
          />
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
