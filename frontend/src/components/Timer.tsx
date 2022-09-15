import React, { useEffect, useState } from "react";

export const Timer: React.FC<{ milliseconds: number }> = ({ milliseconds }) => {
  const [over, setOver] = useState(false);
  const [time, setTime] = useState({
    // converting the ms into mins
    minutes: milliseconds / 60000,
    seconds: 0,
  });

  // the countdown function
  const tick = () => {
    if (over) return;

    if (time.minutes === 0 && time.seconds === 0) {
      setOver(true);
    } else if (time.seconds === 0) {
      setTime({
        minutes: time.minutes - 1,
        seconds: 59,
      });
    } else {
      setTime({
        ...time,
        seconds: time.seconds - 1,
      });
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <span className="text-2xl text-primary-100">
      {time.minutes.toString().padStart(2, "0")}:
      {time.seconds.toString().padStart(2, "0")}
    </span>
  );
};
