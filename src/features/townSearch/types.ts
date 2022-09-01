import { TownListItem } from '../../types/TownListItem';
import { TownWeatherDataItem } from '../../types/TownWeatherData';

export interface TownSearchRequestDataItem {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface FetchShowTownData {
  townListItem: TownListItem;
  townWeatherDataItem: TownWeatherDataItem;
}
