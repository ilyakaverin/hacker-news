import React, { useState, useEffect, useCallback } from 'react';
import style from './style.module.css';
import Loader from '../Loader';

interface ITimerProps {
  onTimeOut: () => void;
  isLoading: boolean;
}

const Timer: React.FC<ITimerProps> = ({ onTimeOut, isLoading }) => {
  const [timer, setTimer] = useState(59);

  const handleRefresh = useCallback(() => {
    onTimeOut();
    setTimer(59);
  }, [onTimeOut]);

  useEffect(() => {
    if (!isLoading && timer > 0) {
      const timerid: ReturnType<typeof setInterval> = setInterval(() => setTimer(timer - 1), 1000);

      return () => clearInterval(timerid);
    }
  }, [timer, isLoading]);

  useEffect(() => {
    if (timer === 0) {
      handleRefresh();
    }
  }, [handleRefresh, timer]);

  return (
    <button disabled={isLoading} className={style.button} onClick={handleRefresh}>
      {isLoading ? <Loader /> : `Refresh ${timer}`}
    </button>
  );
};
export default Timer;
