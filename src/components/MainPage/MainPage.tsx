import React, { useEffect, useState } from 'react';
import * as style from './style.module.css';
import NewsCard from '../NewsCard/NewsCard';
import cn from 'classnames';
import Timer from '../Timer/Timer';
import Skeleton from '../Skeleton/Skeleton';
import { useHackerNewsApiBestStoriesQuery } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setData, showMore } from '../../store/hackernews-stories';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const { data, isFetching: isLoading, refetch } = useHackerNewsApiBestStoriesQuery({ order: 'key', limit: '100' });

  useEffect(() => {
    if (data) dispatch(setData(data));
  }, [data, dispatch]);

  const stories = useSelector(state => state.stories.currentStories);
  const allStories = useSelector(state => state.stories.allStories);

  console.log(stories);

  const handleClick = () => {
    const currentCount = count + 1;
    const correntStories = [...stories, ...allStories[currentCount]];

    setCount(currentCount);
    dispatch(showMore(correntStories));
  };

  return (
    <div className={style.container}>
      <Timer onTimeOut={refetch} isLoading={isLoading} />
      <div className={style.news}>
        {isLoading ? <Skeleton /> : stories.map((id: number, index: number) => <NewsCard key={index} id={id} />)}
      </div>
      <button
        disabled={count === allStories.length - 1}
        className={cn(style.button, {
          [style.hidden]: isLoading,
        })}
        onClick={handleClick}
      >
        More
      </button>
    </div>
  );
};
export default MainPage;
