import { IGQLContext } from '../../interface';

export default async (parent: any, params: any, { db }: IGQLContext) => {
  const result = await db.workTimetable
    .find()
    .sort({ date: 1 })
    .limit(1)
    .toArray();

  return result[0];
};
