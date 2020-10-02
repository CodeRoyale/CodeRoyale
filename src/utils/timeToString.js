export const timeToString = (time) => {
  return time < 1
    ? (time * 60).toString() + ' Minutes'
    : time < 24
    ? time.toString() + ' Hours'
    : (time / 24).toString() + ' Day';
};

export const millisecondsToString = (time) => {
  time = time / 1000 / 60;
  console.log(time);
  return timeToString(time);
};
