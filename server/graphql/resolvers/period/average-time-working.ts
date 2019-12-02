import moment from 'moment';
import { FULL_DATE_FORMAT } from '../../../constants';
import { IWorkTimetable } from './../../interface';
import { ITimeWorked } from './interface';

export default async (timetables: IWorkTimetable[]): Promise<ITimeWorked> => {
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

    const averageMinutesAtTheOffice =
      result.workedMinutes / result.workdayCount;

    if (
      isNaN(averageMinutesAtTheOffice) ||
      averageMinutesAtTheOffice === Infinity
    ) {
      return {
        hours: 0,
        minutes: 0,
      };
    }

    const hours = Math.floor(averageMinutesAtTheOffice / 60);
    const minutes = Math.floor(averageMinutesAtTheOffice % 60);

    return {
      hours,
      minutes,
    };
  } catch (e) {
    throw new Error(e);
  }
};
