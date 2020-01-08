import React from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { IPeriodQueryData } from './interface';
import { LoadingSpinner } from '../LoadingSpinner';
import { Card } from '../Card';
import { PeriodBarChart } from '../PeriodBarChart';
import { MonthPicker } from '../MonthPicker';
import { IMonthPickerValue } from '../MonthPicker/interface';
import { Averages } from '../Averages';

const QUERY = gql`
  query getPeriod {
    FirstRecord {
      day
    }
  }
`;

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

const ChartWrapper = styled.div`
  width: 100%;
  margin-bottom: 60px;
`;

interface IPeriodProps {}

const today = moment();
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
    FirstRecord: { day },
  } = data;

  const firstRecordDayDate = moment(day);

  return (
    <Root>
      <Card>
        <PeriodSwitcherContainer>
          <MonthPicker
            minYear={firstRecordDayDate.format('YYYY')}
            minMonth={firstRecordDayDate.format('MM')}
            maxYear={today.format('YYYY')}
            maxMonth={today.format('MM')}
            currentMonth={currentSelectedMonth}
            currentYear={currentSelectedYear}
            onSwitch={onPeriodSwitch}
          />
        </PeriodSwitcherContainer>

        <ChartWrapper>
          <PeriodBarChart periodStart={periodStart} periodEnd={periodEnd} />
        </ChartWrapper>

        <Averages periodStart={periodStart} periodEnd={periodEnd} />
      </Card>
    </Root>
  );
};
