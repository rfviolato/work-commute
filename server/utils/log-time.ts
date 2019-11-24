import moment from 'moment';
import { DAY_REF_FORMAT, TIME_FORMAT } from '../constants';
import { setOne } from '../lib/db';

export const logTime = async (date: string, property: string) => {
  const momentDate = moment(date).utc();
  const day = momentDate.format(DAY_REF_FORMAT);
  const time = momentDate.format(TIME_FORMAT);

  await setOne({ date: { $eq: day } }, { $set: { [property]: time } });
};
