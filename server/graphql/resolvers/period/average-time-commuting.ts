import moment from 'moment';
import { TIME_FORMAT } from '../../../constants';
import { IDayTimetable } from './../../interface';
import { IAverageTimeCommuting } from './interface';
import { getTimeFromMinutes } from './../../../utils/get-time-from-minutes';

export default (timetables: IDayTimetable[]): IAverageTimeCommuting => {
  try {
    const result = timetables.reduce(
      (
        accum,
        { homeLeaveTime, workArriveTime, workLeaveTime, homeArriveTime },
      ) => {
        const hasMorningCommute = homeLeaveTime && workArriveTime;
        const hasEveningCommute = workLeaveTime && homeArriveTime;

        if (hasMorningCommute) {
          const homeLeaveDate = moment(homeLeaveTime, TIME_FORMAT);
          const workArriveDate = moment(workArriveTime, TIME_FORMAT);
          const morningCommuteMinutes = workArriveDate.diff(
            homeLeaveDate,
            'minutes',
          );

          accum.minutesCommuting += morningCommuteMinutes;
          accum.commuteCount++;
        }

        if (hasEveningCommute) {
          const workLeaveDate = moment(workLeaveTime, TIME_FORMAT);
          const homeArriveDate = moment(homeArriveTime, TIME_FORMAT);
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

    const averageMinutesCommuting =
      result.minutesCommuting / result.commuteCount;

    if (
      isNaN(averageMinutesCommuting) ||
      averageMinutesCommuting === Infinity
    ) {
      return getTimeFromMinutes(0);
    }

    return getTimeFromMinutes(averageMinutesCommuting);
  } catch (e) {
    throw new Error(e);
  }
};
