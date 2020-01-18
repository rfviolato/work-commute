import { Collection } from 'mongodb';

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
