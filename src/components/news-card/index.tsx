import * as style from './style.module.css';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import { useHackerNewsApiGetItemQuery } from 'api';
import Skeleton from 'components/skeleton';
interface INewsCardProps {
  id: number;
}

const NewsCard: React.FC<INewsCardProps> = ({ id }) => {
  const { data, isLoading, error, refetch } = useHackerNewsApiGetItemQuery(id);

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className={style.card}>
      {error ? (
        <>
          <span style={{ color: 'white' }}> oops</span>{' '}
          <button className={style.button} onClick={refetch}>
            More
          </button>
        </>
      ) : (
        <>
          <a
            href={data.url}
            className={cn(style.title, {
              [style.href]: data.href !== undefined,
            })}
            target="_blank"
          >
            {data.title}
          </a>
          <div className={style.by}>
            by {data.by}
            <div className={style.time}>{dayjs.unix(data.time).format('DD.MM.YYYY')}</div>
          </div>
          <Link
            to={`/story/${id}`}
            className={cn(style.href, style.comments, {
              [style.hidden]: !data.descendants,
            })}
          >
            Comments {data.kids?.length}
          </Link>
        </>
      )}
    </div>
  );
};

export default NewsCard;
