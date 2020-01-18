import moment from 'moment';
import { TIME_FORMAT } from '../../../constants';
import { getTimeFromMinutes } from '../../../utils/get-time-from-minutes';
import { IDayTimetableRecord } from '../../../interfaces';
import { ITotalEveningCommuteResolverResult } from '../../interface';

export default ({
  workLeaveTime,
  homeArriveTime,
}: IDayTimetableRecord): ITotalEveningCommuteResolverResult => {
  try {
    if (workLeaveTime && homeArriveTime) {
      const workLeaveTimeDate = moment(workLeaveTime, TIME_FORMAT);
      const homeArriveTimeDate = moment(homeArriveTime, TIME_FORMAT);
      const totalMinutesCommuting = homeArriveTimeDate.diff(
        workLeaveTimeDate,
        'minutes',
      );

      return getTimeFromMinutes(totalMinutesCommuting);
    }

    return getTimeFromMinutes(0);
  } catch (e) {
    throw new Error(e);
  }
};
