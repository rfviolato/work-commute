import React from 'react';
import moment from 'moment';
import debounce from 'lodash.debounce';
import { useQuery } from '@apollo/react-hooks';
import usePrevious from 'react-hooks-use-previous';
import {
  IPeriodChartProps,
  IPeriodChartComponentProps,
  IPeriodQueryData,
  IChartData,
} from './interface';
import { Slider } from './../Slider';
import {
  getTotalMinutesFromTime,
  getBarHeight,
  formatMinutes,
  getArrayMaxValue,
} from './utils';
import query from './query';
import { StatusInformation } from './status-information';
import { ITimetableChartResult } from '../../interfaces';
import {
  createBarsInAnimationTimeline,
  createBarsOutAnimationTimeline,
  createReverseBarsOutAnimationTimeline,
  ANIMATION_IDS,
} from './animations';
import {
  DIMENSIONS,
  Root,
  BarChartXValue,
  BarContainer,
  BarRectangleContainer,
  BarRectangle,
  BarChartYValueLabel,
  BarsContainer,
  StatusInformationContainer,
  BarChartAxis,
  ChartBarsSlider,
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
  const periodId = `${periodStart}_${periodEnd}`;

  if (!loading && data && data.Period) {
    const {
      Period: { timetableChart },
    } = data;

    return (
      <PeriodBarChartComponent data={timetableChart} periodId={periodId} />
    );
  }

  return (
    <PeriodBarChartComponent
      isLoading={loading}
      hasError={!!error}
      periodId={periodId}
    />
  );
};

const DATA_INITIAL_PROP: any[] = [];
const SLIDER_SPEED = 800;

export const PeriodBarChartComponent: React.FC<IPeriodChartComponentProps> = ({
  data = DATA_INITIAL_PROP,
  periodId,
  isLoading,
  hasError,
}) => {
  const animateBarsInTimeline = React.useRef<any>();
  const [isAnimating, setIsAnimating] = React.useState<boolean>(false);
  const [chartData, setChartData] = React.useState<IChartData>(data);
  const [areBarsRendered, setAreBarsRendered] = React.useState<boolean>(false);
  const [chartDoneAnimating, setChartDoneAnimating] = React.useState<boolean>(
    false,
  );
  const [isMobileView, setIsMobileView] = React.useState<boolean>(false);
  const [barWidth, setBarWidth] = React.useState<number>(
    BAR_WIDTH_INITIAL_VALUE,
  );
  const [windowWidth, setWindowWidth] = React.useState<number>(
    window.innerWidth,
  );
  const watchBarRender = React.useCallback((node) => {
    if (node === null) {
      return setAreBarsRendered(false);
    }

    setAreBarsRendered(true);
  }, []);
  const numberOfSlides = Math.ceil(chartData.length / BARS_PER_PAGE);
  const previousPeriodId = usePrevious(periodId, periodId);
  const hasPeriodChanged = periodId !== previousPeriodId;
  const isDataLoaded = data === chartData;

  React.useEffect(() => {
    const onResize = debounce(() => setWindowWidth(window.innerWidth), 100);

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const chartDataMaxYValue = React.useMemo(() => {
    return getArrayMaxValue(chartData, (day: any) =>
      getTotalMinutesFromTime(day.totalTimeAtOffice),
    );
  }, [chartData]);

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
            data-animation-id={ANIMATION_IDS.BAR_ANIMATED_RECTANGLE}
            ref={watchBarRender}
          />
        </BarRectangleContainer>

        {shouldDisplayYValue && (
          <BarChartYValueLabel
            data-animation-id={ANIMATION_IDS.BAR_Y_VALUE_LABEL}
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
  }, [windowWidth, periodId, chartData]);

  React.useEffect(() => {
    setChartDoneAnimating(false);
  }, [isMobileView]);

  React.useEffect(
    function reverseAnimationEffect() {
      if (hasPeriodChanged && isAnimating && !chartDoneAnimating) {
        animateBarsInTimeline.current.pause();

        const animationTimeline = createReverseBarsOutAnimationTimeline();

        animationTimeline.complete = () => {
          sliderRef.current && sliderRef.current.slickGoTo(0, true);

          window.requestIdleCallback(() => {
            setIsAnimating(false);
            setChartDoneAnimating(false);
          });
        };

        setIsAnimating(true);
        window.requestIdleCallback(animationTimeline.play);
      }
    },
    [hasPeriodChanged, data, chartDoneAnimating, isAnimating],
  );

  React.useEffect(
    function animateBarsOut() {
      if (hasPeriodChanged && chartDoneAnimating && data !== chartData) {
        const animationTimeline = createBarsOutAnimationTimeline();

        animationTimeline.complete = () => {
          sliderRef.current && sliderRef.current.slickGoTo(0, true);

          window.requestIdleCallback(() => {
            setIsAnimating(false);
            setChartDoneAnimating(false);
          });
        };

        setIsAnimating(true);
        window.requestIdleCallback(animationTimeline.play);
      }
    },
    [chartDoneAnimating, data, chartData, hasPeriodChanged],
  );

  React.useEffect(
    function animateBarsInEffect() {
      if (
        areBarsRendered &&
        isDataLoaded &&
        chartData.length &&
        !chartDoneAnimating
      ) {
        const animationTimeline = createBarsInAnimationTimeline();

        animateBarsInTimeline.current = animationTimeline;
        animationTimeline.complete = () => {
          if (isMobileView) {
            window.requestIdleCallback(
              () =>
                sliderRef.current &&
                sliderRef.current.slickGoTo(numberOfSlides),
            );

            setTimeout(
              () =>
                window.requestIdleCallback(() => {
                  setIsAnimating(false);
                  setChartDoneAnimating(true);
                }),
              SLIDER_SPEED,
            );
          } else {
            window.requestIdleCallback(() => {
              setIsAnimating(false);
              setChartDoneAnimating(true);
            });
          }
        };

        setIsAnimating(true);
        window.requestIdleCallback(animationTimeline.play);
      }
    },
    [
      areBarsRendered,
      chartDoneAnimating,
      data,
      chartData,
      isMobileView,
      numberOfSlides,
      isDataLoaded,
    ],
  );

  React.useEffect(
    function freshDataEffect() {
      if (!chartDoneAnimating && !isAnimating) {
        setChartData(data);
      }
    },
    [chartDoneAnimating, isAnimating, data],
  );

  if (isMobileView) {
    const slides = Array(numberOfSlides)
      .fill(numberOfSlides)
      .map((current, i) => {
        const currentPage = i + 1;

        return (
          <BarsContainer
            isCarouselItem
            isCentered={chartData.length < BARS_PER_PAGE}
            key={i}
          >
            {chartData
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
        <ChartBarsSlider>
          {!chartDoneAnimating && (
            <StatusInformationContainer>
              <StatusInformation
                isLoading={isLoading}
                hasError={hasError}
                noData={data.length === 0}
              />
            </StatusInformationContainer>
          )}

          <Slider
            infinite={false}
            arrows={false}
            dots
            ref={sliderRef}
            easing="cubic-bezier(0.645, 0.045, 0.355, 1)"
            speed={SLIDER_SPEED}
          >
            {slides}
          </Slider>
        </ChartBarsSlider>

        <BarChartAxis />
      </Root>
    );
  }

  return (
    <Root ref={chartContainerRef}>
      {!chartDoneAnimating && (
        <StatusInformationContainer>
          <StatusInformation
            isLoading={isLoading}
            hasError={hasError}
            noData={data.length === 0}
          />
        </StatusInformationContainer>
      )}

      <BarsContainer>{chartData.map(renderChartBars)}</BarsContainer>

      <BarChartAxis />
    </Root>
  );
};
