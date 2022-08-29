import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';

import { API_TOKEN } from './config';

export const requestExecutorCreator =
  (baseUrl: string, apiDefaultRequestHeaders: AxiosRequestHeaders) =>
  async <T = unknown>(
    requestConfig: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    const headers: AxiosRequestHeaders = {
      ...requestConfig.headers,
      ...apiDefaultRequestHeaders,
    };

    const finalRequestConfig: AxiosRequestConfig = {
      ...requestConfig,
      baseURL: baseUrl,
      headers,
      params: { ...requestConfig.params, appid: API_TOKEN },
    };

    return axios.request<T>(finalRequestConfig);
  };
