import { IGQLContext, IDayQueryParams } from "./../types";

export default async (
  parent: any,
  { day }: IDayQueryParams,
  { db }: IGQLContext
): Promise<any> => {
  try {
    return await db.workTimetable.findOne({
      day: {
        $eq: day,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};
