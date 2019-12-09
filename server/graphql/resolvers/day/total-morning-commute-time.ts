import moment from 'moment';
import { IDayTimetable } from '../../interface';
import { IMorningCommuteTime } from './interface';
import { TIME_FORMAT } from '../../../constants';

export default ({
  homeLeaveTime,
  workArriveTime,
}: IDayTimetable): IMorningCommuteTime => {
  const homeLeaveTimeDate = moment(homeLeaveTime, TIME_FORMAT);
  const workArriveTimeDate = moment(workArriveTime, TIME_FORMAT);
  const totalMinutesCommuting = workArriveTimeDate.diff(
    homeLeaveTimeDate,
    'minutes',
  );

  const hours = Math.floor(totalMinutesCommuting / 60);
  const minutes = totalMinutesCommuting % 60;

  return {
    hours,
    minutes,
  };

  return {
    hours: 0,
    minutes: 0,
  };
};
