import React from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import { TimetableDisplay } from '../TimetableDisplay';
import { DEVELOPMENT_DAY, IS_DEV, DATE_FORMAT } from '../../constants';
import query from './query';
import { IDayTimetableQuery } from './interface';

const LABELS = {
  HOME_LEAVE: 'Home leave time',
  HOME_ARRIVE: 'Home arrive time',
  WORK_LEAVE: 'Work leave time',
  WORK_ARRIVE: 'Work arrive time',
};

export const DayTimetable: React.FC = () => {
  const day = IS_DEV ? DEVELOPMENT_DAY : moment().format(DATE_FORMAT);
  const { loading, data, error } = useQuery<IDayTimetableQuery>(query, {
    variables: { day },
  });

  if (data && data.Day) {
    const {
      Day: { homeLeaveTime, homeArriveTime, workArriveTime, workLeaveTime },
    } = data;

    return (
      <TimetableDisplay
        icon={<i className="far fa-clock" />}
        timetables={[
          { timestamp: homeLeaveTime, label: LABELS.HOME_LEAVE },
          { timestamp: workArriveTime, label: LABELS.WORK_ARRIVE },
          { timestamp: workLeaveTime, label: LABELS.WORK_LEAVE },
          { timestamp: homeArriveTime, label: LABELS.HOME_ARRIVE },
        ]}
      />
    );
  }

  return (
    <TimetableDisplay
      icon={<i className="far fa-clock" />}
      isLoading={loading}
      hasError={!!error}
      timetables={[
        { label: LABELS.HOME_LEAVE },
        { label: LABELS.WORK_ARRIVE },
        { label: LABELS.WORK_LEAVE },
        { label: LABELS.HOME_ARRIVE },
      ]}
    />
  );
};
