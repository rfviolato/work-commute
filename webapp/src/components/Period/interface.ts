export interface ITime {
  hours: number;
  minutes: number;
}

export interface TimetableChartData {
  day: string;
  totalTimeAtOffice: ITime;
  totalMorningCommuteTime: ITime;
  totalEveningCommuteTime: ITime;
  totalMinutes: number;
}
