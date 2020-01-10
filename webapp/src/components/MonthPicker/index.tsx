import React from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import posed, { PoseGroup } from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/pro-regular-svg-icons';
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
import { useQuery } from '@apollo/react-hooks';
import Skeleton from 'react-loading-skeleton';

const DIMENSIONS = {
  RETRACTED_HEIGHT: 45,
  RETRACTED_WIDTH: 175,
  EXPANDED_HEIGHT: 270,
  EXPANDED_WIDTH: 270,
};

const POSE_NAMES = {
  BG_EXPAND: 'bg-expand',
  BG_RETRACT: 'bg-retract',
  RETRACTED_TRIGGER_SHOW: 'retracted-trigger-show',
  RETRACTED_TRIGGER_HIDE: 'retracted-trigger-hide',
};

const Root = styled.div`
  position: relative;
  width: ${DIMENSIONS.RETRACTED_WIDTH}px;
  height: ${DIMENSIONS.RETRACTED_HEIGHT}px;
  color: #e0e0e0;
`;

const animatedScaleBgTransition = {
  default: { duration: 550, ease: [0.68, -0.25, 0.265, 1.15] },
};
const enterExitTransition = { default: { duration: 300 } };

const AnimatedRetractedTriggerBtn = posed.button({
  enter: {
    opacity: 1,
    transition: enterExitTransition,
    y: 0,
    delay: animatedScaleBgTransition.default.duration + 100,
  },
  exit: {
    opacity: 0,
    transition: enterExitTransition,
    y: -3,
  },
});
const RetractedTriggerBtn = styled(AnimatedRetractedTriggerBtn)`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  cursor: pointer;
  z-index: 2;
  border: 0;
  background-color: transparent;
  font-size: 1em;
  width: ${DIMENSIONS.RETRACTED_WIDTH}px;
  height: ${DIMENSIONS.RETRACTED_HEIGHT}px;
  border-radius: 4px;
  color: currentColor;

  &:focus {
    outline: 0;
  }
`;

const RetractedTriggerBtnText = styled.span`
  font-weight: 300;
  margin-right: 8px;
  white-space: nowrap;
`;

const AnimatedPicker = posed.div({
  enter: {
    opacity: 1,
    transition: enterExitTransition,
    y: 0,
    delay: animatedScaleBgTransition.default.duration + 100,
  },
  exit: { opacity: 0, transition: enterExitTransition, y: -3 },
});
const Picker = styled(AnimatedPicker)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  border: 0;
  background-color: transparent;
  font-size: 1em;
  width: ${DIMENSIONS.EXPANDED_WIDTH}px;
  height: ${DIMENSIONS.EXPANDED_HEIGHT}px;
  padding: 30px 15px 35px 15px;
  list-style: none;

  &:focus {
    outline: 0;
  }
`;

const ExpandedTriggerBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: 0;
  color: currentColor;
  font-size: 1em;
  cursor: pointer;
  transition: opacity 300ms ease;
  width: 30px;
  height: 30px;
  padding: 0;

  &:focus {
    outline: 0;
  }

  &:focus,
  &:hover {
    opacity: 0.7;
  }
`;

const PickerMonthContainer = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  margin: 0;
  padding: 0;
`;

interface IPickerMonth {
  isAvailable: boolean;
  isCurrent: boolean;
}
const PickerMonth = styled.li<IPickerMonth>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: opacity 300ms ease, color 300ms ease;
  opacity: ${({ isAvailable }) => (isAvailable ? 1 : 0.4)};
  cursor: ${({ isAvailable, isCurrent }) => {
    if (!isAvailable) {
      return 'not-allowed';
    }

    if (isCurrent) {
      return 'default';
    }

    return 'pointer';
  }};
  color: ${({ isCurrent }) => (isCurrent ? '#4edfa5' : 'currentColor')};

  &:hover {
    ${({ isAvailable, isCurrent }) =>
      isAvailable &&
      !isCurrent && {
        opacity: 0.7,
      }}
  }
`;

const AnimatedScaledBg = posed.div({
  [POSE_NAMES.BG_EXPAND]: {
    width: DIMENSIONS.EXPANDED_WIDTH,
    height: DIMENSIONS.EXPANDED_HEIGHT,
    transition: animatedScaleBgTransition,
  },
  [POSE_NAMES.BG_RETRACT]: {
    width: DIMENSIONS.RETRACTED_WIDTH,
    height: DIMENSIONS.RETRACTED_HEIGHT,
    transition: animatedScaleBgTransition,
  },
});

const ScaledBg = styled(AnimatedScaledBg)`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  width: ${DIMENSIONS.RETRACTED_WIDTH}px;
  height: ${DIMENSIONS.RETRACTED_HEIGHT}px;
  border-radius: 4px;
  background-color: #626262;
  transform-origin: top right;
  border: 1px solid #f1f1f1;
`;

const PickerYearContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const today = moment();

export const MonthPicker: React.FC<IMonthPickerProps> = (props) => {
  const { loading, data } = useQuery<IMonthPickerQuery>(query);

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

  return <MonthPickerComponent {...props} isLoading={loading} />;
};

export const MonthPickerComponent: React.FC<IMonthPickerComponentProps> = ({
  minYear = today.format('YYYY'),
  maxYear = today.format('MM'),
  minMonth,
  maxMonth,
  currentYear,
  currentMonth,
  isLoading,
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
    const startDate = moment(`${minYear}-${minMonth}`, 'YYYY-MM');
    const endDate = moment(`${maxYear}-${maxMonth}`, 'YYYY-MM');
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

    const calendarMonthsStartDate = moment('12-01', 'MM-DD');
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
                  'YYYY-MM',
                ).format('MMMM YYYY')
              )}
            </RetractedTriggerBtnText>

            <FontAwesomeIcon icon={faCalendarAlt} />
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

            {calendarMonthLabels[browsingYear] && (
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
            )}
          </Picker>
        )}
      </PoseGroup>
    </Root>
  );
};
