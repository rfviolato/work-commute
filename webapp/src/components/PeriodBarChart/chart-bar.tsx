import { ANIMATION_IDS } from './animations';
import moment from 'moment';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSunglasses } from '@fortawesome/pro-regular-svg-icons';
import { formatMinutes, getBarHeight, getTotalMinutesFromTime } from './utils';
import {
  BarChartXValue,
  BarChartYValueLabel,
  BarContainer,
  BarRectangle,
  BarRectangleContainer,
  DIMENSIONS,
  NoWorkDayDisplay,
  NoWorkDayDisplayContainer,
} from './styled';
import { IChartBarProps } from './interface';

export const ChartBar = React.forwardRef<any, IChartBarProps>(
  (
    { day, hours, minutes, chartDataMaxYValue, barWidth, isMobileView },
    ref,
  ) => {
    const totalMinutes = getTotalMinutesFromTime({ hours, minutes });
    const shouldDisplayYValue = !(hours === 0 && minutes < 30);
    const noWorkDay = hours === 0 && minutes === 0;
    const height = getBarHeight(
      DIMENSIONS.CHART_HEIGHT,
      chartDataMaxYValue,
      totalMinutes,
    );

    return (
      <BarContainer barWidth={barWidth}>
        <BarRectangleContainer barHeight={height}>
          <BarRectangle
            data-animation-id={ANIMATION_IDS.BAR_ANIMATED_RECTANGLE}
            ref={ref}
          />
        </BarRectangleContainer>

        {shouldDisplayYValue && (
          <BarChartYValueLabel
            data-animation-id={ANIMATION_IDS.BAR_Y_VALUE_LABEL}
          >
            {hours}h{formatMinutes(minutes)}
          </BarChartYValueLabel>
        )}

        {noWorkDay && (
          <NoWorkDayDisplayContainer>
            <NoWorkDayDisplay>
              <FontAwesomeIcon icon={faSunglasses} />
            </NoWorkDayDisplay>
          </NoWorkDayDisplayContainer>
        )}

        <BarChartXValue
          data-animation-id={ANIMATION_IDS.BAR_X_VALUE_LABEL}
          isMobile={isMobileView}
        >
          {moment(day).format('DD/MM')}
        </BarChartXValue>
      </BarContainer>
    );
  },
);
