import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TownWeatherData,
  TownWeatherDataItem,
} from '../../../types/TownWeatherData';
import { RequestSliceStateProperty } from '../../../store/types';
import {
  makeRequestCaseToBuilder,
  makeRequestSliceStateProperty,
} from '../../../store/helpers';
import { FetchWeatherHistory } from '../../../types/FetchWeatherHistory';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  townWeatherData: TownWeatherData;

  fetchWeatherAllRequest: RequestSliceStateProperty<null>;
  fetchWeatherRequest: RequestSliceStateProperty<null>;
  fetchWeatherTownForIdRequest: RequestSliceStateProperty<null>;
  fetchWeatherHistoryRequest: RequestSliceStateProperty<FetchWeatherHistory>;
}

const initialState: InitialState = {
  townWeatherData: {},
  fetchWeatherAllRequest: makeRequestSliceStateProperty<null>(),
  fetchWeatherRequest: makeRequestSliceStateProperty<null>(),
  fetchWeatherTownForIdRequest: makeRequestSliceStateProperty<null>(),
  fetchWeatherHistoryRequest:
    makeRequestSliceStateProperty<FetchWeatherHistory>(),
};

interface AddTownWeatherDataItemPayload {
  townWeatherDataItem: TownWeatherDataItem;
  id: string;
}

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addTownWeatherDataItem: (
      state,
      action: PayloadAction<AddTownWeatherDataItemPayload>,
    ) => {
      const { townWeatherDataItem, id } = action.payload;

      state.townWeatherData[id] = townWeatherDataItem;
    },
    clear: (state) => {
      state.fetchWeatherHistoryRequest.data = null;
    },
  },
  extraReducers: (builder) => {
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchWeatherAllTownThunk,
      'fetchWeatherAllRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchWeatherTownThunk,
      'fetchWeatherRequest',
    );

    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchWeatherTownForIdThunk,
      'fetchWeatherTownForIdRequest',
    );

    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchWeatherHistoryThunk,
      'fetchWeatherHistoryRequest',
    );
  },
});
