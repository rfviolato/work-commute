import React from 'react';
import { faBriefcase, faTrain } from '@fortawesome/pro-solid-svg-icons';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { IPeriodQueryData, ITime } from './interface';
import { LoadingSpinner } from '../LoadingSpinner';
import { TimeDisplay } from '../TimeDisplay';
import { IconLabel } from '../IconLabel';
import { Card } from '../Card';
import moment from 'moment';

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

const Chart = styled.div`
  width: 1000px;
  margin-bottom: 60px;
`;

const BarsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 20px;
`;

const SingleBarContainer = styled.div`
  position: relative;
  flex: 1;

  &:not(:first-child) {
    margin-left: 20px;
  }
`;

const Bar = styled.div`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #4edfa5;
`;

const BarChartAxis = styled.div`
  height: 4px;
  width: 100%;
  background: #f1f1f1;
  border-radius: 8px;
`;

const BarChartYValueLabel = styled.div`
  position: absolute;
  width: 100%;
  top: 15px;
  left: 0;
  font-size: 14px;
  text-align: center;
`;

const BarChartXValue = styled.div`
  position: absolute;
  width: 100%;
  bottom: -30px;
  left: 0;
  font-size: 16px;
  text-align: center;
`;

interface IPeriodProps {}

function getTotalMinutesFromTime(time: ITime): number {
  return time.hours * 60 + time.minutes;
}

function getBarHeight(
  maxHeight: number,
  maxValue: number,
  value: number,
): number {
  return (value * maxHeight) / maxValue;
}

function getArrayMaxValue(array: any[], acessor: Function): number {
  return array.reduce((accum: number, currentItem: any) => {
    const value = acessor(currentItem);

    if (value > accum) {
      return value;
    }

    return accum;
  }, 0);
}

export const Period: React.FC<IPeriodProps> = () => {
  const [chartDaraMaxYValue, setChartDaraMaxYValue] = React.useState<number>(0);
  const { loading, error, data } = useQuery<IPeriodQueryData>(QUERY, {
    variables: {
      periodStart: '2019-11-30',
      periodEnd: '2019-12-31',
    },
  });

  React.useEffect(() => {
    if (data) {
      const {
        Period: { timetableChart },
      } = data;

      setChartDaraMaxYValue(
        getArrayMaxValue(timetableChart, (day: any) =>
          getTotalMinutesFromTime(day.totalTimeAtOffice),
        ),
      );
    }
  }, [data]);

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
  const CHART_HEIGHT = 500;

  return (
    <Root>
      <Card>
        <Chart>
          <BarsContainer>
            {timetableChart.map(({ totalTimeAtOffice, day }) => {
              const totalMinutes = getTotalMinutesFromTime(totalTimeAtOffice);
              const height = getBarHeight(
                CHART_HEIGHT,
                chartDaraMaxYValue,
                totalMinutes,
              );

              return (
                <SingleBarContainer>
                  <Bar
                    key={day}
                    style={{
                      height: `${height}px`,
                    }}
                  />
                  <BarChartYValueLabel>
                    {totalTimeAtOffice.hours}h{totalTimeAtOffice.minutes}
                  </BarChartYValueLabel>
                  <BarChartXValue>{moment(day).format('DD')}</BarChartXValue>
                </SingleBarContainer>
              );
            })}
          </BarsContainer>
          <BarChartAxis />
        </Chart>
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
