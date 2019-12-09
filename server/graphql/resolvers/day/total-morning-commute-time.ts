import moment from 'moment';
import { IDayTimetable } from '../../interface';
import { IMorningCommuteTime } from './interface';
import { TIME_FORMAT } from '../../../constants';
import { getTimeFromMinutes } from '../../../utils/get-time-from-minutes';

export default ({
  homeLeaveTime,
  workArriveTime,
}: IDayTimetable): IMorningCommuteTime => {
  if (homeLeaveTime && workArriveTime) {
    const homeLeaveTimeDate = moment(homeLeaveTime, TIME_FORMAT);
    const workArriveTimeDate = moment(workArriveTime, TIME_FORMAT);
    const totalMinutesCommuting = workArriveTimeDate.diff(
      homeLeaveTimeDate,
      'minutes',
    );

    return getTimeFromMinutes(totalMinutesCommuting);
  }

  return getTimeFromMinutes(0);
};
