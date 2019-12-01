import moment from 'moment';
import { FULL_DATE_FORMAT } from '../../../constants';
import { IWorkTimetable } from './../../interface';

export default async (timetables: IWorkTimetable[]): Promise<number> => {
  try {
    const result = timetables.reduce(
      (accum, timetable) => {
        const homeLeaveTime = moment(
          `${timetable.date}T${timetable.homeLeaveTime}`,
          FULL_DATE_FORMAT,
        );
        const workArriveTime = moment(
          `${timetable.date}T${timetable.workArriveTime}`,
          FULL_DATE_FORMAT,
        );
        const workLeaveTime = moment(
          `${timetable.date}T${timetable.workLeaveTime}`,
          FULL_DATE_FORMAT,
        );
        const homeArriveTime = moment(
          `${timetable.date}T${timetable.homeArriveTime}`,
          FULL_DATE_FORMAT,
        );

        const morningCommuteInMinutes = workArriveTime.diff(
          homeLeaveTime,
          'minutes',
        );

        const eveningCommuteInMinutes = homeArriveTime.diff(
          workLeaveTime,
          'minutes',
        );

        if (morningCommuteInMinutes && morningCommuteInMinutes > 0) {
          accum.minutesInCommutePeriod += morningCommuteInMinutes;
          accum.commuteCount++;
        }

        if (eveningCommuteInMinutes && eveningCommuteInMinutes > 0) {
          accum.minutesInCommutePeriod += eveningCommuteInMinutes;
          accum.commuteCount++;
        }

        return accum;
      },
      { minutesInCommutePeriod: 0, commuteCount: 0 },
    );

    const average = result.minutesInCommutePeriod / result.commuteCount;

    return isNaN(average) ? 0 : Math.round(average);
  } catch (e) {
    throw new Error(e);
  }
};
