import { ITime } from "../types";

export const getTimeFromMinutes = (totalMinutes: number): ITime => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return {
    hours,
    minutes,
  };
};
