export interface IPeriodQueryData {
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
