import { createSlice } from "@reduxjs/toolkit";
import { sliceIntoChunks } from "../service";
import { HackerNewsState, News, State } from '../interfaces';
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";



export const slice = createSlice({
  name: "news",
  initialState: {
    isLoading: null,
    commentsLoading: false,
    nextChunkLoading: false,
    isDisabledRefresh: false,
    newsIDs: [],
    data: [],
    current: [],
    comments: [],
    error: null,
    currentNewsChunk: 0,
  },
  reducers: {
    fetchData: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    fetchChunk: (state: State) => ({
      ...state,
      nextChunkLoading: true,
    }),
    fetchNewsIDs: (state: State, action: PayloadAction) => ({
      ...state,
      newsIDs: action.payload,
    }),
    fetchComments: (state: State) => ({
      ...state,
      commentsLoading: true,
    }),
    fetchNewsResolve: (state: State, action: PayloadAction<News[]>) => ({
      ...state,
      isLoading: false,
      nextChunkLoading: false,
      data: [...state.data, ...action.payload],
    }),
    fetchNewsReject: (state: State, action: PayloadAction) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),
    fetchCommentsResolve: (state: State, action: PayloadAction) => ({
      ...state,
      commentsLoading: false,
      comments: action.payload,
    }),
    fetchCurrentResolve: (state: State, action: PayloadAction) => ({
      ...state,
      isLoading: false,
      current: action.payload,
    }),
    clearCurrent: (state: State) => ({
      ...state,
      comments: [],
      current: [],
    }),
    clearNews: (state: State) => ({
      ...state,
      data: [],
    }),
    clearNewsIDs: (state: State) => ({
      ...state,
      newsIDs: [],
    }),
    disableRefresh: (state: State) =>({
      ...state,
      isDisabledRefresh: true
    }),
    enableRefresh: (state: State) =>({
      ...state,
      isDisabledRefresh: false
    }),
    loadNextChunk: (state: State, action: PayloadAction) =>({
      ...state,
      currentNewsChunk: action.payload
    }),
  },
});

export const {
  fetchData,
  fetchComments,
  fetchNewsResolve,
  fetchNewsReject,
  fetchCommentsResolve,
  fetchCurrentResolve,
  clearCurrent,
  fetchNewsIDs,
  clearNews,
  fetchChunk,
  clearNewsIDs,
  disableRefresh,
  enableRefresh,
  loadNextChunk
} = slice.actions;

export const newsLoading = (state: HackerNewsState) => state.news.isLoading;
export const newsData = (state: HackerNewsState) => state.news.data;
export const storyData = (state: HackerNewsState) => state.news.current;
export const commentsData = (state: HackerNewsState) => state.news.comments;
export const commentsLoading = (state: HackerNewsState) => state.news.commentsLoading;
export const newsIDs = (state: HackerNewsState) => state.news.newsIDs;
export const loadedChunk = (state: HackerNewsState) => state.news.nextChunkLoading;
export const isDisabledRefresh = (state: HackerNewsState) => state.news.isDisabledRefresh;
export const currentNewsChunk = (state: HackerNewsState) => state.news.currentNewsChunk;

export const getNews =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(fetchChunk());
    const hackernewsData = newsIDs(getState());
    const id = currentNewsChunk(getState());

    const result = hackernewsData[id].map(async (id: number) => {
      return await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      ).then((res) => res.json());
    });
    const promise = Promise.all(result);
    promise
      .then((res) => {
        dispatch(fetchNewsResolve(res));
        dispatch(enableRefresh());
      })
      .catch((e) => dispatch(fetchNewsReject(e)));
  };
export const refreshNews = () => (dispatch: Function) => {
  dispatch(fetchData());
  dispatch(clearNews());

};
export const getNewsIDs = () => async (dispatch: Function) => {
  dispatch(fetchData());
  const hackernewsData = await fetch(
    'https://hacker-news.firebaseio.com/v0/beststories.json?&orderBy="$key"&limitToFirst=100'
  ).then((res) => res.json());
  const chunk = sliceIntoChunks(hackernewsData, 12);
  dispatch(fetchNewsIDs(chunk));
};

export const getCurrentStory = (id: number) => async (dispatch: Function) => {
  dispatch(fetchData());
  const story = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  ).then((res) => res.json());
  dispatch(fetchCurrentResolve(story));
};
export const getCurrentComments =
  () => async (dispatch: Function, getState: Function) => {
    const story = storyData(getState());

    dispatch(fetchComments());
    const comments = story.kids.map(async (id: number) => {
      return await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      ).then((res) => res.json());
    });
    const promise = Promise.all(comments);
    promise.then((res) => {
      const filtered = res.filter(
        (i: any) => i !== null && !i.deleted && !i.dead
      );
      dispatch(fetchCommentsResolve(filtered));
    });
  };
export default slice.reducer;
