export const timeToString = (time) => {
  if (time < 1) return `${(time * 60).toString()} Minutes`;

  if (time < 24) return `${time.toString()} Hour`;

  return `${(time / 24).toString()} Day`;
};

export const millisecondsToString = (time) => {
  const timeMod = time / 1000 / 60;
  return timeToString(timeMod);
};
