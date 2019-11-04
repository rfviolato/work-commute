import * as moment from 'moment';
import * as admin from 'firebase-admin';

const db = admin.database();

export default async (date: string, dbKey: string) => {
  const momentDate = moment(date);
  const today = momentDate.format('DD-MM-YYYY');
  const time = momentDate.format('hh:mm:ss');

  await db
    .ref('/')
    .child(today)
    .set({ [dbKey]: time });
};
