interface ITime {
  hours: number;
  minutes: number;
}

export const getTimeFromMinutes = (totalMinutes: number): ITime => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return {
    hours,
    minutes,
  };
};
