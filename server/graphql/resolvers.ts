import { IResolvers } from 'apollo-server-micro';
import moment from 'moment';
import { db } from './../config/firebase';
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
    workedInPeriod: async (
      parent,
      { periodStart, periodEnd },
    ): Promise<IWorkedPeriod> => {
      try {
        let workedMinutesInPeriod = 0;
        const snapshot = await db
          .ref(TIMETABLE_REF)
          .orderByKey()
          .once('value');
        const dateFormat = `${DAY_REF_FORMAT}T${TIME_FORMAT}`;

        snapshot.forEach(childSnapshot => {
          const day = childSnapshot.key;

          if (day) {
            const isInPeriod = moment(day).isBetween(periodStart, periodEnd);

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

              return false;
            }

            return true;
          }
        });

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
  },
} as IResolvers;
