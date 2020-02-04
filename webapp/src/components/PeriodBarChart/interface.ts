import { IPeriodResult, ITimetableChartResult } from '../../interfaces';

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};

declare global {
  interface Window {
    requestIdleCallback: ((
      callback: ((deadline: RequestIdleCallbackDeadline) => void),
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle);
    cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
  }
}

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
  extends Pick<IPeriodChartComponentProps, 'hasError' | 'isLoading'> {
  noData?: boolean;
}
