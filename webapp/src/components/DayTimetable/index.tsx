import React from 'react';
import moment from 'moment';
import { faClock } from '@fortawesome/pro-regular-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import { TimetableDisplay } from '../TimetableDisplay';
import { DEVELOPMENT_DAY, IS_DEV } from '../../constants';
import query from './query';
import { IDayTimetableQuery } from './interface';
import { LoadingSpinner } from '../LoadingSpinner';

export const DayTimetable: React.FC = () => {
  const day = IS_DEV ? DEVELOPMENT_DAY : moment().format('YYYY-MM-DD');
  const { loading, error, data } = useQuery<IDayTimetableQuery>(query, {
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
    Day: { homeLeaveTime, homeArriveTime, workArriveTime, workLeaveTime },
  } = data;

  return (
    <TimetableDisplay
      icon={faClock}
      timetables={[
        { timestamp: homeLeaveTime, label: 'Home leave time' },
        { timestamp: workArriveTime, label: 'Work arrive time' },
        { timestamp: workLeaveTime, label: 'Work leave time' },
        { timestamp: homeArriveTime, label: 'Home arrive time' },
      ]}
    />
  );
};
