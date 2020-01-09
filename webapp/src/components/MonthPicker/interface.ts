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
  minYear: string;
  minMonth: string;
  isLoading?: boolean;
}

export interface IMonthPickerQuery {
  FirstRecord: {
    day: string;
  };
}

export interface ICalendarMonth {
  text: string;
  month: string;
  isAvailable: boolean;
}

export interface ICalendarMonthPerYear {
  [key: string]: ICalendarMonth[];
}

export interface IMonthsPerYear {
  [key: string]: string[];
}
