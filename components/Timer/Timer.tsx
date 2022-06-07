import React, { useEffect, useState } from "react";

interface TimerProps {
  isActive: boolean;
  isPaused: boolean;
  updateTime: (newTime: number) => void;
  time: number;
}

const Timer: React.FC<TimerProps> = ({
  isActive,
  isPaused,
  updateTime,
  time,
}) => {
  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        updateTime(time + 10);
      }, 10);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, isPaused, time, updateTime]);

  const getStringTime = (time:number) => {
    const min = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const sec = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const mili = ("0" + ((time / 10) % 100)).slice(-2);

    return `${min}:${sec}.${mili}`
  }

  return <h3 className="text-left">{getStringTime(time)}</h3>;

};

export default Timer;
