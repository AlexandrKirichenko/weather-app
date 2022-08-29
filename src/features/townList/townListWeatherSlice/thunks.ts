import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { delay } from '../../../utils/delay';
import { RootState } from '../../../store/types';
import { TownListItem } from '../../../types/TownListItem';
import { SLICE_NAME } from './types';
import { actions } from './slice';

export const fetchWeatherAllTownThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchWeatherAllThunk`,
  async (_, { dispatch, getState }) => {
    const townList = (getState() as RootState).townList.townList;
    console.log(townList);
    for (let i = 0; i < townList.length; i++) {
      const townItem = townList[i];
      if (townItem) {
        const townWeatherDataItem = await api.weather.fetchTownWeather(
          townItem.lat,
          townItem.lon,
        );
        await delay(200);
        dispatch(
          actions.addTownWeatherDataItem({
            townWeatherDataItem,
            id: townItem.id,
          }),
        );
      }
    }

    return null;
  },
);

export const fetchWeatherTownThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchWeatherThunk`,
  async (townListItem: TownListItem, { dispatch }) => {
    const townWeatherDataItem = await api.weather.fetchTownWeather(
      townListItem.lat,
      townListItem.lon,
    );
    dispatch(
      actions.addTownWeatherDataItem({
        townWeatherDataItem,
        id: townListItem.id,
      }),
    );

    return null;
  },
);

export const fetchWeatherTownForIdThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchWeatherTownForIdThunk`,
  async (townListItemId: string, { dispatch, getState }) => {
    const townList = (getState() as RootState).townList.townList;
    const townListItem = townList.find((item) => item.id === townListItemId);
    if (!townListItem) {
      return null;
    }
    const townWeatherDataItem = await api.weather.fetchTownWeather(
      townListItem.lat,
      townListItem.lon,
    );
    dispatch(
      actions.addTownWeatherDataItem({
        townWeatherDataItem,
        id: townListItem.id,
      }),
    );

    return null;
  },
);

export const fetchWeatherHistoryThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchWeatherHistory`,
  async (townListItemId: string, { getState }) => {
    const townList = (getState() as RootState).townList.townList;
    const townListItem = townList.find((item) => item.id === townListItemId);
    if (!townListItem) {
      return null;
    }

    return api.weather.fetchWeatherHistory(townListItem.lat, townListItem.lon);
  },
);
