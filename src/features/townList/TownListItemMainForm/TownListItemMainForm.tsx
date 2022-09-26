import { ArrowLeftOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { UPDATE_INTERVAL } from '../../../config';
import { townListWeatherSlice } from '../townListWeatherSlice';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import './TownListItemMainForm.css';

export const TownListItemMainForm: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const fetchWeatherHistoryRequest = useAppSelector(
    townListWeatherSlice.selectors.getFetchWeatherHistory,
  );

  useEffect(() => {
    const fetch = () => {
      if (id) {
        dispatch(townListWeatherSlice.thunks.fetchWeatherHistoryThunk(id));
      }
    };
    fetch();

    const intervalId = setInterval(fetch, UPDATE_INTERVAL);
    return () => {
      clearInterval(intervalId);
      dispatch(townListWeatherSlice.actions.clear());
    };
  }, []);

  const handleReturnToTownListBtn = () => {
    const path = getRoutePath('TownListPage');
    dispatch(appSlice.actions.redirect(path));
  };

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return (
    <div className="townListITemWrap">
      <Tooltip title="Back to town list" color="#8b9dc3">
        <ArrowLeftOutlined
          className="ico-back"
          onClick={handleReturnToTownListBtn}
        />
      </Tooltip>
      {fetchWeatherHistoryRequest.data && (
        <div className="weatherForecast">
          {fetchWeatherHistoryRequest.data.daily.map((el: any) => (
            <div
              key={el.dt}
              className="this__day_info this__day_info__forecast"
            >
              <div className="weatherForecast__main">
                <div className="item__date">
                  <span>{days[`${new Date(el.dt * 1000).getDay()}`]}</span>
                  {new Date(el.dt * 1000).toLocaleString().slice(0, 5)}
                </div>
                <div className="weatherForecast__temperature">
                  {Math.round(el.temp.day)}°
                </div>
                <img
                  alt="weather"
                  className="weather-icon"
                  src={`../icons/${el.weather[0].icon}.png`}
                />
                <div className="weatherForecast__desc">
                  {el.weather[0].description}
                </div>
              </div>
              <div>
                <div className="this__day_info_items">
                  <div className="item">
                    <div className="ico-circle">
                      <span className="span-1"></span>
                    </div>
                    <div className="indicator__name">Temperature</div>
                    <div className="indicator__value">
                      <span className="indicator__value indicator__value--dark">
                        {Math.round(el.temp.day)}° - Feels like{' '}
                        {Math.round(el.feels_like.day)}
                        °C
                      </span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="ico-circle">
                      <span className="span-2"></span>
                    </div>
                    <div className="indicator__name">Pressure</div>
                    <div className="indicator__value">
                      <span className="indicator__value indicator__value--dark">
                        {el.pressure} hPa
                      </span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="ico-circle">
                      <span className="span-3"></span>
                    </div>
                    <div className="indicator__name">Humidity</div>
                    <div className="indicator__value">
                      <span className="indicator__value indicator__value--dark">
                        {el.humidity}%{' '}
                        {el.humidity > 70 ? '- High' : '- Normal'}
                      </span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="ico-circle">
                      <span className="span-4"></span>
                    </div>
                    <div className="indicator__name">Wind</div>
                    <div className="indicator__value">
                      <span className="indicator__value indicator__value--dark">
                        {el.wind_speed} m/s
                      </span>
                    </div>
                  </div>
                </div>
                <img
                  className="cloud__img"
                  src="../img/cloud.png"
                  alt="cloud"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
