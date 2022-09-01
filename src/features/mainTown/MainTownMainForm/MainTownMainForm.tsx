import { FC, useEffect, useState } from 'react';
import { Spin, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { mainTownSlice } from '../mainTownSlice';

import { MainTownDataView } from '../../townList/MainTownDataView';

const GEO_TIMEOUT = 3000;

export interface ItemDayInfo {
  icon_id: string;
  name: string;
  value: string;
}

export const MainTownMainForm: FC = () => {
  const dispatch = useAppDispatch();

  const fetchMyTownDataRequest = useAppSelector(
    mainTownSlice.selectors.getFetchMyTownDataRequest,
  );

  const data = fetchMyTownDataRequest.data;

  const [geoError, setGeoError] = useState<string | null>(null);
  const [geolocationIsLoading, setGeolocationIsLoading] =
    useState<boolean>(false);

  useEffect(() => {
    if (navigator.geolocation) {
      const geolocationPromise = new Promise((resolve, reject) => {
        setGeolocationIsLoading(true);
        setGeoError(null);
        const id = setTimeout(() => reject('geoTimeOut Error'), GEO_TIMEOUT);
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          clearTimeout(id);
          resolve(
            dispatch(
              mainTownSlice.thunks.fetchMyTownDataThunk({
                lat: coords.latitude,
                lon: coords.longitude,
              }),
            ),
          );
        });
      });
      geolocationPromise
        .then((response) => {
          setGeolocationIsLoading(false);
        })
        .catch((error) => {
          setGeolocationIsLoading(false);
          setGeoError(error);
          dispatch(mainTownSlice.actions.setIsNoAccessToGeolocation(true));
        });
    } else {
      setGeoError('Geolocation is not supported by this browser.');
    }

    return () => {
      dispatch(mainTownSlice.actions.clear());
    };
  }, []);

  return (
    <div>
      {geoError && <div>Please, select a city or enable geolocation</div>}
      {geolocationIsLoading && (
        <Spin size="large" tip="Requesting current coordinates..." />
      )}
      {data && <MainTownDataView townWeatherDataItem={data} />}
    </div>
  );
};
