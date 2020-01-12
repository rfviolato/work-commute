import { TimetableChartData } from '../Period/interface';

export interface ITime {
  hours: number;
  minutes: number;
}

export interface IPeriodChartProps {
  periodStart: string;
  periodEnd: string;
}

export interface IPeriodChartComponentProps {
  data?: TimetableChartData[];
  periodStart: string;
  periodEnd: string;
  isLoading?: boolean;
  hasError?: boolean;
}

export interface IPeriodQueryData {
  Period: {
    timetableChart: TimetableChartData[];
  };
}

export interface IStatusInfoProps
  extends Pick<IPeriodChartComponentProps, 'hasError'> {
  noData?: boolean;
}
