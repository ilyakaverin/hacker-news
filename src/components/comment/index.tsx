import * as style from './style.module.css';
import React, { useState } from 'react';
import { useHackerNewsApiGetItemQuery } from 'api';
import { createMarkup } from 'service';
import { Button } from 'components/atomic/button';

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

  const handleClick =
    comment.kids?.length > 0
      ? () => {
          setVisible(prevState => !prevState);
        }
      : () => {};

  if (comment.deleted) return null;

  const isHiddenButton = comment.kids === undefined || comment.kids.length === 0;

  return (
    <>
      <div className={style.commentContainer}>
        <p className={style.commentAuthor}>Author: {comment.by}</p>
        <div dangerouslySetInnerHTML={createMarkup(comment.text)} className={style.text}></div>
        {comment.kids?.length > 0 && (
          <Button onClick={handleClick} className={isHiddenButton ? style.hidden : ''}>
            Comments
            {
              <>
                <span>{comment.kids?.length}</span>
                <span>{visible ? '↑' : '↓'}</span>
              </>
            }
          </Button>
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
