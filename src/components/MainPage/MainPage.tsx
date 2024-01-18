import React from 'react';
import * as style from "./style.module.css";
import NewsCard from "../NewsCard/NewsCard";
import cn from "classnames";
import Timer from '../Timer/Timer';
import Skeleton from '../Skeleton/Skeleton';
import { useHackerNewsApiBestStoriesQuery } from '../../api';

const MainPage: React.FC = () => {

  const { data, isFetching: isLoading
    , refetch } = useHackerNewsApiBestStoriesQuery({ order: 'key', limit: '100' });
  
  return (
    <div className={style.container}>
      <Timer onTimeOut={refetch} isLoading={isLoading} />
      <div className={style.news}>
        {
          isLoading ? <Skeleton /> : data![0].map((id: number, index: number) => (
            <NewsCard
              key={index}
              id={id}
            />
          ))
        }
      </div>
      <button
        className={cn(style.button, {
          [style.hidden]: isLoading,
        })}
      >
      </button>
    </div>
  );
};
export default MainPage;
