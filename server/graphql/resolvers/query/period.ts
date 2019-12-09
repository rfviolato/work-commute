import { IGQLContext } from './../../interface';
import { IPeriodQueryParams } from './interface';

export default async (
  parent: any,
  { periodStart, periodEnd }: IPeriodQueryParams,
  { db }: IGQLContext,
) => {
  return await db.workTimetable
    .find({
      date: {
        $gte: new Date(periodStart),
        $lte: new Date(periodEnd),
      },
    })
    .sort({ date: 1 })
    .toArray();
};
