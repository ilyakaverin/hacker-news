import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getNews, newsLoading, refreshNews, isDisabledRefresh, disableRefresh, loadNextChunk } from "../../store/hackernews";
import Loader from '../Loader/Loader';

const Timer = () => {
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(59);

    const handleRefresh = () => {
        dispatch(disableRefresh());
        dispatch(refreshNews());
        dispatch(loadNextChunk(0))
        dispatch(getNews());
        setTimer(59);
      };
      const isLoading = useSelector(newsLoading);
      const isRefreshDisabled = useSelector(isDisabledRefresh)


  useEffect(() => {
    if (!isLoading) {
      const timerid: any =
        timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(timerid);
    }

  }, [timer, isLoading]);

  useEffect(() => {
    if (timer === 0) {
        handleRefresh();
      }
  },[timer])

    return (
        <button disabled={isRefreshDisabled} className={style.button} onClick={() => handleRefresh()}>
        {isLoading ? <Loader /> : `Refresh ${timer}`}
       </button>
    )
}
export default Timer
