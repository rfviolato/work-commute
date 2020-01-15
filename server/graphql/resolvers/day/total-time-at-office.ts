import moment from 'moment';
import { getTimeFromMinutes } from '../../../utils/get-time-from-minutes';
import { TIME_FORMAT } from '../../../constants';
import { IDayTimetable, IGQLContext } from '../../interface';
import { ITotalTimeAtOffice } from './interface';
import { IDayQueryParams } from '../query/interface';

export default async (
  { day }: IDayQueryParams,
  args: any,
  { dataLoaders }: IGQLContext,
): Promise<ITotalTimeAtOffice> => {
  try {
    const {
      workArriveTime,
      workLeaveTime,
    } = (await dataLoaders.dayQueryLoader.load(day)) as IDayTimetable;

    if (workArriveTime && workLeaveTime) {
      const workArriveDate = moment(workArriveTime, TIME_FORMAT);
      const workLeaveDate = moment(workLeaveTime, TIME_FORMAT);

      return getTimeFromMinutes(workLeaveDate.diff(workArriveDate, 'minutes'));
    }

    if (workArriveTime && !workLeaveTime) {
      const workArriveDate = moment(workArriveTime, TIME_FORMAT);
      const workLeaveDate = moment();

      return getTimeFromMinutes(workLeaveDate.diff(workArriveDate, 'minutes'));
    }

    return getTimeFromMinutes(0);
  } catch (e) {
    throw new Error(e);
  }
};
