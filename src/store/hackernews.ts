import { createSlice } from "@reduxjs/toolkit";
import { sliceIntoChunks } from "../service";

interface Action {
  payload: "object";
}

interface State {
  name: string;
  news: any;
  data: ConcatArray<object>;
  isLoading: boolean;
  commentsLoading: boolean;
  current: object;
}
export const slice = createSlice({
  name: "news",
  initialState: {
    isLoading: null,
    commentsLoading: false,
    nextChunkLoading: false,
    newsIDs: [],
    data: [],
    current: [],
    comments: [],
    error: null,
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
    fetchNewsIDs: (state: State, action: Action) => ({
      ...state,
      newsIDs: action.payload,
    }),
    fetchComments: (state: State) => ({
      ...state,
      commentsLoading: true,
    }),
    fetchNewsResolve: (state: State, action: Action) => ({
      ...state,
      isLoading: false,
      nextChunkLoading: false,
      data: state.data.concat(action.payload),
    }),
    fetchNewsReject: (state: State, action: Action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),
    fetchCommentsResolve: (state: State, action: Action) => ({
      ...state,
      commentsLoading: false,
      comments: action.payload,
    }),
    fetchCurrentResolve: (state: State, action: Action) => ({
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
} = slice.actions;

export const newsLoading = (state: State) => state.news.isLoading;
export const newsData = (state: State) => state.news.data;
export const storyData = (state: State) => state.news.current;
export const commentsData = (state: State) => state.news.comments;
export const commentsLoading = (state: State) => state.news.commentsLoading;
export const newsIDs = (state: State) => state.news.newsIDs;
export const loadedChunk = (state: State) => state.news.nextChunkLoading;

export const getNews =
  (id: number) => async (dispatch: Function, getState: Function) => {
    dispatch(fetchChunk());
    const hackernewsData = newsIDs(getState());
    const result = hackernewsData[id].map(async (id: number) => {
      return await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      ).then((res) => res.json());
    });
    const promise = Promise.all(result);
    promise
      .then((res) => {
        dispatch(fetchNewsResolve(res));
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
