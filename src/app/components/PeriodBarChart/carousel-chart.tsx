import React from 'react';
import { Slider } from '../Slider';
import { BarsContainer } from './styled';
import { ICarouselChartProps } from './interface';

export const BARS_PER_PAGE = 5;
export const SLIDER_SPEED = 800;
const SLIDER_EASING = 'cubic-bezier(0.645, 0.045, 0.355, 1)'; // easeInOutCubic

const CarouselChartComponent = React.forwardRef<any, ICarouselChartProps>(
  (props, ref) => {
    const { numberOfSlides, chartData, renderChartBars } = props;
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
      <Slider
        infinite={false}
        arrows={false}
        dots
        ref={ref}
        easing={SLIDER_EASING}
        speed={SLIDER_SPEED}
      >
        {slides}
      </Slider>
    );
  },
);

export const CarouselChart = React.memo(CarouselChartComponent);
