import { Spin, Tooltip } from 'antd';
import { FC, useEffect, useState, MouseEvent } from 'react';
import { CloseOutlined, RightSquareOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { townListSlice } from '../townListSlice';
import { townListWeatherSlice } from '../townListWeatherSlice';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import { UPDATE_INTERVAL } from '../../../config';
import { MainTownMainForm } from '../../mainTown/MainTownMainForm';
import './TownListMainForm.css';

import { mainTownSlice } from '../../mainTown/mainTownSlice';
import { townSearchSlice } from '../../townSearch/townSearchSlice';
import { FirstTownItemDataView } from './FirstTownItemDataView';
import { SearchTownItemDataView } from './SearchTownItemDataView';

export const TownListMainForm: FC = () => {
  const dispatch = useAppDispatch();

  const townList = useAppSelector(townListSlice.selectors.getTownList);

  const townWeatherData = useAppSelector(
    townListWeatherSlice.selectors.getTownWeatherData,
  );

  const isNoAccessToGeolocation = useAppSelector(
    mainTownSlice.selectors.getIsNoAccessToGeolocation,
  );

  const [mode, setMode] = useState<
    'showFirstTownItem' | 'showStartInfo' | 'showSearchTown'
  >('showStartInfo');

  const fetchShowTownDataRequest = useAppSelector(
    townSearchSlice.selectors.getFetchShowTownData,
  );

  useEffect(() => {
    if (fetchShowTownDataRequest.data) {
      setMode('showSearchTown');
    }
  }, [fetchShowTownDataRequest]);

  useEffect(() => {
    const fetch = () => {
      dispatch(townListWeatherSlice.thunks.fetchWeatherAllTownThunk());
    };
    fetch();
    const intervalId = setInterval(fetch, UPDATE_INTERVAL);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (isNoAccessToGeolocation && townList.length > 0) {
      setMode('showFirstTownItem');
    }
  }, [isNoAccessToGeolocation]);

  useEffect(() => {
    if (townList.length === 0) {
      setMode('showStartInfo');
    }
  }, [townList]);

  const handleDeleteTown = (id: string) => {
    dispatch(townListSlice.actions.deleteTownItem(id));
  };

  const handleOpenTownBtn = (id: string) => {
    const path = getRoutePath('TownListItemPage', id);
    dispatch(appSlice.actions.redirect(path));
  };

  const handleFavoriteTownItemTitleClk = (
    e: MouseEvent<HTMLElement>,
    townItemId: string,
  ) => {
    e.preventDefault();
    setMode('showFirstTownItem');
    dispatch(townListSlice.actions.setToFirst(townItemId));
  };

  return (
    <div>
      <div className="container__list-form">
        <div>
          {mode === 'showStartInfo' && <MainTownMainForm />}{' '}
          {mode === 'showFirstTownItem' && (
            <FirstTownItemDataView
              townList={townList}
              townWeatherData={townWeatherData}
            />
          )}
          {mode === 'showSearchTown' && fetchShowTownDataRequest.data && (
            <SearchTownItemDataView
              townListItem={fetchShowTownDataRequest.data.townListItem}
              townWeatherDataItem={
                fetchShowTownDataRequest.data.townWeatherDataItem
              }
            />
          )}
        </div>

        <div className="cardList">
          {townList.map((townItem) => {
            const townWeatherDataItem = townWeatherData[townItem.id];

            return (
              <div
                className="card"
                key={townItem.id}
                onClick={(e) => handleFavoriteTownItemTitleClk(e, townItem.id)}
              >
                <div className="cardTitle">{townItem.name}</div>
                <div className="controlButtonWrap">
                  <Tooltip title="Delete town from saved" color="#8b9dc3">
                    <CloseOutlined
                      className="ico-del"
                      onClick={() => handleDeleteTown(townItem.id)}
                    />
                  </Tooltip>
                  <Tooltip title="Open more weather info" color="#8b9dc3">
                    <RightSquareOutlined
                      className="ico-open"
                      onClick={() => handleOpenTownBtn(townItem.id)}
                    />
                  </Tooltip>
                </div>
                {!townWeatherDataItem && <Spin size="large" tip="Loading..." />}
                {townWeatherDataItem && (
                  <>
                    <div className="position-control">
                      <div className="card__title">
                        {Math.round(townWeatherDataItem.main.temp - 273.15)}°
                      </div>
                      <div className="card__subtitle">
                        Feels like:{' '}
                        {Math.round(
                          townWeatherDataItem.main.feels_like - 273.15,
                        )}
                        °
                      </div>
                    </div>
                    <div className="card__desc">
                      {townWeatherDataItem.weather[0]?.description}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
