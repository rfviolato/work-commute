export interface IWorkTimetable {
  _id: string;
  date: string;
  homeArriveTime: string;
  homeLeaveTime: string;
  workArriveTime: string;
  workLeaveTime: string;
  events: {
    [key: string]: string;
  }[];
}

export interface IPeriodResolverParams {
  periodStart: string;
  periodEnd: string;
}
