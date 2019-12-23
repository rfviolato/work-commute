import React from 'react';
import styled from '@emotion/styled';
import posed from 'react-pose';
import moment from 'moment';
import debounce from 'lodash.debounce';
import { IPeriodChartProps } from './interface';
import { ITime } from '../Period/interface';

const DIMENSIONS = {
  CHART_HEIGHT: 375,
  BAR_GUTTER: 8,
};

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

const BarChartXValue = styled.div`
  position: absolute;
  width: 100%;
  bottom: -26px;
  left: 0;
  font-size: 1.2em;
  text-align: center;
`;

const BarsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 2px;
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
  background: #f1f1f1;
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

const barsContainerRef = React.createRef<HTMLDivElement>();

export const PeriodBarChat: React.FC<IPeriodChartProps> = ({ data }) => {
  const [chartDaraMaxYValue, setChartDaraMaxYValue] = React.useState<number>(0);
  const [isChartVisible, setIsChartVisible] = React.useState<boolean>(false);
  const [areBarsVisible, setAreBarsVisible] = React.useState<boolean>(false);
  const [barWidth, setBarWidth] = React.useState<number>(0);
  const onBarAnimationComplete = debounce(() => {
    setAreBarsVisible(true);
  }, 100);

  React.useEffect(() => {
    if (data) {
      setChartDaraMaxYValue(
        getArrayMaxValue(data, (day: any) =>
          getTotalMinutesFromTime(day.totalTimeAtOffice),
        ),
      );

      setTimeout(() => setIsChartVisible(true), 300);
    }
  }, [data]);

  React.useEffect(() => {
    if (barsContainerRef.current) {
      const { offsetWidth } = barsContainerRef.current;

      setBarWidth(
        Math.round(offsetWidth / data.length - DIMENSIONS.BAR_GUTTER),
      );
    }
  }, []);

  return (
    <>
      <BarsContainer ref={barsContainerRef}>
        {data.map(({ totalTimeAtOffice, day }, i) => {
          const totalMinutes = getTotalMinutesFromTime(totalTimeAtOffice);
          const height = getBarHeight(
            DIMENSIONS.CHART_HEIGHT,
            chartDaraMaxYValue,
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
                pose={areBarsVisible ? 'visible' : 'invisible'}
              >
                {totalTimeAtOffice.hours}h
                {formatMinutes(totalTimeAtOffice.minutes)}
              </BarChartYValueLabel>

              <BarChartXValue>{moment(day).format('DD/MM')}</BarChartXValue>
            </BarContainer>
          );
        })}
      </BarsContainer>

      <BarChartAxis />
    </>
  );
};
