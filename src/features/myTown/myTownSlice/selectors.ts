import { RequestSliceStateProperty, RootState } from '../../../store/types';
import { TownWeatherDataItem } from '../../../types/TownWeatherData';

export const getFetchMyTownDataRequest = (
  state: RootState,
): RequestSliceStateProperty<TownWeatherDataItem> =>
  state.myTownSlice.fetchMyTownDataRequest;
