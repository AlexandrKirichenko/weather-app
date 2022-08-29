import { Spin } from 'antd';
import { FC, useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { ModalWindow } from '../../../UIKit/ModalWindow';
import { TownSearchMainForm } from '../../townSearch/TownSearchMainForm';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { townListSlice } from '../townListSlice';
import { townListWeatherSlice } from '../townListWeatherSlice';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import { UPDATE_INTERVAL } from '../../../config';
import { MyTownMainForm } from '../../myTown/MyTownMainForm';
import './TownListMainForm.css';

export const TownListMainForm: FC = () => {
  // const [showTownSearchModalWindow, setShowTownSearchModalWindow] =
  //   useState<boolean>(false);
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

  const handleDeleteTownBtn = (id: string) => {
    dispatch(townListSlice.actions.deleteTownItem(id));
  };

  const handleOpenTownBtnClk = (id: string) => {
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
                  {/*<pre>{JSON.stringify(townItem, null, 2)}</pre>*/}
                </div>
                <div className="controlButtonWrap">
                  {/*<button onClick={() => handleDeleteTownBtn(townItem.id)}>*/}
                  {/*  delete*/}
                  {/*</button>*/}
                  <CloseOutlined
                    className="ico-del"
                    onClick={() => handleDeleteTownBtn(townItem.id)}
                  />
                  <button onClick={() => handleOpenTownBtnClk(townItem.id)}>
                    open
                  </button>
                </div>
                {!townWeatherDataItem && (
                  <Spin size="large" tip="Loading..."></Spin>
                )}
                {townWeatherDataItem && (
                  <>
                    {/*{JSON.stringify(townWeatherData[townItem.id], null, 2)}*/}
                    <div className="card__title">
                      {Math.round(townWeatherDataItem.main.temp - 273.15)}°
                    </div>
                    {/*<img*/}
                    {/*  alt="weather"*/}
                    {/*  className="weather-icon"*/}
                    {/*  src={`icons/${townWeatherDataItem?.weather[0]?.icon}.png`}*/}
                    {/*/>*/}
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
