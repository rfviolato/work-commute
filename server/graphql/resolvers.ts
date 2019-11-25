import { IResolvers } from 'apollo-server-micro';
import { IPeriodResolverParams } from './interface';
import moment from 'moment';
import { FULL_DATE_FORMAT } from '../constants';
import { findAndSort } from './../lib/db';
import { IWorkTimetable } from './interface';

interface IWorkedPeriod {
  hours: number;
  minutes: number;
}

export default {
  Query: {
    Period: (parent, { periodStart, periodEnd }) => ({
      periodStart,
      periodEnd,
    }),
  },
  Period: {
    amountWorked: async ({
      periodStart,
      periodEnd,
    }: IPeriodResolverParams): Promise<IWorkedPeriod> => {
      try {
        const timetables: IWorkTimetable[] = await findAndSort(
          {
            date: {
              $gte: periodStart,
              $lte: periodEnd,
            },
          },
          { date: 1 },
        );

        const totalWorkedMinutes = timetables.reduce((accum, timetable) => {
          const workLeaveTime = moment(
            `${timetable.date}T${timetable.workLeaveTime}`,
            FULL_DATE_FORMAT,
          );
          const workArriveTime = moment(
            `${timetable.date}T${timetable.workArriveTime}`,
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
    },
    averageCommuteTime: async ({
      periodStart,
      periodEnd,
    }: IPeriodResolverParams): Promise<number> => {
      try {
        const timetables: IWorkTimetable[] = await findAndSort(
          {
            date: {
              $gte: periodStart,
              $lte: periodEnd,
            },
          },
          { date: 1 },
        );

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
    },
  },
} as IResolvers;
