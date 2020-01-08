interface ITime {
  hours: number;
  minutes: number;
}

export interface ITodayQueryData {
  Day: {
    totalMorningCommuteTime: ITime;
    totalEveningCommuteTime: ITime;
    totalTimeAtOffice: ITime;
  } | null;
}
