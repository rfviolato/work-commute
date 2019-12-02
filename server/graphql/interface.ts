import { Collection } from 'mongodb';

export interface IWorkTimetable {
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

export interface IPeriodQueryParams {
  periodStart: string;
  periodEnd: string;
}

export interface IGQLContext {
  db: {
    workTimetable: Collection<any>;
  };
}
