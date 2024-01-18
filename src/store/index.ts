import { configureStore } from '@reduxjs/toolkit';
import { hackerNewsApi } from '../api';

const store  =  configureStore({
  reducer: {
    [hackerNewsApi.reducerPath]: hackerNewsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hackerNewsApi.middleware),
});
export default store
