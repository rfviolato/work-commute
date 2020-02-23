import { ANIMATION_IDS } from './animations';
import moment from 'moment';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/pro-regular-svg-icons';
import { EventIcon } from '../EventIcon';
import { formatMinutes, getBarHeight, getTotalMinutesFromTime } from './utils';
import {
  BarChartInfo,
  BarChartXValue,
  BarContainer,
  BarRectangle,
  BarRectangleContainer,
  DIMENSIONS,
  IconEllipsis,
  NoWorkDayDisplay,
  NoWorkDayDisplayStem,
  WorkDayEvent,
} from './styled';
import { IChartBarProps } from './interface';

const renderEventIcon = (events: IChartBarProps['events']) => {
  if (!events) {
    return null;
  }

  if (events.length > 1) {
    return <FontAwesomeIcon icon={faTags} />;
  }

  return <EventIcon event={events[0]} />;
};

const renderEventDisplay = (
  noWorkDay: boolean,
  events: IChartBarProps['events'],
) => {
  if (noWorkDay && events) {
    return (
      <NoWorkDayDisplay data-animation-id={ANIMATION_IDS.NO_WORK_INFO}>
        <IconEllipsis>
          {renderEventIcon(events)}
          <NoWorkDayDisplayStem
            data-animation-id={ANIMATION_IDS.NO_WORK_INFO_STEM}
          />
        </IconEllipsis>
      </NoWorkDayDisplay>
    );
  }

  if (events) {
    return (
      <WorkDayEvent>
        <IconEllipsis>{renderEventIcon(events)}</IconEllipsis>
      </WorkDayEvent>
    );
  }

  return null;
};

export const ChartBar = React.forwardRef<any, IChartBarProps>(
  (
    { day, hours, minutes, chartDataMaxYValue, barWidth, isMobileView, events },
    ref,
  ) => {
    const totalMinutes = getTotalMinutesFromTime({ hours, minutes });
    const shouldDisplayInfo = !(hours === 0 && minutes < 30);
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

        {shouldDisplayInfo && (
          <BarChartInfo data-animation-id={ANIMATION_IDS.BAR_INFO}>
            <div>
              {hours}h{formatMinutes(minutes)}
            </div>

            {renderEventDisplay(noWorkDay, events)}
          </BarChartInfo>
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
