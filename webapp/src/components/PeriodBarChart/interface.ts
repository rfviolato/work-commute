import { IPeriodResult, ITimetableChartResult } from '../../interfaces';

export interface IPeriodChartProps {
  periodStart: string;
  periodEnd: string;
}

type PeriodQueryData = Pick<IPeriodResult, 'timetableChart'>;

export interface IPeriodQueryData {
  Period: PeriodQueryData;
}

export interface IPeriodChartComponentProps {
  data?: ITimetableChartResult[];
  periodStart: string;
  periodEnd: string;
  isLoading?: boolean;
  hasError?: boolean;
}

export interface IStatusInfoProps
  extends Pick<IPeriodChartComponentProps, 'hasError'> {
  noData?: boolean;
}
