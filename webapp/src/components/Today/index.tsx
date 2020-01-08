import React from 'react';
import styled from '@emotion/styled';
import { Card } from '../Card';
import { DayTimetable } from '../DayTimetable';
import { DayTotal } from '../DayTotal';

const CSS_VARS = {
  GRID_GUTTER: 32,
  MQ: {
    MEDIUM: 960,
    SMALL: 620,
    X_SMALL: 375,
  },
};

const Root = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 100%;

  @media (max-width: ${CSS_VARS.MQ.MEDIUM}px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DayTimetableContainer = styled.div`
  margin-right: 40px;
  flex: 0 1 auto;

  @media (max-width: ${CSS_VARS.MQ.MEDIUM}px) {
    margin-right: 0;
    margin-bottom: 40px;
  }

  @media (max-width: ${CSS_VARS.MQ.X_SMALL}px) {
    width: 100%;
    max-width: 250px;
  }
`;

const DayTotalContainerCard = styled(Card)`
  flex: 1 1 auto;

  @media (max-width: ${CSS_VARS.MQ.SMALL}px) {
    max-width: 250px;
  }

  @media (max-width: ${CSS_VARS.MQ.MEDIUM}px) {
    width: 100%;
    flex: 1 0 auto;
  }
`;

export const Today: React.FC = () => {
  return (
    <Root>
      <DayTimetableContainer>
        <Card>
          <DayTimetable />
        </Card>
      </DayTimetableContainer>

      <DayTotalContainerCard>
        <DayTotal />
      </DayTotalContainerCard>
    </Root>
  );
};
