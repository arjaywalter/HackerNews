import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage, fetchTopStoriesApi, fetchStoryApi, fetchAuthorApi } from '../api/Api';

export const getTopStories = createAsyncThunk(
  'story/topStories',
  async ({ }, thunkAPI) => {
    try {
      const storyIds = await fetchTopStoriesApi();
      const stories = await Promise.all(storyIds.map(async id => {
        const story = await fetchStoryApi({ id });
        return story;
      }));

      const storiesWithAuthor = await Promise.all(stories.map(async story => {
        const author = await fetchAuthorApi({ username:story.by });
        return {...author, ...story};
      }));

      return storiesWithAuthor.sort((a,b) => a.score-b.score);
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  data: [],
};

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      return state;
    },
  },
  extraReducers: {
    [getTopStories.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getTopStories.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    [getTopStories.rejected]: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { clearState } = storySlice.actions;

const reducer = storySlice.reducer;
export default reducer;
