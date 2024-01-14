export interface ITime {
  hours: number;
  minutes: number;
}

export interface IWorkDayTimetableRecord {
  day: string;
  date: string;
  events: string[];
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

export interface ITimetableChartResult extends IWorkDayTimetableRecord {
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
