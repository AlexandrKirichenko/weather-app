import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestSliceStateProperty } from '../../../store/types';
import {
  makeRequestCaseToBuilder,
  makeRequestSliceStateProperty,
} from '../../../store/helpers';
import { TownWeatherDataItem } from '../../../types/TownWeatherData';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  isNoAccessToGeolocation: boolean;
  fetchMyTownDataRequest: RequestSliceStateProperty<TownWeatherDataItem>;
}

const initialState: InitialState = {
  fetchMyTownDataRequest: makeRequestSliceStateProperty<TownWeatherDataItem>(),
  isNoAccessToGeolocation: false,
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setIsNoAccessToGeolocation: (state, action: PayloadAction<boolean>) => {
      state.isNoAccessToGeolocation = action.payload;
    },
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchMyTownDataThunk,
      'fetchMyTownDataRequest',
    );
  },
});
