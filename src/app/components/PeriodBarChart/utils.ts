import { ITime } from "../../types";

export function getArrayMaxValue(array: any[], acessor: Function): number {
  return array.reduce((accum: number, currentItem: any) => {
    const value = acessor(currentItem);

    if (value > accum) {
      return value;
    }

    return accum;
  }, 0);
}

export function getTotalMinutesFromTime(time: ITime): number {
  return time.hours * 60 + time.minutes;
}

export function getBarHeight(
  maxHeight: number,
  maxValue: number,
  value: number
): number {
  return (value * maxHeight) / maxValue;
}

export function formatMinutes(num: number): string {
  if (num < 10) {
    return `0${num}`;
  }

  return num.toString();
}
