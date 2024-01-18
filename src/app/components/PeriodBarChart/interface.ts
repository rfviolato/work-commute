import { IPeriodResult, ITimetableChartResult } from "../../types";

export interface IPeriodChartProps {
  periodStart: string;
  periodEnd: string;
}

type PeriodQueryData = Pick<IPeriodResult, "timetableChart">;

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
  extends Pick<IPeriodChartComponentProps, "hasError" | "isLoading"> {
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
