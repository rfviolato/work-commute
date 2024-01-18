import { UpdateResult } from "mongodb";
import moment from "moment";
import { TIME_FORMAT, DAY_FORMAT } from "../constants";
import { createDbClient } from "../lib/db";

export const logTime = async (
  date: string,
  property: string
): Promise<UpdateResult> => {
  const momentDate = moment(date).utc();
  const day = momentDate.format(DAY_FORMAT);
  const time = momentDate.format(TIME_FORMAT);
  const db = await createDbClient();

  return db.workTimetable.updateOne(
    { day: { $eq: day } },
    {
      $set: { [property]: time },
      $setOnInsert: {
        date: new Date(momentDate.toISOString()),
        day,
      },
    },
    { upsert: true }
  );
};
