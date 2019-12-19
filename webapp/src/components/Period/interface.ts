interface ITime {
  hours: number;
  minutes: number;
}

export interface IPeriodQueryData {
  Period: {
    averageTimeAtOffice: ITime;
    averageTimeCommuting: ITime;
  };
}
