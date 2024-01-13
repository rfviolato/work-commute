import { Collection } from "mongodb";

export interface ITime {
  hours: number;
  minutes: number;
}

export interface IDB {
  workTimetable: Collection;
}

export interface IDayTimetableRecord {
  _id: string;
  date: string;
  day: string;
  homeArriveTime: string;
  homeLeaveTime: string;
  workArriveTime: string;
  workLeaveTime: string;
  events: {
    [key: string]: string;
  }[];
}

export interface ITotalEveningCommuteResolverResult extends ITime {}
export interface ITotalMorningCommuteResolverResult extends ITime {}
export interface ITotalTimeAtOfficeResolverResult extends ITime {}
export interface IAverageTimeCommutingResolverResult extends ITime {}
export interface IAverageTimeAtOfficeResolverResult extends ITime {}

interface IChartProcessedData {
  totalMorningCommuteTime: ITotalMorningCommuteResolverResult;
  totalEveningCommuteTime: ITotalEveningCommuteResolverResult;
  totalTimeAtOffice: ITotalTimeAtOfficeResolverResult;
}

export type ITimetableChartResolverResult = (IDayTimetableRecord &
  IChartProcessedData)[];

export interface IGQLContext {
  db: {
    workTimetable: Collection<any>;
  };
}

export interface IPeriodQueryParams {
  periodStart: string;
  periodEnd: string;
}

export interface IDayQueryParams {
  day: string;
}
