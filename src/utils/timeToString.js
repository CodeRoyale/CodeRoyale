export const timeToString = (time) =>
  time < 1
    ? `${(time * 60).toString()} Minutes`
    : time < 24
    ? `${time.toString()} Hour`
    : `${(time / 24).toString()} Day`;

export const millisecondsToString = (time) => {
  time = time / 1000 / 60;
  return timeToString(time);
};
