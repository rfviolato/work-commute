import moment from 'moment';
import { IDayTimetable, IGQLContext } from '../../interface';
import { IMorningCommuteTime } from './interface';
import { TIME_FORMAT } from '../../../constants';
import { getTimeFromMinutes } from '../../../utils/get-time-from-minutes';
import { IDayQueryParams } from '../query/interface';

export default async (
  { day }: IDayQueryParams,
  args: any,
  { dataLoaders }: IGQLContext,
): Promise<IMorningCommuteTime> => {
  const {
    homeLeaveTime,
    workArriveTime,
  } = (await dataLoaders.dayQueryLoader.load(day)) as IDayTimetable;

  if (homeLeaveTime && workArriveTime) {
    const homeLeaveTimeDate = moment(homeLeaveTime, TIME_FORMAT);
    const workArriveTimeDate = moment(workArriveTime, TIME_FORMAT);
    const totalMinutesCommuting = workArriveTimeDate.diff(
      homeLeaveTimeDate,
      'minutes',
    );

    return getTimeFromMinutes(totalMinutesCommuting);
  }

  return getTimeFromMinutes(0);
};
