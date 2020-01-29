import React from 'react';
import moment from 'moment';
import debounce from 'lodash.debounce';
import {
  IPeriodChartProps,
  IPeriodChartComponentProps,
  IPeriodQueryData,
} from './interface';
import { useQuery } from '@apollo/react-hooks';
import anime from 'animejs';
import { Slider } from './../Slider';
import {
  getTotalMinutesFromTime,
  getBarHeight,
  formatMinutes,
  getArrayMaxValue,
} from './utils';
import query from './query';
import { LoadingSpinner } from '../LoadingSpinner';
import { StatusInformation } from './status-information';
import { ITimetableChartResult } from '../../interfaces';
import {
  BarChartXValue,
  SLIDER_FIRST_TRANSFORM_TIMING,
  BarContainer,
  BarRectangleContainer,
  BarRectangle,
  BarChartYValueLabel,
  BarsContainer,
  StatusInformationContainer,
  BarChartAxis,
  ChartBarsSlider,
  DIMENSIONS,
  Root,
  LoadingSpinnerContainer,
} from './styled';

const chartContainerRef = React.createRef<HTMLDivElement>();
const sliderRef = React.createRef<any>();
const BARS_PER_PAGE = 5;
const BAR_WIDTH_INITIAL_VALUE = -1;

export const PeriodBarChart: React.FC<IPeriodChartProps> = ({
  periodStart,
  periodEnd,
}) => {
  // const { loading, data, error } = useQuery<IPeriodQueryData>(query, {
  //   variables: {
  //     periodStart,
  //     periodEnd,
  //   },
  // });

  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setData(require('./__mock__/data').data);
    }, 1750);
  }, []);

  return (
    <PeriodBarChartComponent
      isLoading={isLoading}
      data={data}
      periodStart={periodStart}
      periodEnd={periodEnd}
    />
  );

  // if (!loading && data && data.Period) {
  //   const {
  //     Period: { timetableChart },
  //   } = data;

  //   return (
  //     <PeriodBarChartComponent
  //       data={timetableChart}
  //       periodStart={periodStart}
  //       periodEnd={periodEnd}
  //     />
  //   );
  // }

  // return (
  //   <PeriodBarChartComponent
  //     isLoading={loading}
  //     hasError={!!error}
  //     periodStart={periodStart}
  //     periodEnd={periodEnd}
  //   />
  // );
};

export const PeriodBarChartComponent: React.FC<IPeriodChartComponentProps> = ({
  data = [],
  periodStart,
  periodEnd,
  isLoading,
  hasError,
}) => {
  const numberOfSlides = Math.ceil(data.length / BARS_PER_PAGE);
  const [areBarsRendered, setAreBarsRendered] = React.useState<
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

  const watchBarRender = React.useCallback(node => {
    if (node === null) {
      return setAreBarsRendered(false);
    }

    setAreBarsRendered(true);
  }, []);

  const chartDataMaxYValue = React.useMemo(() => {
    return getArrayMaxValue(data, (day: any) =>
      getTotalMinutesFromTime(day.totalTimeAtOffice),
    );
  }, [data]);

  const renderChartBars = (
    { totalTimeAtOffice, day }: ITimetableChartResult,
    i: number,
  ) => {
    const { hours, minutes } = totalTimeAtOffice;
    const totalMinutes = getTotalMinutesFromTime(totalTimeAtOffice);
    const height = getBarHeight(
      DIMENSIONS.CHART_HEIGHT,
      chartDataMaxYValue,
      totalMinutes,
    );
    const shouldDisplayYValue = !(hours === 0 && minutes < 30);

    return (
      <BarContainer barWidth={barWidth} key={day}>
        <BarRectangleContainer barHeight={height}>
          <BarRectangle className="bar-rect" ref={watchBarRender} />
        </BarRectangleContainer>

        {shouldDisplayYValue && (
          <BarChartYValueLabel className="y-label">
            {hours}h{formatMinutes(minutes)}
          </BarChartYValueLabel>
        )}

        <BarChartXValue isMobile={isMobileView}>
          {moment(day).format('DD/MM')}
        </BarChartXValue>
      </BarContainer>
    );
  };

  React.useEffect(() => {
    if (chartContainerRef.current && data.length) {
      const { offsetWidth } = chartContainerRef.current;
      const predictedBarWidth = Math.round(
        offsetWidth / data.length - DIMENSIONS.BAR_GUTTER,
      );

      if (predictedBarWidth <= DIMENSIONS.MIN_BAR_WIDTH) {
        const mobilePredictedBarWidth = Math.round(
          offsetWidth / BARS_PER_PAGE - DIMENSIONS.BAR_GUTTER,
        );

        setBarWidth(mobilePredictedBarWidth);
        setIsMobileView(true);

        return;
      }

      setBarWidth(predictedBarWidth);
      setIsMobileView(false);
    }
  }, [windowWidth, periodStart, periodEnd, data.length]);

  React.useEffect(() => {
    const onResize = debounce(() => setWindowWidth(window.innerWidth), 100);

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  React.useEffect(() => {
    if (areBarsRendered) {
      console.log('hook ran!');
      const showDataTimeline = anime.timeline({
        autoplay: false,
        easing: 'easeOutCubic',
      });

      // Loading spinner animation
      showDataTimeline.add({
        targets: '.loading-spinner',
        duration: 300,
        opacity: [1, 0],
      });

      // Chart bars animation
      showDataTimeline.add({
        targets: '.bar-rect',
        duration: 900,
        translateY: ['100%', 0],
        delay: (el: any, i: number) => i * 30,
        easing: 'easeInOutCubic',
      });

      // Y value labels animation
      showDataTimeline.add({
        targets: '.y-label',
        duration: 300,
        opacity: [0, 1],
        scaleX: [0.875, 1],
        scaleY: [0.875, 1],
        translateY: [2, 0],
        complete: () => setIsYValueDoneAnimating(true),
      });

      showDataTimeline.complete = () => {
        if (isMobileView) {
          setTimeout(() => setIsChartDoneAnimating(true), SLIDER_FIRST_TRANSFORM_TIMING);
        }
      };

      setTimeout(showDataTimeline.play, 100);
    }
  }, [areBarsRendered, isMobileView]);

  React.useEffect(() => {
    /**
     * Unfortunately when resizing and changing the component on the fly
     * Slick's `initialSlide` prop won't work.
     */
    if (isYValueDoneAnimating && isMobileView && sliderRef.current) {
      setTimeout(() => sliderRef.current.slickGoTo(numberOfSlides), 100);
    }
  }, [
    isMobileView,
    isYValueDoneAnimating,
    periodStart,
    periodEnd,
    numberOfSlides,
  ]);

  if (isMobileView) {
    const slides = Array(numberOfSlides)
      .fill(numberOfSlides)
      .map((current, i) => {
        const currentPage = i + 1;

        return (
          <BarsContainer
            isCarouselItem
            isCentered={
              !isMobileView || (isMobileView && data.length < BARS_PER_PAGE)
            }
            key={i}
          >
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
      <Root ref={chartContainerRef}>
        <ChartBarsSlider isChartDoneAnimating={isChartDoneAnimating}>
          <Slider infinite={false} arrows={false} dots ref={sliderRef}>
            {!data.length && (
              <StatusInformationContainer>
                <StatusInformation hasError={hasError} noData={!data.length} />
              </StatusInformationContainer>
            )}

            {slides}
          </Slider>
        </ChartBarsSlider>

        <BarChartAxis />
      </Root>
    );
  }

  return (
    <Root ref={chartContainerRef}>
      <LoadingSpinnerContainer>
        <div className="loading-spinner">
          <LoadingSpinner />
        </div>
      </LoadingSpinnerContainer>

      {!data.length && !isLoading && (
        <StatusInformationContainer>
          <StatusInformation hasError={hasError} noData={data.length === 0} />
        </StatusInformationContainer>
      )}

      <BarsContainer>
        {data.map(renderChartBars)}
      </BarsContainer>

      <BarChartAxis />
    </Root>
  );
};
