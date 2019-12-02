import moment from 'moment';
import { FULL_DATE_FORMAT } from '../../../constants';
import { IWorkTimetable } from './../../interface';
import { IWorkedPeriod } from './interface';

export default async (timetables: IWorkTimetable[]): Promise<IWorkedPeriod> => {
  try {
    const totalWorkedMinutes = timetables.reduce(
      (accum, { workArriveTime, workLeaveTime, day }) => {
        if (workArriveTime && workLeaveTime) {
          const workLeaveDate = moment(
            `${day}T${workLeaveTime}`,
            FULL_DATE_FORMAT,
          );

          const workArriveDate = moment(
            `${day}T${workArriveTime}`,
            FULL_DATE_FORMAT,
          );

          return (accum += workLeaveDate.diff(workArriveDate, 'minutes'));
        }

        return accum;
      },
      0,
    );

    const hours = Math.floor(totalWorkedMinutes / 60);
    const minutes = totalWorkedMinutes % 60;

    return {
      hours,
      minutes,
    };
  } catch (e) {
    throw new Error(e);
  }
};
