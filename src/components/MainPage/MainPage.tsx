import * as style from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getNews,
  newsLoading,
  newsData,
  getNewsIDs,
  newsIDs,
  refreshNews,
  loadedChunk,
} from "../../store/hackernews";
import NewsCard from "../NewsCard/NewsCard";
import Loader from "../Loader/Loader";
import cn from "classnames";
let newsChunk = 1;
const MainPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(newsLoading);
  const newsRedux: Array<object> = useSelector(newsData);
  const newsID = useSelector(newsIDs);
  const [timer, setTimer] = useState(60);
  const isChunkLoading = useSelector(loadedChunk);

  const handleRefresh = () => {
    dispatch(refreshNews());
    dispatch(getNews(1));
    setTimer(60);
  };
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

  useEffect(() => {
    if (!isLoading) {
      const timerid: any =
        timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(timerid);
    }
  }, [timer, isLoading]);

  if (timer === 0) {
    handleRefresh();
  }
  return (
    <div className={style.container}>
      <button className={style.button} onClick={() => handleRefresh()}>
        {isLoading ? <Loader /> : `Refresh ${timer}`}
      </button>
      <div className={style.news}>
        {newsRedux.map((item: any, index) => (
          <NewsCard
            key={index}
            title={item.title}
            by={item.by}
            date={item.time}
            rating={item.score}
            href={item.url}
            text={item.text}
            id={item.id}
            descendants={item.descendants}
          />
        ))}
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
