import * as style from "./style.module.css";
import { useState } from "react";
import cn from "classnames";
import Loader from "../Loader/Loader";
import { processDeletedComments } from "../../service";
import React from "react";

interface Story {
  text: string;
  by: string;
  kids: Array<number>;
}

const Comment = ({ text, by, kids }: Story) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const createMarkup = (text: string) => ({ __html: text });

  const handle = async () => {
    setLoading(true);
    const comments = kids.map(async (id: number) => {
      return await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      ).then((res) => res.json());
    });
    const promise = Promise.all(comments);
    promise.then((res) => {
      const filtered = res.map(processDeletedComments);
      setComments(filtered);
      setLoading(false);
    });
  };

  return (
    <>
      <div className={style.commentContainer}>
        <p className={style.commentAuthor}>Author: {by}</p>
        <div
          dangerouslySetInnerHTML={createMarkup(text)}
          className={style.text}
        ></div>
        <button
          className={cn(
            { [style.pressed]: comments.length > 0 },
            { [style.hidden]: kids === undefined || kids.length === 0 }
          )}
          onClick={() => handle()}
        >
          {loading ? <Loader /> : "Comments"}
        </button>
      </div>
      <div>
        <div className={style.container}>
          {comments.map((i, index) => (
            <div key={index} className={style.innerContainer}>
              <p className={style.commentAuthor}>Author: {i.by}</p>
              <div
                dangerouslySetInnerHTML={createMarkup(i.text)}
                className={style.text}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Comment;
