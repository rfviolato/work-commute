import React from 'react';
import styled from '@emotion/styled';
import posed from 'react-pose';
import moment from 'moment';
import debounce from 'lodash.debounce';
import { IPeriodChartProps } from './interface';
import { Slider } from './../Slider';
import { ITime, TimetableChartData } from '../Period/interface';

const DIMENSIONS = {
  CHART_HEIGHT: 375,
  BAR_GUTTER: 8,
};

const ChartBarsSlider = styled(Slider)`
  height: ${DIMENSIONS.CHART_HEIGHT}px;
`;

const AnimatedBarLabel = posed.div({
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      default: { duration: 400, ease: [0.215, 0.61, 0.355, 1] },
    },
  },
  invisible: { opacity: 0, y: 3 },
});

const BarChartYValueLabel = styled(AnimatedBarLabel)`
  position: absolute;
  width: 100%;
  top: 7px;
  left: 0;
  font-size: 1em;
  text-align: center;
`;

interface IBarChartXValueProps {
  isMobile?: boolean;
}

const BarChartXValue = styled.div<IBarChartXValueProps>`
  position: absolute;
  width: 100%;
  bottom: ${({ isMobile }) => (isMobile ? '5px' : '-26px')};
  left: 0;
  font-size: 1.2em;
  text-align: center;
`;

interface IBarsContainerProps {
  isCarouselItem?: boolean;
}

const BarsContainer = styled.div<IBarsContainerProps>`
  display: ${({ isCarouselItem }) =>
    isCarouselItem ? 'inline-flex !important' : 'flex'};
  justify-content: space-between;
  align-items: flex-end;
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

const BarContainer = styled.div<IBarContainerProps>`
  position: relative;
  flex: 1;
  font-size: ${({ barWidth }) => getBarContainerFontSize(barWidth)};

  &:not(:first-of-type) {
    margin-left: ${DIMENSIONS.BAR_GUTTER}px;
  }
`;

const BarRectangleContainer = styled.div`
  overflow: hidden;
`;

const AnimatedBar = posed.div({
  visible: {
    y: 0,
    transition: ({ index }: { index: number }) => ({
      y: {
        duration: 1000,
        ease: [0.645, 0.045, 0.355, 1],
        delay: index * 30,
      },
    }),
  },
  invisible: { y: '100%' },
});

const BarRectangle = styled(AnimatedBar)`
  height: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #4edfa5;
  transform-origin: bottom left;
`;

const BarChartAxis = styled.div`
  height: 4px;
  width: 100%;
  background-color: #f1f1f1;
  border-radius: 8px;
`;

function getArrayMaxValue(array: any[], acessor: Function): number {
  return array.reduce((accum: number, currentItem: any) => {
    const value = acessor(currentItem);

    if (value > accum) {
      return value;
    }

    return accum;
  }, 0);
}

function getTotalMinutesFromTime(time: ITime): number {
  return time.hours * 60 + time.minutes;
}

function getBarHeight(
  maxHeight: number,
  maxValue: number,
  value: number,
): number {
  return (value * maxHeight) / maxValue;
}

function formatMinutes(num: number): string {
  if (num < 10) {
    return `0${num}`;
  }

  return num.toString();
}

const chartContainerRef = React.createRef<HTMLDivElement>();

export const PeriodBarChat: React.FC<IPeriodChartProps> = ({ data }) => {
  const [chartDataMaxYValue, setChartDataMaxYValue] = React.useState<number>(0);
  const [isChartVisible, setIsChartVisible] = React.useState<boolean>(false);
  const [areBarsVisible, setAreBarsVisible] = React.useState<boolean>(false);
  const [isMobileView, setIsMobileView] = React.useState<boolean>(false);
  const [barWidth, setBarWidth] = React.useState<number>(0);
  const onBarAnimationComplete = debounce(() => {
    setAreBarsVisible(true);
  }, 100);

  React.useEffect(() => {
    if (data) {
      setChartDataMaxYValue(
        getArrayMaxValue(data, (day: any) =>
          getTotalMinutesFromTime(day.totalTimeAtOffice),
        ),
      );

      setTimeout(() => setIsChartVisible(true), 300);
    }
  }, [data]);

  React.useEffect(() => {
    if (chartContainerRef.current) {
      const { offsetWidth } = chartContainerRef.current;
      const barWidth = Math.round(
        offsetWidth / data.length - DIMENSIONS.BAR_GUTTER,
      );

      if (barWidth <= 25) {
        const barWidth = Math.round(offsetWidth / 5 - DIMENSIONS.BAR_GUTTER);

        setBarWidth(barWidth);
        setIsMobileView(true);

        return;
      }

      setBarWidth(barWidth);
    }
  }, []);

  const renderChartBars = (
    { totalTimeAtOffice, day }: TimetableChartData,
    i: number,
  ) => {
    const totalMinutes = getTotalMinutesFromTime(totalTimeAtOffice);
    const height = getBarHeight(
      DIMENSIONS.CHART_HEIGHT,
      chartDataMaxYValue,
      totalMinutes,
    );

    return (
      <BarContainer barWidth={barWidth} key={day}>
        <BarRectangleContainer
          style={{
            height: `${height}px`,
          }}
        >
          <BarRectangle
            index={i}
            pose={isChartVisible ? 'visible' : 'invisible'}
            onPoseComplete={onBarAnimationComplete}
          />
        </BarRectangleContainer>

        <BarChartYValueLabel pose={areBarsVisible ? 'visible' : 'invisible'}>
          {totalTimeAtOffice.hours}h{formatMinutes(totalTimeAtOffice.minutes)}
        </BarChartYValueLabel>

        <BarChartXValue isMobile={isMobileView}>
          {moment(day).format('DD/MM')}
        </BarChartXValue>
      </BarContainer>
    );
  };

  if (isMobileView) {
    return (
      <div>
        <ChartBarsSlider arrows={false}>
          <BarsContainer isCarouselItem>
            {data.slice(0, 5).map(renderChartBars)}
          </BarsContainer>
          <BarsContainer isCarouselItem>
            {data.slice(5, 10).map(renderChartBars)}
          </BarsContainer>
          <BarsContainer isCarouselItem>
            {data.slice(10, 15).map(renderChartBars)}
          </BarsContainer>
          <BarsContainer isCarouselItem>
            {data.slice(15, 20).map(renderChartBars)}
          </BarsContainer>
        </ChartBarsSlider>

        <BarChartAxis />
      </div>
    );
  }

  return (
    <div ref={chartContainerRef}>
      <BarsContainer>{data.map(renderChartBars)}</BarsContainer>

      <BarChartAxis />
    </div>
  );
};
