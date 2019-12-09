import moment from 'moment';
import { FULL_DATE_FORMAT } from '../../../constants';
import { IDayTimetable } from '../../interface';
import { IAverageTimeAtOffice } from './interface';
import { getTimeFromMinutes } from '../../../utils/get-time-from-minutes';

export default async (
  timetables: IDayTimetable[],
): Promise<IAverageTimeAtOffice> => {
  try {
    const result = timetables.reduce(
      (accum, { workArriveTime, workLeaveTime, day }) => {
        if (workArriveTime && workLeaveTime) {
          const workArriveDate = moment(
            `${day}T${workArriveTime}`,
            FULL_DATE_FORMAT,
          );

          const workLeaveDate = moment(
            `${day}T${workLeaveTime}`,
            FULL_DATE_FORMAT,
          );

          const minutesAtTheOffice = workLeaveDate.diff(
            workArriveDate,
            'minutes',
          );

          accum.workdayCount++;
          accum.workedMinutes += minutesAtTheOffice;
        }

        return accum;
      },
      { workedMinutes: 0, workdayCount: 0 },
    );

    const averageMinutesAtOffice = result.workedMinutes / result.workdayCount;

    if (isNaN(averageMinutesAtOffice) || averageMinutesAtOffice === Infinity) {
      return {
        hours: 0,
        minutes: 0,
      };
    }

    return getTimeFromMinutes(averageMinutesAtOffice);
  } catch (e) {
    throw new Error(e);
  }
};
