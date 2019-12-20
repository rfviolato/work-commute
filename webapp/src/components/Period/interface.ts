export interface ITime {
  hours: number;
  minutes: number;
}

interface TimetableChartData {
  day: string;
  totalTimeAtOffice: ITime;
  totalMorningCommuteTime: ITime;
  totalEveningCommuteTime: ITime;
  totalMinutes: number;
}

export interface IPeriodQueryData {
  Period: {
    averageTimeAtOffice: ITime;
    averageTimeCommuting: ITime;
    timetableChart: TimetableChartData[];
  };
}
