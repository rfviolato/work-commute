import { IGQLContext } from "../../types";

export default async (
  parent: any,
  params: any,
  { db }: IGQLContext
): Promise<any> => {
  try {
    const result = await db.workTimetable
      .find()
      .sort({ date: 1 })
      .limit(1)
      .toArray();

    return result[0];
  } catch (e) {
    throw new Error(e);
  }
};
