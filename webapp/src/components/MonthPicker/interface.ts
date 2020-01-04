export interface IMonthPickerProps {
  maxYear: string;
  maxMonth: string;
  minYear: string;
  minMonth: string;
  value: {
    year: string;
    month: string;
  };
}

export interface ICalendarMonth {
  text: string;
  month: string;
  isAvailable: boolean;
  isCurrent: boolean;
}

export interface IMonthsPerYear {
  [key: string]: string[];
}
