import { Typography } from 'antd';
import { FC } from 'react';
import { TownWeatherDataItem } from '../../../types/TownWeatherData';
import './MainTownDataView.css';

import 'antd/dist/antd.css';

const { Title } = Typography;

interface MainTownDataViewerProps {
  townWeatherDataItem: TownWeatherDataItem;
}

export const MainTownDataView: FC<MainTownDataViewerProps> = ({
  townWeatherDataItem,
}) => {
  const data = townWeatherDataItem;

  return (
    <>
      <div className="form-wrapper">
        <div className="this-day">
          <div className="this-day--main">
            <div className="flex-block">
              <div className="this-day__title">
                <Title
                  level={5}
                  style={{
                    color: '#4793FF',
                    fontSize: '6em',
                    fontWeight: '500',
                    margin: '0px',
                    lineHeight: '1',
                  }}
                  className="temperature"
                >
                  {Math.round(data.main.temp - 273.15)}°
                </Title>
                <Title
                  level={5}
                  style={{
                    fontSize: '3em',
                    fontWeight: '400',
                    margin: '0px',
                    lineHeight: '1',
                  }}
                  className="this-day__title"
                >
                  Today
                </Title>
              </div>
              <img
                alt="weather"
                className="weather-icon"
                src={`icons/${data?.weather[0]?.icon}.png`}
              />
            </div>
            <Title
              level={5}
              style={{
                fontSize: '1.7em',
                fontWeight: '400',
                margin: '1.5em 0 0.5em 0',
                color: '#939CB0',
                lineHeight: '1',
                textTransform: 'capitalize',
              }}
            >
              {data?.weather[0]?.description}
            </Title>
            <Title
              level={5}
              style={{
                fontSize: '2em',
                fontWeight: '500',
                color: '#939CB0',
                margin: '0px',
                lineHeight: '1',
              }}
              className="temperature"
            >
              {data.name}
            </Title>
          </div>
        </div>
        <div className="this__day_info">
          <div>
            <div className="this__day_info_items">
              <div className="item">
                <div className="ico-circle">
                  <span className="span-1"></span>
                </div>
                <div className="indicator__name">Temperature</div>
                <div className="indicator__value">
                  <span className="indicator__value indicator__value--dark">
                    {Math.round(data.main.temp - 273.15)}° - Feels like{' '}
                    {Math.round(data.main.feels_like - 273.15)}°C
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
                    {data.main.pressure} Hectopascal to Bar
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
                    {data.main.humidity}%{' '}
                    {data.main.humidity > 70 ? '- High' : '- Normal'}
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
                    {data.wind.speed} m/s
                  </span>
                </div>
              </div>
            </div>
            <img className="cloud__img" src="img/cloud.png" alt="cloud" />
          </div>
        </div>
      </div>
    </>
  );
};
