import { RequestSliceStateProperty, RootState } from '../../../store/types';
import { TownWeatherData } from '../../../types/TownWeatherData';
import { FetchWeatherHistory } from '../../../types/FetchWeatherHistory';

export const getTownWeatherData = (state: RootState): TownWeatherData =>
  state.townListWeather.townWeatherData;

export const getFetchWeatherAllRequest = (
  state: RootState,
): RequestSliceStateProperty<null> =>
  state.townListWeather.fetchWeatherAllRequest;

export const getFetchWeatherHistory = (
  state: RootState,
): RequestSliceStateProperty<FetchWeatherHistory> =>
  state.townListWeather.fetchWeatherHistoryRequest;
