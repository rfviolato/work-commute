import React from 'react';
import moment from 'moment';
import debounce from 'lodash.debounce';
import {
  IPeriodChartProps,
  IPeriodChartComponentProps,
  IPeriodQueryData,
} from './interface';
import { useQuery } from '@apollo/react-hooks';
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
} from './styled';

const chartContainerRef = React.createRef<HTMLDivElement>();
const sliderRef = React.createRef<any>();
const BARS_PER_PAGE = 5;
const BAR_WIDTH_INITIAL_VALUE = -1;

export const PeriodBarChart: React.FC<IPeriodChartProps> = ({
  periodStart,
  periodEnd,
}) => {
  const { loading, data, error } = useQuery<IPeriodQueryData>(query, {
    variables: {
      periodStart,
      periodEnd,
    },
  });

  if (!loading && data && data.Period) {
    const {
      Period: { timetableChart },
    } = data;

    return (
      <PeriodBarChartComponent
        data={timetableChart}
        periodStart={periodStart}
        periodEnd={periodEnd}
      />
    );
  }

  return (
    <PeriodBarChartComponent
      isLoading={loading}
      hasError={!!error}
      periodStart={periodStart}
      periodEnd={periodEnd}
    />
  );
};

const defaultDataValue: any = [];
let isFirstLoaded = false;

export const PeriodBarChartComponent: React.FC<IPeriodChartComponentProps> = ({
  data = defaultDataValue,
  periodStart,
  periodEnd,
  isLoading = false,
  hasError = false,
}) => {
  const [isChartVisible, setIsChartVisible] = React.useState<boolean>(false);
  const [chartData, setChartData] = React.useState(data);
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
  const numberOfSlides = Math.ceil(chartData.length / BARS_PER_PAGE);

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

  const chartDataMaxYValue = React.useMemo(() => {
    return getArrayMaxValue(chartData, (day: any) =>
      getTotalMinutesFromTime(day.totalTimeAtOffice),
    );
  }, [chartData]);

  React.useEffect(() => {
    if (!isLoading) {
      setChartData(data);
      setTimeout(() => setIsChartVisible(true), 300);
    }

    if (!isFirstLoaded && data.length) {
      isFirstLoaded = true;
    }
  }, [data, isLoading]);

  React.useEffect(() => {
    if (isLoading && data.length === 0 && isFirstLoaded) {
      setIsYValueDoneAnimating(false);
      setIsChartDoneAnimating(false);
      setAreBarsDoneAnimating(false);

      setTimeout(() => {
        setIsChartVisible(false);
      }, 300);
    }
  }, [isChartVisible, isChartDoneAnimating, areBarsDoneAnimating, isYValueDoneAnimating, data, isLoading]);

  console.log({
    isChartVisible,
    areBarsDoneAnimating,
    isYValueDoneAnimating,
    isChartDoneAnimating,
  })

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
          <BarRectangle
            index={i}
            pose={isChartVisible ? 'visible' : 'invisible'}
            onPoseComplete={onBarAnimationComplete}
          />
        </BarRectangleContainer>

        {shouldDisplayYValue && (
          <BarChartYValueLabel
            pose={areBarsDoneAnimating ? 'visible' : 'invisible'}
            onPoseComplete={onYAxisValueAnimationComplete}
          >
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
    if (chartContainerRef.current && chartData.length) {
      const { offsetWidth } = chartContainerRef.current;
      const predictedBarWidth = Math.round(
        offsetWidth / chartData.length - DIMENSIONS.BAR_GUTTER,
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
  }, [windowWidth, periodStart, periodEnd, chartData.length]);

  React.useEffect(() => {
    const onResize = debounce(() => setWindowWidth(window.innerWidth), 100);

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  React.useEffect(() => {
    /**
     * Unfortunately when resizing and changing the component on the fly
     * Slick's `initialSlide` prop won't work.
     */
    if (isYValueDoneAnimating && isMobileView && sliderRef.current) {
      sliderRef.current.slickGoTo(numberOfSlides);
    }
  }, [
    isMobileView,
    isYValueDoneAnimating,
    periodStart,
    periodEnd,
    numberOfSlides,
  ]);

  if (barWidth === BAR_WIDTH_INITIAL_VALUE) {
    return (
      <div ref={chartContainerRef}>
        <BarsContainer>
          <StatusInformationContainer>
            <LoadingSpinner />
          </StatusInformationContainer>
        </BarsContainer>

        <BarChartAxis />
      </div>
    );
  }

  if (isMobileView) {
    const slides = Array(numberOfSlides)
      .fill(numberOfSlides)
      .map((current, i) => {
        const currentPage = i + 1;

        return (
          <BarsContainer
            isCarouselItem
            isCentered={
              !isMobileView || (isMobileView && chartData.length < BARS_PER_PAGE)
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
      <div ref={chartContainerRef}>
        <ChartBarsSlider isChartDoneAnimating={isChartDoneAnimating}>
          <Slider infinite={false} arrows={false} dots ref={sliderRef}>
            {!chartData.length && (
              <StatusInformationContainer>
                <StatusInformation hasError={hasError} noData={!chartData.length} />
              </StatusInformationContainer>
            )}

            {slides}
          </Slider>
        </ChartBarsSlider>

        <BarChartAxis />
      </div>
    );
  }

  return (
    <div ref={chartContainerRef}>
      <BarsContainer>
        {!chartData.length && (
          <StatusInformationContainer>
            <StatusInformation hasError={hasError} noData={chartData.length === 0} />
          </StatusInformationContainer>
        )}

        {chartData.map(renderChartBars)}
      </BarsContainer>

      <BarChartAxis />
    </div>
  );
};
