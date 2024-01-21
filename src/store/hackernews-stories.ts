import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  currentStories: number[];
  allStories: number[][];
}

export interface IStore {
  stories: IState;
}

const dataSlice = createSlice({
  name: 'stories',
  initialState: {
    currentStories: [],
    allStories: [],
  },
  reducers: {
    setData: (state: IState, action) => ({
      ...state,
      currentStories: action.payload[0],
      allStories: action.payload,
    }),
    showMore: (state, action) => ({
      ...state,
      currentStories: action.payload,
    }),
  },
});

export const { setData, showMore } = dataSlice.actions;
export default dataSlice.reducer;
