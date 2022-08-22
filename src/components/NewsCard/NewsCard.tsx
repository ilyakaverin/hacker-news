import * as style from "./style.module.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import cn from "classnames";


const newsCard = ({ title, by, date, href, id, descendants }: any) => {

  return (
    <div className={style.card}>
      <div className={style.by}>by {by} 
      <div className={style.time}>
        {format(new Date(date * 1000), "dd MMMM yyyy H:mm")}
      </div>
      </div>
      <a href={href} className={cn(style.title, {[style.href] : href !== undefined})} target="_blank">
        {title}
      </a>
      <Link
        to={`/story/${id}`}
        className={cn(style.href, style.comments, { [style.hidden]: !descendants })}
      >
        Comments
      </Link>
    </div>
  );
};

export default newsCard;
