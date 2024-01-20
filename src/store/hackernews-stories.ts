import { createSlice } from '@reduxjs/toolkit';

export interface IStore {
  currentStories: number[];
  allStories: number[];
}

const dataSlice = createSlice({
  name: 'stories',
  initialState: {
    currentStories: [],
    allStories: [],
  },
  reducers: {
    setData: (state: IStore, action) => ({
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
