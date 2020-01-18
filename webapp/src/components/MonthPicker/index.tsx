import React from 'react';
import moment from 'moment';
import { PoseGroup } from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/pro-regular-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import Skeleton from 'react-loading-skeleton';
import {
  IMonthPickerProps,
  ICalendarMonth,
  IMonthsPerYear,
  IMonthPickerValue,
  ICalendarMonthPerYear,
  IMonthPickerComponentProps,
  IMonthPickerQuery,
} from './interface';
import { ListItemPicker } from '../ListItemPicker';
import query from './query';
import {
  Root,
  ScaledBg,
  RetractedTriggerBtn,
  RetractedTriggerBtnText,
  ErrorDisplay,
  Picker,
  ExpandedTriggerBtn,
  PickerYearContainer,
  PickerMonthContainer,
  PickerMonth,
  POSE_NAMES,
} from './styled';
import { MONTH_DATE_FORMAT } from '../../constants';

const today = moment();

export const MonthPicker: React.FC<IMonthPickerProps> = (props) => {
  const { loading, data, error } = useQuery<IMonthPickerQuery>(query);

  if (data && data.FirstRecord) {
    const {
      FirstRecord: { day },
    } = data;

    const firstRecordDayDate = moment(day);

    return (
      <MonthPickerComponent
        {...props}
        minYear={firstRecordDayDate.format('YYYY')}
        minMonth={firstRecordDayDate.format('MM')}
      />
    );
  }

  return (
    <MonthPickerComponent {...props} hasError={!!error} isLoading={loading} />
  );
};

export const MonthPickerComponent: React.FC<IMonthPickerComponentProps> = ({
  minYear = today.format('YYYY'),
  maxYear = today.format('MM'),
  minMonth,
  maxMonth,
  currentYear,
  currentMonth,
  isLoading,
  hasError,
  onSwitch = () => {},
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const [browsingYear, setBrowsingYear] = React.useState<string>(currentYear);
  const [currentValue, setCurrentValue] = React.useState<IMonthPickerValue>({
    year: currentYear,
    month: currentMonth,
  });

  const [availableYearList, setAvailableYearList] = React.useState<string[]>(
    [],
  );

  const [calendarMonthLabels, setCalendarMonthLabels] = React.useState<
    ICalendarMonthPerYear
  >({});

  const onYearChange = React.useCallback(
    (year: string) => setBrowsingYear(year),
    [],
  );

  const onComponentLeave = React.useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  React.useEffect(
    () => setCurrentValue({ month: currentMonth, year: currentYear }),
    [currentMonth, currentYear],
  );

  React.useEffect(() => {
    if (!isLoading) {
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

      const calendarMonthsStartDate = moment('12-01', 'MM-DD'); // starts at December because first iteration already add 1 month
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

      const availableYearIndex = yearList.indexOf(browsingYear);
      const isYearAvailable = availableYearIndex >= 0;

      if (!isYearAvailable) {
        const latestAvailableYearIndex = yearList.length - 1;

        setBrowsingYear(yearList[latestAvailableYearIndex]);
      }
    }
  }, [minYear, maxYear, minMonth, maxMonth, isLoading]);

  return (
    <Root onMouseLeave={onComponentLeave}>
      <ScaledBg
        pose={isExpanded ? POSE_NAMES.BG_EXPAND : POSE_NAMES.BG_RETRACT}
      ></ScaledBg>

      <PoseGroup flipMove={false}>
        {!isOpen && (
          <RetractedTriggerBtn
            key="retracted-trigger-btn"
            onClick={() => !isLoading && setIsOpen(true)}
            onPoseComplete={(pose: string) => setIsExpanded(pose === 'exit')}
          >
            <RetractedTriggerBtnText>
              {isLoading ? (
                <Skeleton width={100} />
              ) : (
                moment(
                  `${currentValue.year}-${currentValue.month}`,
                  MONTH_DATE_FORMAT,
                ).format('MMMM YYYY')
              )}
            </RetractedTriggerBtnText>

            {hasError ? (
              <ErrorDisplay />
            ) : (
              <FontAwesomeIcon icon={faCalendarAlt} />
            )}
          </RetractedTriggerBtn>
        )}

        {isOpen && (
          <Picker
            key="picker"
            onPoseComplete={(pose: string) => setIsExpanded(pose !== 'exit')}
          >
            <ExpandedTriggerBtn onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </ExpandedTriggerBtn>

            <PickerYearContainer>
              <ListItemPicker
                list={availableYearList}
                index={availableYearList.indexOf(browsingYear)}
                onChange={onYearChange}
              />
            </PickerYearContainer>

            <PickerMonthContainer>
              {calendarMonthLabels[browsingYear].map(
                ({ text, month, isAvailable }: ICalendarMonth) => {
                  const isCurrent =
                    currentValue.month === month &&
                    currentValue.year === browsingYear;

                  const onClick = () => {
                    if (isAvailable) {
                      const newValue = { year: browsingYear, month };

                      setIsOpen(false);
                      setCurrentValue(newValue);
                      onSwitch(newValue);
                    }
                  };

                  return (
                    <PickerMonth
                      isCurrent={isCurrent}
                      isAvailable={isAvailable}
                      onClick={onClick}
                      key={month}
                    >
                      {text}
                    </PickerMonth>
                  );
                },
              )}
            </PickerMonthContainer>
          </Picker>
        )}
      </PoseGroup>
    </Root>
  );
};
