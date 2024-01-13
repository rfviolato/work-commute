import { IFirstRecordResult } from '../../interfaces';

export interface IMonthPickerValue {
  year: string;
  month: string;
}

export interface IMonthPickerProps {
  maxYear: string;
  maxMonth: string;
  currentYear: string;
  currentMonth: string;
  onSwitch?: (value: IMonthPickerValue) => void;
}

export interface IMonthPickerComponentProps extends IMonthPickerProps {
  minYear?: string;
  minMonth?: string;
  isLoading?: boolean;
  hasError?: boolean;
}

type FirstRecordData = Pick<IFirstRecordResult, 'day'>;

export interface IMonthPickerQuery {
  FirstRecord: FirstRecordData;
}

export interface ICalendarMonth {
  text: string;
  month: string;
  year: string;
  isAvailable: boolean;
}

export interface ICalendarMonthPerYear {
  [key: string]: ICalendarMonth[];
}

export interface IMonthsWithDataPerYear {
  [key: string]: string[];
}
