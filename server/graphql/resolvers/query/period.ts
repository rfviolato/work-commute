import { IGQLContext, IPeriodQueryParams } from './../../interface';

export default async (
  parent: any,
  { periodStart, periodEnd }: IPeriodQueryParams,
  { db }: IGQLContext,
) => {
  return await db.workTimetable
    .find({
      date: {
        $gte: periodStart,
        $lte: periodEnd,
      },
    })
    .sort({ date: 1 })
    .toArray();
};
