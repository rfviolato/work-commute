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
  IMonthPickerValue,
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
import { useCalendarData } from './use-calendar-data';

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
  isLoading = false,
  hasError = false,
  minMonth,
  maxMonth,
  currentYear,
  currentMonth,
  onSwitch = () => { },
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const [browsingYear, setBrowsingYear] = React.useState<string>(currentYear);
  const [currentValue, setCurrentValue] = React.useState<IMonthPickerValue>({
    year: currentYear,
    month: currentMonth,
  });
  const { availableYearList, calendarMonthLabels } = useCalendarData({
    isLoading,
    minYear,
    maxYear,
    minMonth,
    maxMonth,
  });

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
    if (availableYearList.length) {
      const availableYearIndex = availableYearList.indexOf(currentYear);
      const isYearUnavailable = availableYearIndex < 0;

      if (isYearUnavailable) {
        const latestAvailableYearIndex = availableYearList.length - 1;

        setBrowsingYear(availableYearList[latestAvailableYearIndex]);
      }
    }
  }, [availableYearList, currentYear]);

  return (
    <Root onMouseLeave={onComponentLeave}>
      <ScaledBg
        /* TODO: remove this "className" once babel-plugin-emotion can be installed
         * and child emotion components can be referenced
        */
        className="scaled-bg"
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
                ({ text, month, year, isAvailable }: ICalendarMonth) => {
                  const isCurrent =
                    currentValue.month === month && currentValue.year === year;

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
