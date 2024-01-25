import { Button } from 'components/atomic/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as style from './style.module.css';
import cn from 'classnames';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={style.notFound_container}>
      <div className={style.tardis}>
        <audio autoPlay src="assets/audio/Tardis-sound.mp3"></audio>
        <img src="assets/images/8bit-TARDIS.png" alt="" className={cn(style.alignnone, style.tardis, style.no_border)} width="300" />
      </div>
      <Button onClick={() => navigate('/')}>Back to Main</Button>
    </div>
  );
};
export default NotFound;
