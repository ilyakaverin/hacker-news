import React from "react";
import HackerNews from "./components/HackerNews";
import * as style from "./App.module.css";

const App = () => {
  return (
    <main className={style.main}>
      <h1>Hacker news</h1>
      <HackerNews />
    </main>
  );
};
export default App;
