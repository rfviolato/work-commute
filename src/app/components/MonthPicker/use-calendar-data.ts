import { useEffect, useState } from 'react';
import moment from 'moment';
import { ICalendarMonthPerYear } from './interface';
import { MONTH_DATE_FORMAT } from '../../constants';

interface IUseCalendarDataParameters {
  isLoading: boolean;
  minYear: string;
  maxYear: string;
  maxMonth: string;
  minMonth?: string;
}

export function useCalendarData({
  isLoading,
  minYear,
  maxYear,
  minMonth,
  maxMonth,
}: IUseCalendarDataParameters) {
  const [availableYearList, setAvailableYearList] = useState<string[]>([]);
  const [calendarMonthLabels, setCalendarMonthLabels] = useState<
    ICalendarMonthPerYear
  >({});

  useEffect(() => {
    if (minMonth) {
      const startDate = moment(`${minYear}-${minMonth}`, MONTH_DATE_FORMAT);
      const endDate = moment(`${maxYear}-${maxMonth}`, MONTH_DATE_FORMAT).endOf(
        'month',
      );
      const minYearNumber = parseInt(minYear, 10);
      const maxYearNumber = parseInt(maxYear, 10);
      const yearCount = maxYearNumber - minYearNumber + 1;
      const yearsStartDate = moment(startDate).subtract(1, 'year');

      const years = Array(yearCount)
        .fill(yearCount)
        .reduce(
          (accum: {}) => ({
            ...accum,
            [yearsStartDate.add(1, 'year').format('YYYY')]: [],
          }),
          {},
        );

      const calendarMonthsStartDate = moment('12-01', 'MM-DD'); // starts at December because first iteration already adds 1 month
      const yearList = Object.keys(years);
      const calendarMonthsPerYear: ICalendarMonthPerYear = yearList.reduce(
        (accum: { [key: string]: any }, year: string) => {
          return {
            ...accum,
            [year]: Array(12)
              .fill(12)
              .map(() => {
                const referenceDate = calendarMonthsStartDate.add(1, 'month');
                const month = referenceDate.format('MM');
                const currentDate = moment(
                  `${year}-${month}`,
                  MONTH_DATE_FORMAT,
                );
                const isAvailable =
                  currentDate.isSameOrAfter(startDate) &&
                  currentDate.isSameOrBefore(endDate);

                return {
                  year,
                  month,
                  text: referenceDate.format('MMM').toUpperCase(),
                  isAvailable,
                };
              }),
          };
        },
        {},
      );

      setAvailableYearList(yearList);
      setCalendarMonthLabels(calendarMonthsPerYear);
    }
  }, [minYear, maxYear, minMonth, maxMonth, isLoading]);

  return {
    availableYearList,
    calendarMonthLabels,
  };
}
