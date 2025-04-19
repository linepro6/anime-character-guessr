import React, { useState, useRef } from 'react';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Timer = React.forwardRef(({ timeLimit, onTimeUp }, ref) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const endTimeRef = useRef(null);

  React.useImperativeHandle(ref, () => ({
    reset: () => {
      if (endTimeRef.current) {
        clearInterval(endTimeRef.current);
      }

      const newEndTime = Date.now() + timeLimit * 1000;
      endTimeRef.current = newEndTime;
      setTimeLeft(timeLimit);

      const interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.round((endTimeRef.current - now) / 1000));
        setTimeLeft(remaining);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setTimeLeft(0);
        onTimeUp();
      }, timeLimit * 1000);
    },
  }), [timeLimit, onTimeUp]);

  return (
    <div className="timer">
      {timeLimit && <span>{formatTime(timeLeft)}</span>}
    </div>
  );
});

export default Timer;
