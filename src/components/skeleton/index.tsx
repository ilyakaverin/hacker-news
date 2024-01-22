import React from 'react';
import style from './style.module.css';

const Skeleton: React.FC = () => {
  return [...Array(15)].map(() => <div key={Math.random()} className={style.skeleton_author}></div>);
};
export default Skeleton;
