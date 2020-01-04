import React from 'react';
import styled from '@emotion/styled';
import { IMonthPickerProps, ICalendarMonth, IMonthsPerYear } from './interface';
import moment from 'moment';
import posed, { PoseGroup } from 'react-pose';

const DIMENSIONS = {
  RETRACTED_HEIGHT: 45,
  RETRACTED_WIDTH: 125,
  EXPANDED_HEIGHT: 250,
  EXPANDED_WIDTH: 250,
};

const POSE_NAMES = {
  BG_EXPAND: 'bg-expand',
  BG_RETRACT: 'bg-retract',
  RETRACTED_TRIGGER_SHOW: 'retracted-trigger-show',
  RETRACTED_TRIGGER_HIDE: 'retracted-trigger-hide',
};

const Root = styled.div`
  position: relative;
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
  padding: 15px;
  list-style: none;

  &:focus {
    outline: 0;
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
  transition: opacity 300ms ease;
  opacity: ${({ isAvailable }) => (isAvailable ? 1 : 0.4)};
  cursor: ${({ isAvailable }) => (isAvailable ? 'pointer' : 'not-allowed')};
  color: ${({ isCurrent }) => (isCurrent ? '#4edfa5' : 'currentColor')};

  &:hover {
    ${({ isAvailable }) =>
      isAvailable && {
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
`;

export const MonthPicker: React.FC<IMonthPickerProps> = ({
  minYear,
  maxYear,
  minMonth,
  maxMonth,
  value,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isExpanded, setIsExpanded] = React.useState(true);
  const startDate = moment(`${minYear}-${minMonth}`, 'YYYY-MM');
  const endDate = moment(`${maxYear}-${maxMonth}`, 'YYYY-MM');
  const monthDiff = endDate.diff(startDate, 'months') + 1;
  const yearDiff = Math.ceil(monthDiff / 12);
  const yearsStartDate = moment(startDate).subtract(1, 'year');
  const years = Array(yearDiff)
    .fill(yearDiff)
    .reduce(
      (accum: {}) => ({
        ...accum,
        [yearsStartDate.add(1, 'year').format('YYYY')]: [],
      }),
      {},
    );

  const monthsStartDate = moment(startDate).subtract(1, 'month');
  const monthsPerYear: IMonthsPerYear = Array(monthDiff)
    .fill(monthDiff)
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
  const calendarMonths: ICalendarMonth[] = Array(12)
    .fill(12)
    .map(() => {
      const date = calendarMonthsStartDate.add(1, 'month');
      const month = date.format('MM');

      return {
        month,
        text: date.format('MMM').toUpperCase(),
        isAvailable: monthsPerYear[value.year].includes(month),
        isCurrent: value.month === month,
      };
    });

  return (
    <Root>
      <ScaledBg
        pose={isExpanded ? POSE_NAMES.BG_EXPAND : POSE_NAMES.BG_RETRACT}
      ></ScaledBg>

      <PoseGroup flipMove={false}>
        {!isOpen && (
          <RetractedTriggerBtn
            key="retracted-trigger-btn"
            onClick={() => setIsOpen(true)}
            onPoseComplete={(pose: string) => setIsExpanded(pose === 'exit')}
          >
            {moment(value.month).format('MMMM')}
          </RetractedTriggerBtn>
        )}

        {isOpen && (
          <Picker
            key="picker"
            onClick={() => setIsOpen(false)}
            onPoseComplete={(pose: string) => setIsExpanded(pose !== 'exit')}
          >
            <PickerMonthContainer>
              {calendarMonths.map(
                ({ text, month, isAvailable, isCurrent }: ICalendarMonth) => (
                  <PickerMonth
                    isCurrent={isCurrent}
                    isAvailable={isAvailable}
                    key={month}
                  >
                    {text}
                  </PickerMonth>
                ),
              )}
            </PickerMonthContainer>
          </Picker>
        )}
      </PoseGroup>
    </Root>
  );
};
