import moment from 'moment';
import { db } from './../config/firebase';
import {
  TIMETABLE_REF,
  DAY_REF_FORMAT,
  TIME_FORMAT,
} from './../config/constants';

export const logDate = async (date: string, dbKey: string) => {
  const momentDate = moment(date).utc();
  const day = momentDate.format(DAY_REF_FORMAT);
  const time = momentDate.format(TIME_FORMAT);

  await db
    .ref(TIMETABLE_REF)
    .child(day)
    .update({ [dbKey]: time });
};
