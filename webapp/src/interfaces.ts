export interface ITime {
  hours: number;
  minutes: number;
}

export enum EWorkDayEvents {
  DayOff = 'DAY_OFF',
  SickDay = 'SICK_DAY',
  PublicTransportShortage = 'PUBLIC_TRANSPORT_SHORTAGE',
  PublicTransportDelay = 'PUBLIC_TRANSPORT_DELAY',
  WorkingFromHome = 'WFH',
  BikeCommute = 'BIKE_COMMUTE',
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
