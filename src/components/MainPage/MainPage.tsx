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
} from "../../store/hackernews";
import NewsCard from "../NewsCard/NewsCard";
import cn from "classnames";
import Timer from '../Timer/Timer';
import Skeleton from '../Skeleton/Skeleton';

let newsChunk = 1;
const MainPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(newsLoading);
  const newsRedux: Array<object> = useSelector(newsData);
  const newsID = useSelector(newsIDs);
  const isChunkLoading = useSelector(loadedChunk);
  const loadChunk = () => {
    newsChunk += 1;
    dispatch(getNews(newsChunk));
  };
  useEffect(() => {
    dispatch(getNewsIDs());
  }, []);
  useEffect(() => {
    if (newsID.length > 0) dispatch(getNews(1));
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
        className={cn(style.button, {
          [style.hidden]: isLoading || newsChunk === 8,
        })}
        onClick={() => loadChunk()}
      >
        {isChunkLoading ? "...Loading" : "More"}
      </button>
    </div>
  );
};
export default MainPage;
