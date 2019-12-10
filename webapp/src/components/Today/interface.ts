interface ITime {
  hours: number;
  minutes: number;
}

export interface ITodayQueryData {
  homeArriveTime: string;
  homeLeaveTime: string;
  workArriveTime: string;
  workLeaveTime: string;
  totalMorningCommuteTime: ITime;
  totalEveningCommuteTime: ITime;
  totalTimeAtOffice: ITime;
}
