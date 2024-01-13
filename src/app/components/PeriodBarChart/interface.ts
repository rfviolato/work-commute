import {IPeriodResult, ITime, ITimetableChartResult} from '../../interfaces';

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};

declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
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

export type IChartData = ITimetableChartResult[];

export interface IPeriodChartComponentProps {
  data?: IChartData;
  periodId: string;
  isLoading?: boolean;
  hasError?: boolean;
}

export interface IStatusInfoProps
  extends Pick<IPeriodChartComponentProps, 'hasError' | 'isLoading'> {
  noData?: boolean;
}

export interface ICarouselChartProps {
  numberOfSlides: number;
  chartData: IChartData;
  renderChartBars(chartResult: ITimetableChartResult): JSX.Element;
}

export interface IChartBarProps {
  barWidth: number;
  hours: number;
  minutes: number;
  chartDataMaxYValue: number;
  isMobileView: boolean;
  day: string;
}
