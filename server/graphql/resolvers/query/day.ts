import { IDayQueryParams } from './interface';
import { IGQLContext } from './../../interface';

export default async (
  parent: any,
  { day }: IDayQueryParams,
  { db }: IGQLContext,
) => {
  return await db.workTimetable.findOne({
    day: {
      $eq: day,
    },
  });
};
