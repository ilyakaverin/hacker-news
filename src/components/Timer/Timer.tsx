import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getNews, newsLoading, refreshNews } from "../../store/hackernews";
import Loader from '../Loader/Loader';

const Timer = () => {
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(59);

    const handleRefresh = () => {
        dispatch(refreshNews());
        dispatch(getNews(1));
        setTimer(59);
      };
      const isLoading = useSelector(newsLoading);


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
        <button className={style.button} onClick={() => handleRefresh()}>
        {isLoading ? <Loader /> : `Refresh ${timer}`}
       </button>
    )
}
export default Timer