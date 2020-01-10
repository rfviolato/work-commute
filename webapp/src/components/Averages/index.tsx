import React from 'react';
import styled from '@emotion/styled';
import { faBriefcase, faTrain } from '@fortawesome/pro-solid-svg-icons';
import { TimeDisplay } from '../TimeDisplay';
import { IconLabel } from '../IconLabel';
import { useQuery } from '@apollo/react-hooks';
import query from './query';
import {
  IAveragesQueryData,
  IAveragesComponentProps,
  IAveragesProps,
} from './interface';

const CSS_VARS = {
  GRID_GUTTER: 32,
  GRID_COL_SIZE: 200,
};

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(2, ${CSS_VARS.GRID_COL_SIZE}px);
  grid-column-gap: ${CSS_VARS.GRID_GUTTER}px;

  @media (max-width: 520px) {
    grid-template-columns: ${CSS_VARS.GRID_COL_SIZE}px;
    grid-column-gap: 0;
    grid-row-gap: ${CSS_VARS.GRID_GUTTER}px;
  }
`;

export const Averages: React.FC<IAveragesProps> = ({
  periodStart,
  periodEnd,
}) => {
  const { loading, data } = useQuery<IAveragesQueryData>(query, {
    variables: {
      periodStart,
      periodEnd,
    },
  });

  if (data && data.Period) {
    const {
      Period: { averageTimeCommuting, averageTimeAtOffice },
    } = data;

    return (
      <AveragesComponent
        averageTimeCommuting={averageTimeCommuting}
        averageTimeAtOffice={averageTimeAtOffice}
      />
    );
  }

  return <AveragesComponent isLoading={loading} />;
};

const DEFAULT_TIME_PROP = { hours: 0, minutes: 0 };

export const AveragesComponent: React.FC<IAveragesComponentProps> = ({
  averageTimeCommuting = DEFAULT_TIME_PROP,
  averageTimeAtOffice = DEFAULT_TIME_PROP,
  isLoading,
}) => {
  return (
    <Root>
      <IconLabel icon={faTrain} label="Time commuting">
        <TimeDisplay isLoading={isLoading} {...averageTimeCommuting} />
      </IconLabel>

      <IconLabel icon={faBriefcase} label="Time at the office">
        <TimeDisplay isLoading={isLoading} {...averageTimeAtOffice} />
      </IconLabel>
    </Root>
  );
};
