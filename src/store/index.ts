import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './hackernews';

const store  =  configureStore({
  reducer: {
    news: newsReducer,
  },
});
export default store