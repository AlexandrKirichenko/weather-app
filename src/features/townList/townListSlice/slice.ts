import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TownListItem } from '../../../types/TownListItem';
import { SLICE_NAME } from './types';

interface InitialState {
  townList: TownListItem[];
}

const initialState: InitialState = {
  townList: [],
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addTownListItem: (state, action: PayloadAction<TownListItem>) => {
      //делаем проверку, вдруг такой город уже есть в списке?
      const idx = state.townList.findIndex(
        (item) =>
          item.lat === action.payload.lat &&
          item.lon === action.payload.lon &&
          item.name === action.payload.name,
      );
      if (idx === -1) {
        state.townList.unshift(action.payload);
      }
    },
    deleteTownItem: (state, action: PayloadAction<string>) => {
      state.townList = state.townList.filter(
        (item) => item.id !== action.payload,
      );
    },
    setToFirst: (state, action: PayloadAction<string>) => {
      const findIdx = state.townList.findIndex(
        (item) => item.id === action.payload,
      );
      if (findIdx > 0) {
        const currentElement = state.townList[findIdx];
        state.townList = [
          currentElement,
          ...state.townList.filter((item) => item.id !== action.payload),
        ];
      }
    },
  },
});
