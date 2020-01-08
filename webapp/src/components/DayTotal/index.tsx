import React from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import {
  faBuilding,
  faSunHaze,
  faCloudsMoon,
} from '@fortawesome/pro-solid-svg-icons';
import query from './query';
import styled from '@emotion/styled';
import { IS_DEV, DEVELOPMENT_DAY } from '../../constants';
import { LoadingSpinner } from '../LoadingSpinner';
import { IconLabel } from '../IconLabel';
import { TimeDisplay } from '../TimeDisplay';
import { IDayTotalQuery } from './interface';

const CSS_VARS = {
  GRID_GUTTER: 32,
  MQ: {
    SMALL: 620,
  },
};

const Root = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: ${CSS_VARS.GRID_GUTTER}px;
  justify-content: center;

  @media (max-width: ${CSS_VARS.MQ.SMALL}px) {
    grid-template-columns: 100%;
    grid-column-gap: 0;
    grid-row-gap: 45px;
  }
`;

export const DayTotal: React.FC = () => {
  const day = IS_DEV ? DEVELOPMENT_DAY : moment().format('YYYY-MM-DD');
  const { loading, error, data } = useQuery<IDayTotalQuery>(query, {
    variables: { day },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error 😟</div>;
  }

  if (!data || !data.Day) {
    return <div>No data yet</div>;
  }

  const {
    Day: {
      totalEveningCommuteTime,
      totalTimeAtOffice,
      totalMorningCommuteTime,
    },
  } = data;

  return (
    <Root>
      <IconLabel icon={faSunHaze} label="Morning commute">
        <TimeDisplay {...totalMorningCommuteTime} />
      </IconLabel>

      <IconLabel icon={faBuilding} label="Time at the office">
        <TimeDisplay {...totalTimeAtOffice} />
      </IconLabel>

      <IconLabel icon={faCloudsMoon} label="Evening commute">
        <TimeDisplay {...totalEveningCommuteTime} />
      </IconLabel>
    </Root>
  );
};
