import { IResolvers } from 'apollo-server-micro';
import moment from 'moment';
import { db } from './../config/firebase';
import { IPeriodResolverParams } from './interface';
import {
  TIMETABLE_REF,
  DAY_REF_FORMAT,
  TIME_FORMAT,
} from './../config/constants';

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
        let workedMinutesInPeriod = 0;
        const periodStartMoment = moment(periodStart, DAY_REF_FORMAT);
        const periodEndMoment = moment(periodEnd, DAY_REF_FORMAT);
        const snapshot = await db
          .ref(TIMETABLE_REF)
          .orderByKey()
          .once('value');
        const dateFormat = `${DAY_REF_FORMAT}T${TIME_FORMAT}`;

        snapshot.forEach(childSnapshot => {
          const day = childSnapshot.key;

          if (day) {
            const isInPeriod = moment(day, DAY_REF_FORMAT).isBetween(
              periodStartMoment,
              periodEndMoment,
            );

            if (isInPeriod) {
              const dayTimeTable = childSnapshot.val();
              const workLeaveTime = moment(
                `${day}T${dayTimeTable.workLeaveTime}`,
                dateFormat,
              );
              const workArriveTime = moment(
                `${day}T${dayTimeTable.workArriveTime}`,
                dateFormat,
              );

              workedMinutesInPeriod += workLeaveTime.diff(
                workArriveTime,
                'minutes',
              );
            }
          }
        });

        console.log({ workedMinutesInPeriod });

        const hours = Math.floor(workedMinutesInPeriod / 60);
        const minutes = workedMinutesInPeriod % 60;

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
        let minutesInCommutePeriod = 0;
        let commuteCount = 0;
        const periodStartMoment = moment(periodStart, DAY_REF_FORMAT);
        const periodEndMoment = moment(periodEnd, DAY_REF_FORMAT);
        const snapshot = await db
          .ref(TIMETABLE_REF)
          .orderByKey()
          .once('value');
        const dateFormat = `${DAY_REF_FORMAT}T${TIME_FORMAT}`;

        snapshot.forEach(childSnapshot => {
          const day = childSnapshot.key;

          if (day) {
            const isInPeriod = moment(day, DAY_REF_FORMAT).isBetween(
              periodStartMoment,
              periodEndMoment,
            );

            if (isInPeriod) {
              const dayTimeTable = childSnapshot.val();
              const homeLeaveTime = moment(
                `${day}T${dayTimeTable.homeLeaveTime}`,
                dateFormat,
              );
              const workArriveTime = moment(
                `${day}T${dayTimeTable.workArriveTime}`,
                dateFormat,
              );
              const workLeaveTime = moment(
                `${day}T${dayTimeTable.workLeaveTime}`,
                dateFormat,
              );
              const homeArriveTime = moment(
                `${day}T${dayTimeTable.homeArriveTime}`,
                dateFormat,
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
                minutesInCommutePeriod += morningCommuteInMinutes;
                commuteCount++;
              }

              if (eveningCommuteInMinutes && eveningCommuteInMinutes > 0) {
                minutesInCommutePeriod += eveningCommuteInMinutes;
                commuteCount++;
              }
            }
          }
        });

        const average = minutesInCommutePeriod / commuteCount;

        return isNaN(average) ? 0 : Math.round(average);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
} as IResolvers;
