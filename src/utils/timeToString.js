export const timeToString = (time) => {
  return time < 1
    ? (time * 60).toString() + ' Minutes'
    : time < 24
    ? time.toString() + ' Hours'
    : (time / 24).toString() + ' Day';
};
