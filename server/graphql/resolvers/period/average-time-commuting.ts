import moment from 'moment';
import { FULL_DATE_FORMAT } from '../../../constants';
import { IWorkTimetable } from './../../interface';

export default async (timetables: IWorkTimetable[]): Promise<number> => {
  try {
    const result = timetables.reduce(
      (
        accum,
        { homeLeaveTime, workArriveTime, workLeaveTime, homeArriveTime, day },
      ) => {
        const hasMorningCommute = homeLeaveTime && workArriveTime;
        const hasEveningCommute = workLeaveTime && homeArriveTime;

        if (hasMorningCommute) {
          const homeLeaveDate = moment(
            `${day}T${homeLeaveTime}`,
            FULL_DATE_FORMAT,
          );

          const workArriveDate = moment(
            `${day}T${workArriveTime}`,
            FULL_DATE_FORMAT,
          );

          const morningCommuteMinutes = workArriveDate.diff(
            homeLeaveDate,
            'minutes',
          );

          accum.minutesCommuting += morningCommuteMinutes;
          accum.commuteCount++;
        }

        if (hasEveningCommute) {
          const workLeaveDate = moment(
            `${day}T${workLeaveTime}`,
            FULL_DATE_FORMAT,
          );

          const homeArriveDate = moment(
            `${day}T${homeArriveTime}`,
            FULL_DATE_FORMAT,
          );

          const eveningCommuteInMinutes = homeArriveDate.diff(
            workLeaveDate,
            'minutes',
          );

          accum.minutesCommuting += eveningCommuteInMinutes;
          accum.commuteCount++;
        }

        return accum;
      },
      { minutesCommuting: 0, commuteCount: 0 },
    );

    if (result.commuteCount === 0) {
      return 0;
    }

    return Math.round(result.minutesCommuting / result.commuteCount);
  } catch (e) {
    throw new Error(e);
  }
};
