import { configureStore } from '@reduxjs/toolkit';
import { hackerNewsApi } from 'api';
import dataReducer from './hackernews-stories';

const store = configureStore({
  reducer: {
    stories: dataReducer,
    [hackerNewsApi.reducerPath]: hackerNewsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(hackerNewsApi.middleware),
});
export default store;
