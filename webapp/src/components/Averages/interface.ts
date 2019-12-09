export interface IAveragesQueryData {
  Period: {
    averageTimeAtOffice: {
      hours: number;
      minutes: number;
    };

    averageTimeCommuting: {
      hours: number;
      minutes: number;
    };
  };
}
