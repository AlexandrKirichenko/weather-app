import { AxiosRequestConfig } from 'axios';
import { TownSearchRequestDataItem } from '../features/townSearch/types';
import { TownWeatherDataItem } from '../types/TownWeatherData';
import { FetchWeatherHistory } from '../types/FetchWeatherHistory';
import { requestExecutorCreator } from './helpers';
import { API_DEFAULT_REQUEST_HEADERS, BASE_URL } from './config';

const requestExecutor = requestExecutorCreator(
  BASE_URL,
  API_DEFAULT_REQUEST_HEADERS,
);

export const townSearch = async (
  searchString: string,
): Promise<TownSearchRequestDataItem[]> => {
  const requestConfig: AxiosRequestConfig = {
    url: '/geo/1.0/direct',
    method: 'get',
    params: {
      q: searchString,
      limit: 0,
    },
  };

  const response = await requestExecutor<TownSearchRequestDataItem[]>(
    requestConfig,
  );

  return response.data;
};

export const fetchTownWeather = async (
  lat: number,
  lon: number,
): Promise<TownWeatherDataItem> => {
  const requestConfig: AxiosRequestConfig = {
    url: '/data/2.5/weather',
    method: 'get',
    params: {
      lat,
      lon,
    },
  };

  const response = await requestExecutor<TownWeatherDataItem>(requestConfig);
  return response.data;
};

export const fetchWeatherHistory = async (
  lat: number,
  lon: number,
): Promise<FetchWeatherHistory> => {
  const requestConfig: AxiosRequestConfig = {
    url: 'data/2.5/onecall',
    method: 'get',
    params: {
      lat,
      lon,
      units: 'metric',
    },
  };

  const response = await requestExecutor<FetchWeatherHistory>(requestConfig);
  return response.data;
};
