import DataLoader from 'dataloader';
import { Collection } from 'mongodb';
import { IDb } from '../lib/interface';

// const batchPeriod = (worktimeTableCollection: Collection) =>
//   async function findPeriod(periodDates: readonly string[]) {
//     return new Promise<ArrayLike<unknown>>(async (resolve) => {
//       const results = await worktimeTableCollection
//         .find({ date: { $in: periodDates } })
//         .sort({ date: 1 })
//         .toArray();

//       resolve(
//         periodDates.map((date: string) => {
//           const day = results.find((day) => day.date === date);

//           if (day) {
//             return day;
//           }

//           return null;
//         }),
//       );

//       resolve(results);
//     });
//   };

const createDayBatchFunction = (db: IDb) => {
  return async (dayValues: readonly string[]) => {
    return new Promise<ArrayLike<unknown>>(async (resolve, reject) => {
      console.log('DAY DB READ');
      try {
        const dayTimetable = await db.workTimetable.findOne({
          day: {
            $eq: dayValues[0],
          },
        });

        resolve([dayTimetable]);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const createDataLoaders = (db: IDb) => {
  return {
    dayQueryLoader: new DataLoader(createDayBatchFunction(db), {
      cacheKeyFn: (key: string) => key.toString(),
    }),
  };
};
