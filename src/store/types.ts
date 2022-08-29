import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { rootReducer, store } from './store';

export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface RequestError {
  responseData: AxiosResponse | null;
  errorMsg: string;
}

export interface RequestSliceStateProperty<T = unknown> {
  data: T | null;
  error: RequestError | null;
  isLoading: boolean;
}
