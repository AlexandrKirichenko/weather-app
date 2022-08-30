import { Spin, Tooltip } from 'antd';
import { FC, useEffect, useState } from 'react';
import { CloseOutlined, RightSquareOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { townListSlice } from '../townListSlice';
import { townListWeatherSlice } from '../townListWeatherSlice';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import { UPDATE_INTERVAL } from '../../../config';
import { MyTownMainForm } from '../../myTown/MyTownMainForm';
import './TownListMainForm.css';

export const TownListMainForm: FC = () => {
  const dispatch = useAppDispatch();

  const townList = useAppSelector(townListSlice.selectors.getTownList);

  const townWeatherData = useAppSelector(
    townListWeatherSlice.selectors.getTownWeatherData,
  );

  useEffect(() => {
    const fetch = () => {
      dispatch(townListWeatherSlice.thunks.fetchWeatherAllTownThunk());
    };
    fetch();
    console.log('TownListMainForm timeOut start');
    const intervalId = setInterval(fetch, UPDATE_INTERVAL);
    return () => {
      console.log('TownListMainForm timeOut stop');
      clearInterval(intervalId);
    };
  }, []);

  const handleDeleteTown = (id: string) => {
    dispatch(townListSlice.actions.deleteTownItem(id));
  };

  const handleOpenTownBtn = (id: string) => {
    const path = getRoutePath('TownListItemPage', id);
    dispatch(appSlice.actions.redirect(path));
  };

  return (
    <div>
      <div className="container__list-form">
        <div>
          <MyTownMainForm />
        </div>
        <div className="cardList">
          {townList.map((townItem) => {
            const townWeatherDataItem = townWeatherData[townItem.id];

            return (
              <div className="card" key={townItem.id}>
                <div className="cardTitle">
                  <span>{townItem.name}</span>
                </div>
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
                {!townWeatherDataItem && (
                  <Spin size="large" tip="Loading..."></Spin>
                )}
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
