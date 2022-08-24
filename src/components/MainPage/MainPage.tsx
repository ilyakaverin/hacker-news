import React from 'react';
import * as style from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getNews,
  newsLoading,
  newsData,
  getNewsIDs,
  newsIDs,
  loadedChunk,
  isDisabledRefresh,
  disableRefresh,
  loadNextChunk,
  currentNewsChunk
} from "../../store/hackernews";
import NewsCard from "../NewsCard/NewsCard";
import cn from "classnames";
import Timer from '../Timer/Timer';
import Skeleton from '../Skeleton/Skeleton';

const MainPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(newsLoading);
  const isRefreshDisabled = useSelector(isDisabledRefresh)
  const newsRedux: Array<object> = useSelector(newsData);
  const newsID = useSelector(newsIDs);
  const isChunkLoading = useSelector(loadedChunk);
  const currentChunk = useSelector(currentNewsChunk);
  const loadChunk = () => {
    dispatch(disableRefresh());
    dispatch(loadNextChunk(currentChunk + 1));
    dispatch(getNews());
  };
  useEffect(() => {
    dispatch(getNewsIDs());
  }, []);
  useEffect(() => {
    if (newsID.length > 0) dispatch(getNews());
  }, [newsID]);

  return (
    <div className={style.container}>
      <Timer />
      <div className={style.news}>
 {
   Object.keys(newsRedux).length === 0 ? <Skeleton /> : newsRedux.map((item: any, index) => (
    <NewsCard
    key={index}
    title={item.title}
    by={item.by}
    date={item.time}
    href={item.url}
    text={item.text}
    id={item.id}
    descendants={item.descendants}
  />
  ))
 }
      </div>
      <button
        disabled={isRefreshDisabled}
        className={cn(style.button, {
          [style.hidden]: isLoading || Object.keys(newsRedux).length === 100,
        })}
        onClick={() => loadChunk()}
      >
        {isChunkLoading ? "...Loading" : "More"}
      </button>
    </div>
  );
};
export default MainPage;
