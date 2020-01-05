export interface IMonthPickerValue {
  year: string;
  month: string;
}

export interface IMonthPickerProps {
  maxYear: string;
  maxMonth: string;
  minYear: string;
  minMonth: string;
  currentYear: string;
  currentMonth: string;
  onSwitch?: (value: IMonthPickerValue) => void;
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
