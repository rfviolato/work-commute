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
        // let minutesInCommutePeriod = 0;
        // let commuteCount = 0;
        // const periodStartMoment = moment(periodStart, DAY_REF_FORMAT);
        // const periodEndMoment = moment(periodEnd, DAY_REF_FORMAT);
        // const snapshot = await db
        //   .ref(TIMETABLE_REF)
        //   .orderByKey()
        //   .once('value');
        // const dateFormat = `${DAY_REF_FORMAT}T${TIME_FORMAT}`;

        // snapshot.forEach(childSnapshot => {
        //   const day = childSnapshot.key;

        //   if (day) {
        //     const isInPeriod = moment(day, DAY_REF_FORMAT).isBetween(
        //       periodStartMoment,
        //       periodEndMoment,
        //     );

        //     if (isInPeriod) {
        //       const dayTimeTable = childSnapshot.val();
        //       const homeLeaveTime = moment(
        //         `${day}T${dayTimeTable.homeLeaveTime}`,
        //         dateFormat,
        //       );
        //       const workArriveTime = moment(
        //         `${day}T${dayTimeTable.workArriveTime}`,
        //         dateFormat,
        //       );
        //       const workLeaveTime = moment(
        //         `${day}T${dayTimeTable.workLeaveTime}`,
        //         dateFormat,
        //       );
        //       const homeArriveTime = moment(
        //         `${day}T${dayTimeTable.homeArriveTime}`,
        //         dateFormat,
        //       );

        //       const morningCommuteInMinutes = workArriveTime.diff(
        //         homeLeaveTime,
        //         'minutes',
        //       );

        //       const eveningCommuteInMinutes = homeArriveTime.diff(
        //         workLeaveTime,
        //         'minutes',
        //       );

        //       if (morningCommuteInMinutes && morningCommuteInMinutes > 0) {
        //         minutesInCommutePeriod += morningCommuteInMinutes;
        //         commuteCount++;
        //       }

        //       if (eveningCommuteInMinutes && eveningCommuteInMinutes > 0) {
        //         minutesInCommutePeriod += eveningCommuteInMinutes;
        //         commuteCount++;
        //       }
        //     }
        //   }
        // });

        // const average = minutesInCommutePeriod / commuteCount;

        // return isNaN(average) ? 0 : Math.round(average);
        return 42;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
} as IResolvers;
