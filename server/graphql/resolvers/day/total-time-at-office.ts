import moment from 'moment';
import { getTimeFromMinutes } from '../../../utils/get-time-from-minutes';
import { TIME_FORMAT } from '../../../constants';
import { IDayTimetable } from '../../interface';
import { ITotalTimeAtOffice } from './interface';

export default async ({
  workArriveTime,
  workLeaveTime,
}: IDayTimetable): Promise<ITotalTimeAtOffice> => {
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
