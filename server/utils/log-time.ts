import { UpdateWriteOpResult } from 'mongodb';
import moment from 'moment';
import { DAY_FORMAT, TIME_FORMAT, FULL_DATE_FORMAT } from '../constants';
import { createDbClient } from '../lib/db';

export const logTime = async (
  date: string,
  property: string,
): Promise<UpdateWriteOpResult> => {
  const momentDate = moment(date).utc();
  const day = momentDate.format(DAY_FORMAT);
  const time = momentDate.format(TIME_FORMAT);
  const db = await createDbClient();

  return db.workTimetable.updateOne(
    { date: { $eq: day } },
    { $set: { [property]: time } },
    { upsert: true },
  );
};
