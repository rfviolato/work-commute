import React from 'react';
import styled from '@emotion/styled';
import posed from 'react-pose';
import moment from 'moment';
import debounce from 'lodash.debounce';
import { IPeriodChartProps } from './interface';
import { Slider } from './../Slider';
import { TimetableChartData } from '../Period/interface';
import {
  getTotalMinutesFromTime,
  getBarHeight,
  formatMinutes,
  getArrayMaxValue,
} from './utils';

const DIMENSIONS = {
  CHART_HEIGHT: 375,
  BAR_GUTTER: 8,
  MIN_BAR_WIDTH: 25,
};

const BARS_PER_PAGE = 5;

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

const chartContainerRef = React.createRef<HTMLDivElement>();

export const PeriodBarChat: React.FC<IPeriodChartProps> = ({ data }) => {
  const BAR_WIDTH_INITIAL_VALUE = -1;
  const [chartDataMaxYValue, setChartDataMaxYValue] = React.useState<number>(0);
  const [isChartVisible, setIsChartVisible] = React.useState<boolean>(false);
  const [areFinishedAnimating, setAreBarsFinishedAnimating] = React.useState<
    boolean
  >(false);
  const [isMobileView, setIsMobileView] = React.useState<boolean>(false);
  const [barWidth, setBarWidth] = React.useState<number>(
    BAR_WIDTH_INITIAL_VALUE,
  );
  const onBarAnimationComplete = debounce(() => {
    setAreBarsFinishedAnimating(true);
  }, 100);

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

        <BarChartYValueLabel
          pose={areFinishedAnimating ? 'visible' : 'invisible'}
        >
          {totalTimeAtOffice.hours}h{formatMinutes(totalTimeAtOffice.minutes)}
        </BarChartYValueLabel>

        <BarChartXValue isMobile={isMobileView}>
          {moment(day).format('DD/MM')}
        </BarChartXValue>
      </BarContainer>
    );
  };

  React.useEffect(() => {
    if (chartContainerRef.current) {
      const { offsetWidth } = chartContainerRef.current;
      const barWidth = Math.round(
        offsetWidth / data.length - DIMENSIONS.BAR_GUTTER,
      );

      if (barWidth <= DIMENSIONS.MIN_BAR_WIDTH) {
        const barWidth = Math.round(
          offsetWidth / BARS_PER_PAGE - DIMENSIONS.BAR_GUTTER,
        );

        setBarWidth(barWidth);
        return setIsMobileView(true);
      }

      return setBarWidth(barWidth);
    }
  }, [chartContainerRef.current]);

  React.useEffect(() => {
    setChartDataMaxYValue(
      getArrayMaxValue(data, (day: any) =>
        getTotalMinutesFromTime(day.totalTimeAtOffice),
      ),
    );

    setTimeout(() => setIsChartVisible(true), 300);
  }, []);

  if (barWidth === BAR_WIDTH_INITIAL_VALUE) {
    return <div ref={chartContainerRef} />;
  }

  if (isMobileView) {
    const numberOfPages = Math.ceil(data.length / BARS_PER_PAGE);
    const slides = new Array(numberOfPages)
      .fill(numberOfPages)
      .map((current, i) => {
        const currentPage = i + 1;

        return (
          <BarsContainer isCarouselItem key={i}>
            {data
              .slice(
                currentPage * BARS_PER_PAGE - BARS_PER_PAGE,
                currentPage * BARS_PER_PAGE,
              )
              .map(renderChartBars)}
          </BarsContainer>
        );
      });

    return (
      <div>
        <ChartBarsSlider
          initialSlide={numberOfPages}
          infinite={false}
          arrows={false}
          dots={true}
        >
          {slides}
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
