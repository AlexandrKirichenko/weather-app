import { RequestSliceStateProperty, RootState } from '../../../store/types';
import { FetchShowTownData, TownSearchRequestDataItem } from '../types';

export const getTownSearchRequest = (
  state: RootState,
): RequestSliceStateProperty<TownSearchRequestDataItem[]> =>
  state.townSearch.townSearchRequest;

export const getFetchShowTownData = (
  state: RootState,
): RequestSliceStateProperty<FetchShowTownData> =>
  state.townSearch.fetchShowTownDataRequest;
