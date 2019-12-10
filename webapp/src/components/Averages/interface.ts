interface ITime {
  hours: number;
  minutes: number;
}

export interface IAveragesQueryData {
  Period: {
    averageTimeAtOffice: ITime;
    averageTimeCommuting: ITime;
  };
}
