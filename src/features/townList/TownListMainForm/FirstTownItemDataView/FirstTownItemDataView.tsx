import { FC } from 'react';
import { TownListItem } from '../../../../types/TownListItem';
import {
  TownWeatherData,
  TownWeatherDataItem,
} from '../../../../types/TownWeatherData';
import { MainTownDataView } from '../../MainTownDataView';

interface FirstTownItemDataViewProps {
  townList: TownListItem[];
  townWeatherData: TownWeatherData;
}

export const FirstTownItemDataView: FC<FirstTownItemDataViewProps> = ({
  townList,
  townWeatherData,
}) => {
  const townListItem = townList[0];

  if (!townListItem) {
    return null;
  }

  const townWeatherDataItem: TownWeatherDataItem =
    townWeatherData[townListItem.id];

  if (!townWeatherDataItem) {
    return null;
  }

  const finalTownWeatherDataItem: TownWeatherDataItem = {
    ...townWeatherDataItem,
    name: townListItem.name,
  };

  return <MainTownDataView townWeatherDataItem={finalTownWeatherDataItem} />;
};
