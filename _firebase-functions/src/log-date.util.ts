import * as moment from 'moment';
import { db } from './db';
import { TIMETABLE_REF, DAY_REF_FORMAT, TIME_FORMAT } from './constants';

export const logDate = async (date: string, dbKey: string) => {
  const momentDate = moment(date).utc();
  const day = momentDate.format(DAY_REF_FORMAT);
  const time = momentDate.format(TIME_FORMAT);

  await db
    .ref(TIMETABLE_REF)
    .child(day)
    .update({ [dbKey]: time });
};
