import React from 'react';
import { faBriefcase, faTrain } from '@fortawesome/pro-solid-svg-icons';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { select, scaleBand, scaleLinear, max, axisBottom, axisLeft } from 'd3';
import { IPeriodQueryData, ITime } from './interface';
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
  margin-bottom: 15px;

  .date-chart-bar {
    fill: #4edfa5;
  }
`;

const chartRef = React.createRef<HTMLDivElement>();

interface IPeriodProps {}

function topRondedCornersRect(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): string {
  const M = `${x}, ${y + radius}`;
  const V1 = height - radius;
  const H1 = width;
  const V2 = -height;
  const A1 = `${radius} ${radius} 0 0 0 -${radius} -${radius}`;
  const H2 = -width + radius * 2;
  const A2 = `${radius} ${radius} 0 0 0 -${radius} ${radius}`;

  return `M${M} v${V1} h${H1} v${V2 + radius} a${A1} h${H2} a${A2}`;
}

function getTotalMinutesFromTime(time: ITime): number {
  return time.hours * 60 + time.minutes;
}

export const Period: React.FC<IPeriodProps> = () => {
  const { loading, error, data } = useQuery<IPeriodQueryData>(QUERY, {
    variables: {
      periodStart: '2019-11-30',
      periodEnd: '2020-02-01',
    },
  });

  const timetableChartData = data && data.Period && data.Period.timetableChart;

  React.useEffect(() => {
    if (chartRef.current && timetableChartData) {
      const PADDING = 40;
      const SVG_WIDTH = 1000;
      const SVG_HEIGHT = 600;
      const WIDTH = SVG_WIDTH - PADDING * 2;
      const HEIGHT = SVG_HEIGHT - PADDING * 2;
      const svg = select(chartRef.current)
        .append('svg')
        .attr('width', `${SVG_WIDTH}px`)
        .attr('height', `${SVG_HEIGHT}px`);

      const chart = svg
        .append('g')
        .attr('transform', `translate(${PADDING + 10}, ${PADDING})`);
      const xScale = scaleBand()
        .range([0, WIDTH])
        .padding(0.4);
      const yScale = scaleLinear().range([HEIGHT, 0]);

      xScale.domain(timetableChartData.map((data) => data.day));
      yScale.domain([
        0,
        max(timetableChartData, (data): number =>
          getTotalMinutesFromTime(data.totalTimeAtOffice),
        ) || 0,
      ]);

      chart
        .append('g')
        .call(axisBottom(xScale))
        .attr('transform', `translate(0, ${HEIGHT})`);

      const yAxis = axisLeft(yScale).tickFormat((minutesTick) => {
        if (typeof minutesTick !== 'number') {
          return '0';
        }
        const hours = Math.floor(minutesTick / 60);
        const minutes = Math.floor(minutesTick % 60);

        if (minutes === 0) {
          return `${hours}h`;
        }

        return `${hours}h${minutes}m`;
      });

      chart
        .append('g')
        .call(yAxis)
        .attr('transform', `translate(0, 0)`);

      chart
        .selectAll()
        .data(timetableChartData)
        .enter()
        .append('path')
        .attr('class', 'date-chart-bar')
        .attr('d', (d) => {
          const totalMinutes = getTotalMinutesFromTime(d.totalTimeAtOffice);

          return topRondedCornersRect(
            xScale(d.day) || 0,
            yScale(totalMinutes),
            xScale.bandwidth(),
            HEIGHT - yScale(totalMinutes),
            5,
          );
        });
    }
  }, [timetableChartData]);

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
        <Chart ref={chartRef}></Chart>
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
