import { IGQLContext, IDayQueryParams } from './../../interface';

export default async (
  parent: any,
  { day }: IDayQueryParams,
  { db }: IGQLContext,
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
