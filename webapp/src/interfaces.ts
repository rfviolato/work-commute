export interface ITime {
  hours: number;
  minutes: number;
}

export enum EWorkDayEvents {
  DayOff = 'Day off',
  SickDay = 'Sick day',
}

export type TWorkDayEvents = EWorkDayEvents[] | null;

export interface IWorkDayTimetableRecord {
  day: string;
  date: string;
  events: TWorkDayEvents;
  homeArriveTime: string;
  homeLeaveTime: string;
  workArriveTime: string;
  workLeaveTime: string;
}

export interface IDayResult extends IWorkDayTimetableRecord {
  totalMorningCommuteTime: ITime;
  totalEveningCommuteTime: ITime;
  totalTimeAtOffice: ITime;
}

export interface ITimetableChartResult extends Pick<IWorkDayTimetableRecord, 'day' | 'events'> {
  totalMorningCommuteTime: ITime;
  totalEveningCommuteTime: ITime;
  totalTimeAtOffice: ITime;
}

export interface IPeriodResult {
  totalTimeAtOffice: ITime;
  averageTimeCommuting: ITime;
  averageTimeAtOffice: ITime;
  timetableChart: ITimetableChartResult[];
}

export interface IFirstRecordResult extends IWorkDayTimetableRecord {}
