import styled from '@emotion/styled';
import posed from 'react-pose';
import { QueryErrorIcon } from '../QueryErrorIcon';
import { COLORS } from '../../global-styles';

export const DIMENSIONS = {
  RETRACTED_HEIGHT: 45,
  RETRACTED_WIDTH: 175,
  EXPANDED_HEIGHT: 270,
  EXPANDED_WIDTH: 270,
};

export const POSE_NAMES = {
  BG_EXPAND: 'bg-expand',
  BG_RETRACT: 'bg-retract',
};

export const Root = styled.div`
  position: relative;
  width: ${DIMENSIONS.RETRACTED_WIDTH}px;
  height: ${DIMENSIONS.RETRACTED_HEIGHT}px;
  color: #e0e0e0;

  &:hover .scaled-bg {
    background-color: ${COLORS.DARK_GRAY};
  }
`;

export const animatedScaleBgTransition = {
  default: { duration: 550, ease: [0.68, -0.25, 0.265, 1.15] },
};
export const enterExitTransition = { default: { duration: 300 } };

export const AnimatedRetractedTriggerBtn = posed.button({
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
export const RetractedTriggerBtn = styled(AnimatedRetractedTriggerBtn)`
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

export const RetractedTriggerBtnText = styled.span`
  font-weight: 300;
  margin-right: 8px;
  white-space: nowrap;
`;

export const AnimatedPicker = posed.div({
  enter: {
    opacity: 1,
    transition: enterExitTransition,
    y: 0,
    delay: animatedScaleBgTransition.default.duration + 100,
  },
  exit: { opacity: 0, transition: enterExitTransition, y: -3 },
});
export const Picker = styled(AnimatedPicker)`
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

  &:focus {
    outline: 0;
  }
`;

export const ExpandedTriggerBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
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

export const PickerMonthContainer = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
`;

interface IPickerMonth {
  isAvailable: boolean;
  isCurrent: boolean;
}
export const PickerMonth = styled.li<IPickerMonth>`
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
  color: ${({ isCurrent }) => (isCurrent ? COLORS.CHART_BAR : 'currentColor')};

  &:hover {
    ${({ isAvailable, isCurrent }) =>
    isAvailable &&
    !isCurrent && {
      opacity: 0.7,
    }}
  }
`;

export const AnimatedScaledBg = posed.div({
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

export const ScaledBg = styled(AnimatedScaledBg)`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  width: ${DIMENSIONS.RETRACTED_WIDTH}px;
  height: ${DIMENSIONS.RETRACTED_HEIGHT}px;
  border-radius: 4px;
  background-color: ${COLORS.LIGHT_BLACK};
  transform-origin: top right;
  border: 1px solid ${COLORS.GRAY};
  transition: background-color 300ms ease;
`;

export const PickerYearContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ErrorDisplay = styled(QueryErrorIcon)``;
