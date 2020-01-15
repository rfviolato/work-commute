import { IDb } from '../lib/interface';
import DataLoader from 'dataloader';
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

export interface IDataLoaders {
  dayQueryLoader: DataLoader<string, unknown, string>;
}

export interface IGQLContext {
  db: IDb;
  dataLoaders: IDataLoaders;
}
