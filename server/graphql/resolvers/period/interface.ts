import { IDayTimetable } from '../../interface';
import { IMorningCommuteTime, IEveningCommuteTime } from '../day/interface';

interface ITime {
  hours: number;
  minutes: number;
}

interface IChartPrecessedData {
  totalMorningCommuteTime: IMorningCommuteTime;
  totalEveningCommuteTime: IEveningCommuteTime;
  totalTimeAtOffice: ITotalTimeAtOffice;
}

export type ITotalTimeAtOffice = ITime;
export type IAverageTimeCommuting = ITime;
export type IAverageTimeAtOffice = ITime;
export type ITimetableChartData = IDayTimetable & IChartPrecessedData;
