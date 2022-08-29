import { RootState } from '../../../store/types';
import { TownListItem } from '../../../types/TownListItem';

export const getTownList = (state: RootState): TownListItem[] =>
  state.townList.townList;
