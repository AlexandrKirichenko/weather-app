import { FC } from 'react';
import { TownListItem } from '../../../../types/TownListItem';
import { TownWeatherDataItem } from '../../../../types/TownWeatherData';
import { MainTownDataView } from '../../MainTownDataView';

interface SearchTownItemDataViewProps {
  townListItem: TownListItem;
  townWeatherDataItem: TownWeatherDataItem;
}

export const SearchTownItemDataView: FC<SearchTownItemDataViewProps> = ({
  townWeatherDataItem,
  townListItem,
}) => {
  const finalTownWeatherDataItem: TownWeatherDataItem = {
    ...townWeatherDataItem,
    name: townListItem.name,
  };

  return <MainTownDataView townWeatherDataItem={finalTownWeatherDataItem} />;
};
