import { IDayResult } from '../../interfaces';

type DayTimetableQueryData = Pick<
  IDayResult,
  'totalMorningCommuteTime' | 'totalEveningCommuteTime' | 'totalTimeAtOffice'
>;

export interface IDayTotalQuery {
  Day: DayTimetableQueryData;
}
