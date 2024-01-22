import * as style from './style.module.css';
import cn from 'classnames';
import React, { useState } from 'react';
import { useHackerNewsApiGetItemQuery } from 'api';
import { createMarkup } from 'service';

export interface IComment {
  by: string;
  text: string;
  deleted: boolean;
}
export interface ICommentProps {
  id: number;
}

const Comment: React.FC<ICommentProps> = ({ id }) => {
  const { data: comment = {} } = useHackerNewsApiGetItemQuery(id);

  const [visible, setVisible] = useState(false);

  if (comment.deleted) return null;

  return (
    <>
      <div className={style.commentContainer}>
        <p className={style.commentAuthor}>Author: {comment.by}</p>
        <div dangerouslySetInnerHTML={createMarkup(comment.text)} className={style.text}></div>
        {comment.kids?.length > 0 && (
          <button
            className={cn({
              [style.hidden]: comment.kids === undefined || comment.kids.length === 0,
            })}
            onClick={
              comment.kids?.length > 0
                ? () => {
                    setVisible(prevState => !prevState);
                  }
                : undefined
            }
          >
            <span>Comments {comment.kids?.length}</span> <span>{visible ? '↑' : '↓'}</span>
          </button>
        )}
      </div>
      <div>
        {visible && (
          <div className={style.container}>
            <div className={style.innerContainer}>{comment.kids?.map((id: number, index: number) => <Comment key={index} id={id} />)}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default Comment;
