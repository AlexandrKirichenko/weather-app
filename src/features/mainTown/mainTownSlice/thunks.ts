import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { SLICE_NAME } from './types';

interface FetchMyTownDataPayload {
  lat: number;
  lon: number;
}

export const fetchMyTownDataThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchMyTownData`,
  async ({ lat, lon }: FetchMyTownDataPayload) => {
    return api.weather.fetchTownWeather(lat, lon);
  },
);
