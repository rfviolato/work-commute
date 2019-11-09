import * as moment from 'moment';
import { db } from './db';

export const logDate = async (date: string, dbKey: string) => {
  const momentDate = moment(date).utc();
  const day = momentDate.format('DD-MM-YYYY');
  const time = momentDate.format('HH:mm:ssZ');

  await db
    .ref('/')
    .child(day)
    .update({ [dbKey]: time });
};
