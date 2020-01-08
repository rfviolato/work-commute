export interface ITime {
  hours: number;
  minutes: number;
}

export interface IAveragesQueryData {
  Period: {
    averageTimeAtOffice: ITime;
    averageTimeCommuting: ITime;
  };
}

export interface IAveragesProps {
  periodStart: string;
  periodEnd: string;
}

export interface IAveragesComponentProps {
  averageTimeAtOffice: ITime;
  averageTimeCommuting: ITime;
}
