import React, { useEffect, useState } from 'react';
import * as style from './style.module.css';
import NewsCard from 'components/news-card';
import Timer from 'components/timer';
import Skeleton from 'components/skeleton';
import { useHackerNewsApiBestStoriesQuery } from 'api';
import { useDispatch, useSelector } from 'react-redux';
import { IStore, setData, showMore } from 'store/hackernews-stories';
import { Button } from 'components/atomic/button';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(0);

  const { data, isFetching: isLoading, refetch } = useHackerNewsApiBestStoriesQuery({ order: 'key', limit: '100' });

  useEffect(() => {
    if (data) {
      setCount(0);
      dispatch(setData(data));
    }
  }, [data, dispatch]);

  const stories = useSelector((state: IStore) => state.stories.currentStories);
  const allStories = useSelector((state: IStore) => state.stories.allStories);

  const handleClick = () => {
    const currentCount: number = count + 1;
    const currentStories: number[] = [...stories, ...allStories[currentCount]];

    setCount(currentCount);
    dispatch(showMore(currentStories));
  };

  return (
    <div className={style.container}>
      <Timer onTimeOut={refetch} isLoading={isLoading} />
      <div className={style.news}>{isLoading ? <Skeleton /> : stories.map((id: number) => <NewsCard key={id} id={id} />)}</div>
      <Button disabled={count === allStories.length - 1} onClick={handleClick} isLoading={isLoading}>
        More
      </Button>
    </div>
  );
};
export default MainPage;
