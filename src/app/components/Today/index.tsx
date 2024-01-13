import React from 'react';
import { Card } from '../Card';
import { DayTimetable } from '../DayTimetable';
import { DayTotal } from '../DayTotal';
import { Root, DayTimetableContainer, DayTotalContainerCard } from './styled';

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
