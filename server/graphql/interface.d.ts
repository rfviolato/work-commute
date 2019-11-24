export interface IWorkTimetable {
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
