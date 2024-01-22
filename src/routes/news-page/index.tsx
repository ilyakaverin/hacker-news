import { useParams, useNavigate } from 'react-router-dom';
import * as style from './style.module.css';
import Loader from 'components/loader';
import dayjs from 'dayjs';
import { useHackerNewsApiGetItemQuery } from 'api';
import Comment from 'components/comment';

const NewsPage: React.FC = () => {
  const params = useParams();
  const id = Number(params.storyId);
  const navigate = useNavigate();

  const { data: story, isFetching: isLoading, refetch } = useHackerNewsApiGetItemQuery(id);

  return (
    <div className={style.container}>
      <div className={style.info}>
        <h2>{story?.title}</h2>
        {story?.url ? <a href={story?.url}>Link</a> : <></>}
        <span>{story?.time && dayjs.unix(story?.time).format('DD/MM/YYYY')}</span>
        <span>Total comments {story?.descendants}</span>
        <button className={style.button} onClick={() => navigate('/')}>
          Back
        </button>
        <button className={style.button} onClick={refetch}>
          Refresh
        </button>
      </div>
      {isLoading ? (
        <div className={style.loading}>
          <Loader />
        </div>
      ) : (
        story.kids.map((id: number, index: number) => <Comment key={index} id={id} />)
      )}
    </div>
  );
};
export default NewsPage;
