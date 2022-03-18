import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  commentsData,
  clearCurrent,
  commentsLoading,
  getCurrentComments,
  getCurrentStory,
  storyData,
  clearNews,
  clearNewsIDs,
} from "../../store/hackernews";
import { format } from "date-fns";
import * as style from "./style.module.css";
import { useEffect, useRef } from "react";
import Loader from "../../components/Loader/Loader";
import Comment from "./components/Comments/index";

interface Story {
  id: number;
  text: string;
  by: string;
  kids: Array<number>;
}

const NewsPage = () => {
  const params = useParams();
  const id = Number(params.storyId);
  const dispatch = useDispatch();
  const iscommentsLoading = useSelector(commentsLoading);
  const story = useSelector(storyData);
  const comments = useSelector(commentsData);
  const navigate = useNavigate();
  const ref = useRef(window);
  const formattedTime = (seconds: number) =>
    format(new Date(seconds * 1000), "dd MMMM yyyy H:mm");
  const handleClick = () => {
    dispatch(clearNews());
    dispatch(clearCurrent());
    dispatch(clearNewsIDs());
    navigate("/");
  };

  useEffect(() => {
    dispatch(getCurrentStory(id));
  }, []);
  useEffect(() => {
    if (!Array.isArray(story) && story.descendants > 0) {
      dispatch(getCurrentComments());
      ref.current.scrollTo(0, 0);
    }
  }, [story]);

  return (
    <div className={style.container}>
      <div className={style.info}>
        <h2>{story?.title}</h2>
        {story.url ? <a href={story?.url}>Link</a> : <></>}
        <span>{story.time && formattedTime(story.time)}</span>
        <span>Total comments {story.descendants}</span>
        <button className={style.button} onClick={handleClick}>
          Back
        </button>
        <button
          className={style.button}
          onClick={() => dispatch(getCurrentComments())}
        >
          Refresh
        </button>
      </div>

      {iscommentsLoading ? (
        <div className={style.loading}>
          {" "}
          <Loader />
        </div>
      ) : (
        comments.map((i: Story, index: number) => (
          <Comment key={index} text={i.text} by={i.by} kids={i.kids} />
        ))
      )}
    </div>
  );
};
export default NewsPage;
