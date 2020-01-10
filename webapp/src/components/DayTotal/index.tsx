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
import { IconLabel } from '../IconLabel';
import { TimeDisplay } from '../TimeDisplay';
import { IDayTotalQuery } from './interface';
import { QueryErrorIcon } from '../QueryErrorIcon';

const LABELS = {
  MORNING_COMMUTE: 'Morning commute',
  TIME_AT_THE_OFFICE: 'Time at the office',
  TOTAL_EVENING_COMMUTE: 'Evening commute',
};

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

const QueryErrorContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

export const DayTotal: React.FC = () => {
  const day = IS_DEV ? DEVELOPMENT_DAY : moment().format('YYYY-MM-DD');
  const { data, loading, error } = useQuery<IDayTotalQuery>(query, {
    variables: { day },
  });

  if (data && data.Day) {
    const {
      Day: {
        totalEveningCommuteTime,
        totalTimeAtOffice,
        totalMorningCommuteTime,
      },
    } = data;

    return (
      <Root>
        <IconLabel icon={faSunHaze} label={LABELS.MORNING_COMMUTE}>
          <TimeDisplay {...totalMorningCommuteTime} />
        </IconLabel>

        <IconLabel icon={faBuilding} label={LABELS.TIME_AT_THE_OFFICE}>
          <TimeDisplay {...totalTimeAtOffice} />
        </IconLabel>

        <IconLabel icon={faCloudsMoon} label={LABELS.TOTAL_EVENING_COMMUTE}>
          <TimeDisplay {...totalEveningCommuteTime} />
        </IconLabel>
      </Root>
    );
  }

  return (
    <Root>
      {error && (
        <QueryErrorContainer>
          <QueryErrorIcon />
        </QueryErrorContainer>
      )}

      <IconLabel icon={faSunHaze} label={LABELS.MORNING_COMMUTE}>
        <TimeDisplay isLoading={loading} />
      </IconLabel>

      <IconLabel icon={faBuilding} label={LABELS.TIME_AT_THE_OFFICE}>
        <TimeDisplay isLoading={loading} />
      </IconLabel>

      <IconLabel icon={faCloudsMoon} label={LABELS.TOTAL_EVENING_COMMUTE}>
        <TimeDisplay isLoading={loading} />
      </IconLabel>
    </Root>
  );
};
