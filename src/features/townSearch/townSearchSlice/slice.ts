import { createSlice } from '@reduxjs/toolkit';
import { RequestSliceStateProperty } from '../../../store/types';
import {
  makeRequestCaseToBuilder,
  makeRequestSliceStateProperty,
} from '../../../store/helpers';
import { TownSearchRequestDataItem } from '../types';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  townSearchRequest: RequestSliceStateProperty<TownSearchRequestDataItem[]>;
}

const initialState: InitialState = {
  townSearchRequest:
    makeRequestSliceStateProperty<TownSearchRequestDataItem[]>(),
};

export const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.townSearchThunks,
      'townSearchRequest',
    );
  },
});
