import React from 'react';
import styled from '@emotion/styled';
import posed from 'react-pose';
import moment from 'moment';
import debounce from 'lodash.debounce';
import { IPeriodChartProps } from './interface';
import { ITime } from '../Period/interface';

const DIMENSIONS = {
  CHART_HEIGHT: 375,
};

const AnimatedBarLabel = posed.div({
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      default: { duration: 500, ease: [0.215, 0.61, 0.355, 1], delay: 100 },
    },
  },
  invisible: { opacity: 0, y: 3 },
});

const BarChartYValueLabel = styled(AnimatedBarLabel)`
  position: absolute;
  width: 100%;
  top: 7px;
  left: 0;
  font-size: 10px;
  text-align: center;
`;

const BarChartXValue = styled.div`
  position: absolute;
  width: 100%;
  bottom: -26px;
  left: 0;
  font-size: 12px;
  text-align: center;
`;

const BarsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 2px;
`;

const SingleBarContainer = styled.div`
  position: relative;
  flex: 1;

  &:not(:first-of-type) {
    margin-left: 8px;
  }
`;

const BarContainer = styled.div`
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

const Bar = styled(AnimatedBar)`
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

export const PeriodBarChat: React.FC<IPeriodChartProps> = ({ data }) => {
  const [chartDaraMaxYValue, setChartDaraMaxYValue] = React.useState<number>(0);
  const [isChartVisible, setIsChartVisible] = React.useState<boolean>(false);
  const [areBarsVisible, setAreBarsVisible] = React.useState<boolean>(false);
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

  return (
    <>
      <BarsContainer>
        {data.map(({ totalTimeAtOffice, day }, i) => {
          const totalMinutes = getTotalMinutesFromTime(totalTimeAtOffice);
          const height = getBarHeight(
            DIMENSIONS.CHART_HEIGHT,
            chartDaraMaxYValue,
            totalMinutes,
          );

          return (
            <SingleBarContainer key={day}>
              <BarContainer
                style={{
                  height: `${height}px`,
                }}
              >
                <Bar
                  index={i}
                  pose={isChartVisible ? 'visible' : 'invisible'}
                  onPoseComplete={onBarAnimationComplete}
                />
              </BarContainer>

              <BarChartYValueLabel
                pose={areBarsVisible ? 'visible' : 'invisible'}
              >
                {totalTimeAtOffice.hours}h
                {formatMinutes(totalTimeAtOffice.minutes)}
              </BarChartYValueLabel>

              <BarChartXValue>{moment(day).format('DD/MM')}</BarChartXValue>
            </SingleBarContainer>
          );
        })}
      </BarsContainer>

      <BarChartAxis />
    </>
  );
};
