export interface ITime {
  hours: number;
  minutes: number;
}

export interface IDayTotalQuery {
  Day: {
    totalMorningCommuteTime: ITime;
    totalEveningCommuteTime: ITime;
    totalTimeAtOffice: ITime;
  };
}
