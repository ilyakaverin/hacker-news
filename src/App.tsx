import React from 'react';
import MainPage from './components/MainPage/MainPage';
import * as style from './App.module.css';

const App: React.FC = () => {
  return (
    <main className={style.main}>
      <h1>Hacker news</h1>
      <MainPage />
    </main>
  );
};
export default App;
