import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getErrorMessage, fetchTopStoriesApi} from '../api/Api';

export const baseAction = createAsyncThunk(
  'base/action',
  async ({}, thunkAPI) => {
    try {
      const res = await fetchTopStoriesApi();
      return res;
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

export const baseSlice = createSlice({
  name: 'base',
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
    [baseAction.pending]: (state, action) => {
      state.isFetching = true;
    },
    [baseAction.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    [baseAction.rejected]: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const {clearState} = baseSlice.actions;

const reducer = baseSlice.reducer;
export default reducer;
