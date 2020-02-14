import styled from '@emotion/styled';
import posed from 'react-pose';
import { COLORS } from '../../global-styles';

export const DIMENSIONS = {
  CHART_HEIGHT: 375,
  BAR_GUTTER: 8,
  MIN_BAR_WIDTH: 25,
};

export const Root = styled.div`
  position: relative;
`;

export const StatusInformationContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 40px;
`;

export const ChartBarsSlider = styled.div`
  height: ${DIMENSIONS.CHART_HEIGHT}px;
`;

export const BarChartYValueLabel = styled.div`
  position: absolute;
  width: 100%;
  top: 7px;
  left: 0;
  font-size: 1em;
  text-align: center;
  transform-origin: center center;
  will-change: transform;
  opacity: 0;
`;

interface IBarChartXValueProps {
  isMobile?: boolean;
}

export const BarChartXValue = styled.div<IBarChartXValueProps>`
  position: absolute;
  width: 100%;
  bottom: ${({ isMobile }) => (isMobile ? '5px' : '-26px')};
  left: 0;
  font-size: 1.2em;
  text-align: center;
  transform-origin: center center;
  will-change: transform;
  opacity: 0;
`;

interface IBarsContainerProps {
  isCarouselItem?: boolean;
  isCentered?: boolean;
}

export const BarsContainer = styled.div<IBarsContainerProps>`
  display: ${({ isCarouselItem }) =>
    isCarouselItem ? 'inline-flex !important' : 'flex'};
  align-items: flex-end;
  justify-content: ${({ isCentered }) =>
    isCentered ? 'flex-start' : 'center'};
  padding: 0 ${DIMENSIONS.BAR_GUTTER / 2}px;
  height: ${DIMENSIONS.CHART_HEIGHT}px;
  outline: 0;
`;

function getBarContainerFontSize(barWidth: number) {
  if (barWidth >= 50) {
    return '12px';
  }

  if (barWidth >= 40) {
    return '11px';
  }

  if (barWidth >= 30) {
    return '10px';
  }

  return '9px';
}

interface IBarContainerProps {
  barWidth: number;
}

export const BarContainer = styled.div<IBarContainerProps>`
  position: relative;
  flex: 1;
  font-size: ${({ barWidth }) => getBarContainerFontSize(barWidth)};
  width: ${({ barWidth }) => barWidth}px;
  max-width: 100px;

  &:not(:first-of-type) {
    margin-left: ${DIMENSIONS.BAR_GUTTER}px;
  }
`;

interface IBarRectangleContainerProps {
  barHeight: number;
}

export const BarRectangleContainer = styled.div<IBarRectangleContainerProps>`
  height: ${({ barHeight }) => barHeight}px;
  overflow: hidden;
`;

export const BarRectangle = styled.div`
  height: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: ${COLORS.CHART_BAR};
  transform-origin: bottom left;
  will-change: transform;
  transform: translateY(100%);
`;

export const BarChartAxis = styled.div`
  height: 4px;
  width: 100%;
  background-color: ${COLORS.GRAY};
  border-radius: 8px;
`;

export const NoWorkDayDisplayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoWorkDayDisplay = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  font-size: 13px;
  border: 1px solid currentColor;
  border-radius: 50%;
  margin-bottom: 25px;
  opacity: 0.8;

  &::before {
    content: '';
    position: absolute;
    bottom: -20px;
    width: 1px;
    height: 15px;
    background-color: #fff;
  }
`;
