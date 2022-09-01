import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
import { townListSlice } from '../features/townList/townListSlice';
import { townSearchSlice } from '../features/townSearch/townSearchSlice';
import { townListWeatherSlice } from '../features/townList/townListWeatherSlice';
import { mainTownSlice } from '../features/mainTown/mainTownSlice';
import { appSlice } from './app';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  townSearch: townSearchSlice.reducer,
  townList: townListSlice.reducer,
  townListWeather: townListWeatherSlice.reducer,
  mainTownSlice: mainTownSlice.reducer,
});

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: ['townList'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
