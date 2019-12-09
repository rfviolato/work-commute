import moment from 'moment';
import { TIME_FORMAT } from '../../../constants';
import { IDayTimetable } from '../../interface';
import { IAverageTimeAtOffice } from './interface';
import { getTimeFromMinutes } from '../../../utils/get-time-from-minutes';

export default (timetables: IDayTimetable[]): IAverageTimeAtOffice => {
  try {
    const result = timetables.reduce(
      (accum, { workArriveTime, workLeaveTime, day }) => {
        if (workArriveTime && workLeaveTime) {
          const workArriveDate = moment(workArriveTime, TIME_FORMAT);
          const workLeaveDate = moment(workLeaveTime, TIME_FORMAT);
          const minutesAtTheOffice = workLeaveDate.diff(
            workArriveDate,
            'minutes',
          );

          accum.workdayCount++;
          accum.minutesAtTheOffice += minutesAtTheOffice;
        }

        return accum;
      },
      { minutesAtTheOffice: 0, workdayCount: 0 },
    );

    const averageMinutesAtOffice =
      result.minutesAtTheOffice / result.workdayCount;

    if (isNaN(averageMinutesAtOffice) || averageMinutesAtOffice === Infinity) {
      return getTimeFromMinutes(0);
    }

    return getTimeFromMinutes(averageMinutesAtOffice);
  } catch (e) {
    throw new Error(e);
  }
};
