import { IResolvers } from 'apollo-server-micro';

interface IWorkTimetable {
  homeArriveTime: string;
  homeLeaveTime: string;
  workArriveTime: string;
  workLeaveTime: string;
  events: {
    [key: string]: string;
  }[];
}

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
      console.log(periodStart, periodEnd);
      try {
        // const snapshot = (await db
        //   .ref('/workDayTimetables/10-11-2019')
        //   .once('value')) as admin.database.DataSnapshot;
        // const dayTimetable = snapshot.val() as IWorkTimetable;

        return {
          hours: 8,
          minutes: 30,
        };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
} as IResolvers;
