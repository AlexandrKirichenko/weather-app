import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { TownListItem } from '../../../types/TownListItem';
import { FetchShowTownData } from '../types';
import { SLICE_NAME } from './types';

export const townSearchThunks = createAsyncThunk(
  `${SLICE_NAME}/townSearchThunks`,
  async (searchString: string) => {
    return api.weather.townSearch(searchString);
  },
);

export const fetchShowTownDataThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchShowTownData`,
  async (townListItem: TownListItem): Promise<FetchShowTownData> => {
    const townWeatherDataItem = await api.weather.fetchTownWeather(
      townListItem.lat,
      townListItem.lon,
    );

    return { townListItem, townWeatherDataItem };
  },
);
