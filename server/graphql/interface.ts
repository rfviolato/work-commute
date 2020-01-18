import { Collection } from 'mongodb';
import { ITime, IDayTimetableRecord } from '../interfaces';

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
