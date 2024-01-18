import { IGQLContext, IPeriodQueryParams } from "./../../types";

const periodQueryResolver = async (
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
    const error = new Error(e as string);

    throw error;
  }
};

export default periodQueryResolver;
