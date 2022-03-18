import * as style from "./style.module.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import cn from "classnames";

const newsCard = ({ title, by, date, rating, href, id, descendants }: any) => {
  return (
    <div className={style.card}>
      <div className={style.by}>by {by}</div>
      <a href={href} className={cn(style.title, {[style.href] : href !== undefined})}>
        {title}
      </a>
      <div className={style.time}>
        {format(new Date(date * 1000), "dd MMMM yyyy H:mm")}
      </div>
      <div>Rating: {rating}</div>
      <Link
        to={`/story/${id}`}
        className={cn(style.href, { [style.hidden]: !descendants })}
      >
        Comments
      </Link>
    </div>
  );
};

export default newsCard;
