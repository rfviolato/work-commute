import moment from 'moment';
import { IDayTimetable, IGQLContext } from '../../interface';
import { IEveningCommuteTime } from './interface';
import { TIME_FORMAT } from '../../../constants';
import { getTimeFromMinutes } from '../../../utils/get-time-from-minutes';
import { IDayQueryParams } from '../query/interface';

export default async (
  { day }: IDayQueryParams,
  args: any,
  { dataLoaders }: IGQLContext,
): Promise<IEveningCommuteTime> => {
  const {
    workLeaveTime,
    homeArriveTime,
  } = (await dataLoaders.dayQueryLoader.load(day)) as IDayTimetable;

  if (workLeaveTime && homeArriveTime) {
    const workLeaveTimeDate = moment(workLeaveTime, TIME_FORMAT);
    const homeArriveTimeDate = moment(homeArriveTime, TIME_FORMAT);
    const totalMinutesCommuting = homeArriveTimeDate.diff(
      workLeaveTimeDate,
      'minutes',
    );

    return getTimeFromMinutes(totalMinutesCommuting);
  }

  return getTimeFromMinutes(0);
};
