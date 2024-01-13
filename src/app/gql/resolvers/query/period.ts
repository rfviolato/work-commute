import { IGQLContext, IPeriodQueryParams } from "./../../types";

export default async (
  parent: any,
  { periodStart, periodEnd }: IPeriodQueryParams,
  { db }: IGQLContext
) => {
  try {
    return await db.workTimetable
      .find({
        date: {
          $gte: new Date(periodStart),
          $lte: new Date(periodEnd),
        },
      })
      .sort({ date: 1 })
      .toArray();
  } catch (e) {
    throw new Error(e);
  }
};
