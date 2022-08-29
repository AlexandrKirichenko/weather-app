import { createSlice } from '@reduxjs/toolkit';
import { RequestSliceStateProperty } from '../../../store/types';
import {
  makeRequestCaseToBuilder,
  makeRequestSliceStateProperty,
} from '../../../store/helpers';
import { TownWeatherDataItem } from '../../../types/TownWeatherData';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  fetchMyTownDataRequest: RequestSliceStateProperty<TownWeatherDataItem>;
}

const initialState: InitialState = {
  fetchMyTownDataRequest: makeRequestSliceStateProperty<TownWeatherDataItem>(),
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchMyTownDataThunk,
      'fetchMyTownDataRequest',
    );
  },
});
