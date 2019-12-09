import moment from 'moment';
import { FULL_DATE_FORMAT } from '../../../constants';
import { IDayTimetable } from './../../interface';
import { IAverageTimeCommuting } from './interface';
import { getTimeFromMinutes } from './../../../utils/get-time-from-minutes';

export default async (
  timetables: IDayTimetable[],
): Promise<IAverageTimeCommuting> => {
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
      return {
        hours: 0,
        minutes: 0,
      };
    }

    return getTimeFromMinutes(result.minutesCommuting);
  } catch (e) {
    throw new Error(e);
  }
};
