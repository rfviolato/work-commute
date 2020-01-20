import { useEffect, useState } from 'react';
import moment from 'moment';
import { ICalendarMonthPerYear, IMonthsPerYear } from './interface';
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
      const endDate = moment(`${maxYear}-${maxMonth}`, MONTH_DATE_FORMAT);
      const monthCount = endDate.diff(startDate, 'months') + 1;
      const yearCount = parseInt(maxYear, 10) - parseInt(minYear, 10) + 1;
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
      const yearList = Object.keys(years);

      const monthsStartDate = moment(startDate).subtract(1, 'month');
      const monthsPerYear: IMonthsPerYear = Array(monthCount)
        .fill(monthCount)
        .map(() => {
          const date = monthsStartDate.add(1, 'month');

          return {
            year: date.format('YYYY'),
            month: date.format('MM'),
          };
        })
        .reduce(
          (
            accum: { [key: string]: string[] },
            { year, month }: { year: string; month: string },
          ) => {
            return {
              ...accum,
              [year]: [...accum[year], month],
            };
          },
          years,
        );

      const calendarMonthsStartDate = moment('12-01', 'MM-DD'); // starts at December because first iteration already adds 1 month
      const calendarMonthsPerYear: ICalendarMonthPerYear = yearList.reduce(
        (accum: { [key: string]: any }, year: string) => {
          return {
            ...accum,
            [year]: Array(12)
              .fill(12)
              .map(() => {
                const date = calendarMonthsStartDate.add(1, 'month');
                const month = date.format('MM');
                const isAvailable = monthsPerYear[year].includes(month);

                return {
                  month,
                  text: date.format('MMM').toUpperCase(),
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
