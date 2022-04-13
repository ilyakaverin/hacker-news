import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './hackernews.ts';

export default configureStore({
  reducer: {
    news: newsReducer,
  },
});
