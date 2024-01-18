import { IGQLContext, IDayQueryParams } from "./../../types";

const dayQueryResolver = async (
  _: any,
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
    const error = new Error(e as string);

    throw error;
  }
};

export default dayQueryResolver;
