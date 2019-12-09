import moment from 'moment';
import { IDayTimetable } from '../../interface';
import { IEveningCommuteTime } from './interface';
import { TIME_FORMAT } from '../../../constants';
import { getTimeFromMinutes } from '../../../utils/get-time-from-minutes';

export default ({
  workLeaveTime,
  homeArriveTime,
}: IDayTimetable): IEveningCommuteTime => {
  const workLeaveTimeDate = moment(workLeaveTime, TIME_FORMAT);
  const homeArriveTimeDate = moment(homeArriveTime, TIME_FORMAT);
  const totalMinutesCommuting = homeArriveTimeDate.diff(
    workLeaveTimeDate,
    'minutes',
  );

  return getTimeFromMinutes(totalMinutesCommuting);
};
