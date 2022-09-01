import { createSlice } from '@reduxjs/toolkit';
import { RequestSliceStateProperty } from '../../../store/types';
import {
  makeRequestCaseToBuilder,
  makeRequestSliceStateProperty,
} from '../../../store/helpers';
import { FetchShowTownData, TownSearchRequestDataItem } from '../types';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  townSearchRequest: RequestSliceStateProperty<TownSearchRequestDataItem[]>;
  fetchShowTownDataRequest: RequestSliceStateProperty<FetchShowTownData>;
}

const initialState: InitialState = {
  townSearchRequest:
    makeRequestSliceStateProperty<TownSearchRequestDataItem[]>(),
  fetchShowTownDataRequest: makeRequestSliceStateProperty<FetchShowTownData>(),
};

export const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: (state) => {
      state.townSearchRequest.data = null;
      state.townSearchRequest.error = null;
    },
  },
  extraReducers: (builder) => {
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.townSearchThunks,
      'townSearchRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchShowTownDataThunk,
      'fetchShowTownDataRequest',
    );
  },
});
