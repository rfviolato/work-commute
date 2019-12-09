import { Collection } from 'mongodb';

export interface IDayTimetable {
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
export interface IGQLContext {
  db: {
    workTimetable: Collection<any>;
  };
}
