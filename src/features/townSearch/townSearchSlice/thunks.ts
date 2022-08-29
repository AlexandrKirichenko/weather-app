import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { SLICE_NAME } from './types';

export const townSearchThunks = createAsyncThunk(
  `${SLICE_NAME}/townSearchThunks`,
  async (searchString: string) => {
    return api.weather.townSearch(searchString);
  },
);
