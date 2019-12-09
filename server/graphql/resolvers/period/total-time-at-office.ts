import moment from 'moment';
import { TIME_FORMAT } from '../../../constants';
import { IDayTimetable } from '../../interface';
import { ITotalTimeAtOffice } from './interface';
import { getTimeFromMinutes } from '../../../utils/get-time-from-minutes';

export default (timetables: IDayTimetable[]): ITotalTimeAtOffice => {
  try {
    const totalMinutesAtOffice = timetables.reduce(
      (accum, { workArriveTime, workLeaveTime, day }) => {
        if (workArriveTime && workLeaveTime) {
          const workLeaveDate = moment(workLeaveTime, TIME_FORMAT);

          const workArriveDate = moment(workArriveTime, TIME_FORMAT);

          return (accum += workLeaveDate.diff(workArriveDate, 'minutes'));
        }

        return accum;
      },
      0,
    );

    return getTimeFromMinutes(totalMinutesAtOffice);
  } catch (e) {
    throw new Error(e);
  }
};
