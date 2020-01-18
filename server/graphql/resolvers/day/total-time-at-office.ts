import moment from 'moment';
import { getTimeFromMinutes } from '../../../utils/get-time-from-minutes';
import { TIME_FORMAT } from '../../../constants';
import { IDayTimetableRecord } from '../../../interfaces';
import { ITotalTimeAtOfficeResolverResult } from '../../interface';

export default ({
  workArriveTime,
  workLeaveTime,
}: IDayTimetableRecord): ITotalTimeAtOfficeResolverResult => {
  try {
    if (workArriveTime && workLeaveTime) {
      const workArriveDate = moment(workArriveTime, TIME_FORMAT);

      const workLeaveDate = moment(workLeaveTime, TIME_FORMAT);

      return getTimeFromMinutes(workLeaveDate.diff(workArriveDate, 'minutes'));
    }

    if (workArriveTime && !workLeaveTime) {
      const workArriveDate = moment(workArriveTime, TIME_FORMAT);
      const workLeaveDate = moment();

      return getTimeFromMinutes(workLeaveDate.diff(workArriveDate, 'minutes'));
    }

    return getTimeFromMinutes(0);
  } catch (e) {
    throw new Error(e);
  }
};
