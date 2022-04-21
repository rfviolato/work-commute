import React from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import query from './query';
import { IS_DEV, DEVELOPMENT_DAY, DATE_FORMAT } from '../../constants';
import { IconLabel } from '../IconLabel';
import { TimeDisplay } from '../TimeDisplay';
import { IDayTotalQuery } from './interface';
import { Root } from './styled';

const LABELS = {
  MORNING_COMMUTE: 'Morning commute',
  TIME_AT_THE_OFFICE: 'Time at the office',
  TOTAL_EVENING_COMMUTE: 'Evening commute',
};

export const DayTotal: React.FC = () => {
  const day = IS_DEV ? DEVELOPMENT_DAY : moment().format(DATE_FORMAT);
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
        <IconLabel icon={<i className="fas fa-sun-haze" />} label={LABELS.MORNING_COMMUTE}>
          <TimeDisplay {...totalMorningCommuteTime} />
        </IconLabel>

        <IconLabel icon={<i className="fas fa-building" />} label={LABELS.TIME_AT_THE_OFFICE}>
          <TimeDisplay {...totalTimeAtOffice} />
        </IconLabel>

        <IconLabel icon={<i className="fas fa-clouds-moon" />} label={LABELS.TOTAL_EVENING_COMMUTE}>
          <TimeDisplay {...totalEveningCommuteTime} />
        </IconLabel>
      </Root>
    );
  }

  return (
    <Root>
      <IconLabel
        hasError={!!error}
        icon={<i className="fas fa-sun-haze" />}
        label={LABELS.MORNING_COMMUTE}
      >
        <TimeDisplay isLoading={loading} />
      </IconLabel>

      <IconLabel
        hasError={!!error}
        icon={<i className="fas fa-building" />}
        label={LABELS.TIME_AT_THE_OFFICE}
      >
        <TimeDisplay isLoading={loading} />
      </IconLabel>

      <IconLabel
        hasError={!!error}
        icon={<i className="fas fa-clouds-moon" />}
        label={LABELS.TOTAL_EVENING_COMMUTE}
      >
        <TimeDisplay isLoading={loading} />
      </IconLabel>
    </Root>
  );
};
