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
const SLIDER_FIRST_TRANSFORM_TIMING = 700;

interface IChartBarsSliderProps {
  isChartDoneAnimating?: boolean;
}
const ChartBarsSlider = styled.div<IChartBarsSliderProps>`
  height: ${DIMENSIONS.CHART_HEIGHT}px;

  .slick-track {
    ${({ isChartDoneAnimating }: IChartBarsSliderProps) => {
      return isChartDoneAnimating
        ? {}
        : {
            transition: `transform ${SLIDER_FIRST_TRANSFORM_TIMING}ms cubic-bezier(0.645, 0.045, 0.355, 1) !important`,
          };
    }}
  }
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
  max-width: ${({ barWidth }) => barWidth}px;

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
const sliderRef = React.createRef<any>();
const BARS_PER_PAGE = 5;
const BAR_WIDTH_INITIAL_VALUE = -1;

export const PeriodBarChat: React.FC<IPeriodChartProps> = ({ data }) => {
  const numberOfSlides = Math.ceil(data.length / BARS_PER_PAGE);
  const [chartDataMaxYValue, setChartDataMaxYValue] = React.useState<number>(0);
  const [isChartVisible, setIsChartVisible] = React.useState<boolean>(false);
  const [areBarsDoneAnimating, setAreBarsDoneAnimating] = React.useState<
    boolean
  >(false);
  const [isYValueDoneAnimating, setIsYValueDoneAnimating] = React.useState<
    boolean
  >(false);
  const [isChartDoneAnimating, setIsChartDoneAnimating] = React.useState<
    boolean
  >(false);
  const [isMobileView, setIsMobileView] = React.useState<boolean>(false);
  const [barWidth, setBarWidth] = React.useState<number>(
    BAR_WIDTH_INITIAL_VALUE,
  );
  const [windowWidth, setWindowWidth] = React.useState<number>(
    window.innerWidth,
  );
  const onBarAnimationComplete = debounce(() => {
    setAreBarsDoneAnimating(true);
  }, 100);
  const onYAxisValueAnimationComplete = debounce(() => {
    setIsYValueDoneAnimating(true);

    setTimeout(
      () => setIsChartDoneAnimating(true),
      isMobileView ? SLIDER_FIRST_TRANSFORM_TIMING : 0,
    );
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
          pose={areBarsDoneAnimating ? 'visible' : 'invisible'}
          onPoseComplete={onYAxisValueAnimationComplete}
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

      setBarWidth(barWidth);
      return setIsMobileView(false);
    }
  }, [windowWidth]);

  React.useEffect(() => {
    /**
     * Unfortunately when resizing and changing the component on the fly
     * Slick's `initialSlide` prop won't work.
     */
    if (isYValueDoneAnimating && isMobileView && sliderRef.current) {
      sliderRef.current.slickGoTo(numberOfSlides);
    }
  }, [isMobileView, isYValueDoneAnimating]);

  React.useEffect(() => {
    const onResize = debounce(() => setWindowWidth(window.innerWidth), 100);

    setChartDataMaxYValue(
      getArrayMaxValue(data, (day: any) =>
        getTotalMinutesFromTime(day.totalTimeAtOffice),
      ),
    );
    window.addEventListener('resize', onResize);
    setTimeout(() => setIsChartVisible(true), 300);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (barWidth === BAR_WIDTH_INITIAL_VALUE) {
    return (
      <div ref={chartContainerRef}>
        <BarsContainer />
      </div>
    );
  }

  if (isMobileView) {
    const slides = new Array(numberOfSlides)
      .fill(numberOfSlides)
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
      <div ref={chartContainerRef}>
        <ChartBarsSlider isChartDoneAnimating={isChartDoneAnimating}>
          <Slider infinite={false} arrows={false} dots ref={sliderRef}>
            {slides}
          </Slider>
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
