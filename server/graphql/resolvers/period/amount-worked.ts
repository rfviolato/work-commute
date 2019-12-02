import moment from 'moment';
import { FULL_DATE_FORMAT } from '../../../constants';
import { IWorkTimetable } from './../../interface';
import { IWorkedPeriod } from './interface';

export default async (timetables: IWorkTimetable[]): Promise<IWorkedPeriod> => {
  try {
    const totalWorkedMinutes = timetables.reduce((accum, timetable) => {
      const workLeaveTime = moment(
        `${timetable.day}T${timetable.workLeaveTime}`,
        FULL_DATE_FORMAT,
      );
      const workArriveTime = moment(
        `${timetable.day}T${timetable.workArriveTime}`,
        FULL_DATE_FORMAT,
      );

      return (accum += workLeaveTime.diff(workArriveTime, 'minutes'));
    }, 0);

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
