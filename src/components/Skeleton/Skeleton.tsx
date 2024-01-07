import React from 'react';
import style from './style.module.css';

const Skeleton = () => {
    return (
        <>
        {
            [...Array(110)].map(() => ( 
                <div className={style.skeleton_author}></div>
            ))
        }
        </>
    )
}
export default Skeleton;
