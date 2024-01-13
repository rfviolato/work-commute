import { IDayResult } from '../../interfaces';

type DayTimetableQueryData = Pick<
  IDayResult,
  'homeArriveTime' | 'homeLeaveTime' | 'workArriveTime' | 'workLeaveTime'
>;
export interface IDayTimetableQuery {
  Day: DayTimetableQueryData;
}
