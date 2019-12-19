import React, { HtmlHTMLAttributes } from 'react';
import { faBriefcase, faTrain } from '@fortawesome/pro-solid-svg-icons';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { select, scaleBand, scaleLinear, max, axisBottom, axisLeft } from 'd3';
import { IPeriodQueryData } from './interface';
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

const Chart = styled.div`
  border: 1px solid #555;

  .date-chart-bar {
    fill: #4edfa5;
  }
`;

const chartRef = React.createRef<HTMLDivElement>();
const fakeData = [
  {
    date: '14-12-2019',
    commuteTime: 50,
  },
  {
    date: '15-12-2019',
    commuteTime: 57,
  },
  {
    date: '16-12-2019',
    commuteTime: 68,
  },
  {
    date: '17-12-2019',
    commuteTime: 54,
  },
  {
    date: '18-12-2019',
    commuteTime: 52,
  },
  {
    date: '19-12-2019',
    commuteTime: 62,
  },
];

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
export const Period: React.FC<IPeriodProps> = () => {
  const { loading, error, data } = useQuery<IPeriodQueryData>(QUERY, {
    variables: {
      periodStart: '2019-01-01',
      periodEnd: '2020-12-31',
    },
  });

  React.useEffect(() => {
    if (chartRef.current) {
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
        .attr('transform', `translate(${PADDING}, ${PADDING})`);
      const xScale = scaleBand()
        .range([0, WIDTH])
        .padding(0.6);
      const yScale = scaleLinear().range([HEIGHT, 0]);

      xScale.domain(fakeData.map((data) => data.date));
      yScale.domain([0, max(fakeData, (data) => data.commuteTime) || 0]);

      chart
        .append('g')
        .call(axisBottom(xScale))
        .attr('transform', `translate(0, ${HEIGHT})`);

      chart
        .append('g')
        .call(axisLeft(yScale))
        .attr('transform', `translate(0, 0)`);

      chart
        .selectAll()
        .data(fakeData)
        .enter()
        .append('path')
        .attr('class', 'date-chart-bar')
        .attr('d', (d) =>
          topRondedCornersRect(
            Math.round(xScale(d.date) || 0),
            Math.round(yScale(d.commuteTime)),
            Math.round(xScale.bandwidth()),
            Math.round(HEIGHT - yScale(d.commuteTime)),
            5,
          ),
        );
    }
  }, []);

  return <Chart ref={chartRef}></Chart>;

  // if (loading) {
  //   return (
  //     <Root>
  //       <LoadingSpinner />
  //     </Root>
  //   );
  // }

  // if (error) {
  //   return <Root>Error 😟</Root>;
  // }

  // if (!data) {
  //   return <Root>No data 🤔</Root>;
  // }

  // const {
  //   Period: { averageTimeCommuting, averageTimeAtOffice },
  // } = data;

  // return (
  //   <Root>
  //     <Card>
  //       <TimeDisplayGrid>
  //         <IconLabel icon={faTrain} label="Time commuting">
  //           <TimeDisplay {...averageTimeCommuting} />
  //         </IconLabel>

  //         <IconLabel icon={faBriefcase} label="Time at the office">
  //           <TimeDisplay {...averageTimeAtOffice} />
  //         </IconLabel>
  //       </TimeDisplayGrid>
  //     </Card>
  //   </Root>
  // );
};
