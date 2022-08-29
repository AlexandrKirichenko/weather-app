import { RequestSliceStateProperty, RootState } from '../../../store/types';
import { TownSearchRequestDataItem } from '../types';

export const getTownSearchRequest = (
  state: RootState,
): RequestSliceStateProperty<TownSearchRequestDataItem[]> =>
  state.townSearch.townSearchRequest;
