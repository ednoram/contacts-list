import React, { useState, useEffect } from "react";

const Time = () => {
  const [time, setTime] = useState();

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const timerId = setInterval(updateTime, 1000);

    return () => clearInterval(timerId);
  }, []);

  return <p>{time}</p>;
};

export default Time;
