import React from 'react';
import styled from '@emotion/styled';
import { faBriefcase, faTrain } from '@fortawesome/pro-solid-svg-icons';
import { TimeDisplay } from '../TimeDisplay';
import { IconLabel } from '../IconLabel';
import { useQuery } from '@apollo/react-hooks';
import query from './query';
import { LoadingSpinner } from '../LoadingSpinner';
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
  const { loading, error, data } = useQuery<IAveragesQueryData>(query, {
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
    Period: { averageTimeCommuting, averageTimeAtOffice },
  } = data;

  return (
    <AveragesComponent
      averageTimeCommuting={averageTimeCommuting}
      averageTimeAtOffice={averageTimeAtOffice}
    />
  );
};

export const AveragesComponent: React.FC<IAveragesComponentProps> = ({
  averageTimeCommuting,
  averageTimeAtOffice,
}) => {
  return (
    <Root>
      <IconLabel icon={faTrain} label="Time commuting">
        <TimeDisplay {...averageTimeCommuting} />
      </IconLabel>

      <IconLabel icon={faBriefcase} label="Time at the office">
        <TimeDisplay {...averageTimeAtOffice} />
      </IconLabel>
    </Root>
  );
};
