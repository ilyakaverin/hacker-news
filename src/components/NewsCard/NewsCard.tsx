import * as style from "./style.module.css";
import { Link } from "react-router-dom";
import cn from "classnames";
import dayjs from 'dayjs';
import React from "react";


const newsCard = ({ title, by, date, href, id, descendants }: any) => {

  return (
    <div className={style.card}>
      <a href={href} className={cn(style.title, {[style.href] : href !== undefined})} target="_blank">
        {title}
      </a>
      <div className={style.by}>by {by} 
      <div className={style.time}>
        {dayjs(date).format()}
      </div>
      <Link
        to={`/story/${id}`}
        className={cn(style.href, style.comments, { [style.hidden]: !descendants })}
      >
        Comments
      </Link>
      </div>
    </div>
  );
};

export default newsCard;
