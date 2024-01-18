import { IGQLContext } from "../../types";

const firstRecordInfoResolver = async (
  _: any,
  __: any,
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
    const error = new Error(e as string);

    throw error;
  }
};

export default firstRecordInfoResolver;
