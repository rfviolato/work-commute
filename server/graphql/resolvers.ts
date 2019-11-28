import { IResolvers } from 'apollo-server-micro';
import moment from 'moment';
import { IPeriodResolverParams } from './interface';
import { FULL_DATE_FORMAT } from '../constants';
import { IWorkTimetable, IGQLContext } from './interface';

interface IWorkedPeriod {
  hours: number;
  minutes: number;
}

interface ITimeAtOffice {
  hours: number;
  minutes: number;
}

export default {
  Query: {
    Period: async (
      parent,
      { periodStart, periodEnd }: IPeriodResolverParams,
      { db },
    ) =>
      await db.workTimetable
        .find({
          date: {
            $gte: periodStart,
            $lte: periodEnd,
          },
        })
        .sort({ date: 1 })
        .toArray(),
  },
  Period: {
    amountWorked: async (
      timetables: IWorkTimetable[],
    ): Promise<IWorkedPeriod> => {
      try {
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
    averageCommuteTime: async (
      timetables: IWorkTimetable[],
    ): Promise<number> => {
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
    },
    averageTimeAtOffice: async (
      timetables: IWorkTimetable[],
    ): Promise<ITimeAtOffice> => {
      try {
        const result = timetables.reduce(
          (accum, timetable) => {
            const { workArriveTime, workLeaveTime } = timetable;

            if (workArriveTime && workLeaveTime) {
              const workArriveTimeMoment = moment(
                `${timetable.date}T${timetable.workArriveTime}`,
                FULL_DATE_FORMAT,
              );

              const workLeaveTimeMoment = moment(
                `${timetable.date}T${timetable.workLeaveTime}`,
                FULL_DATE_FORMAT,
              );

              const minutesAtTheOffice = workLeaveTimeMoment.diff(
                workArriveTimeMoment,
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
    },
  },
} as IResolvers<any, IGQLContext>;
