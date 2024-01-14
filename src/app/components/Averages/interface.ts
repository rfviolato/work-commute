import { ITime, IPeriodResult } from "../../interfaces";

type PeriodQueryData = Pick<
  IPeriodResult,
  "averageTimeAtOffice" | "averageTimeCommuting"
>;

export interface IAveragesQueryData {
  Period: PeriodQueryData;
}

export interface IAveragesProps {
  periodStart: string;
  periodEnd: string;
}

export interface IAveragesComponentProps {
  averageTimeAtOffice?: ITime;
  averageTimeCommuting?: ITime;
  isLoading?: boolean;
  hasError?: boolean;
}
