import { FC, useEffect, useState } from 'react';
import { Spin, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { myTownSlice } from '../myTownSlice';
import 'antd/dist/antd.css';
import './MyTownMainForm.css';

const { Title } = Typography;

const GEO_TIMEOUT = 10000;

export interface ItemDayInfo {
  icon_id: string;
  name: string;
  value: string;
}

export const MyTownMainForm: FC = () => {
  const dispatch = useAppDispatch();

  const fetchMyTownDataRequest = useAppSelector(
    myTownSlice.selectors.getFetchMyTownDataRequest,
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
              myTownSlice.thunks.fetchMyTownDataThunk({
                lat: coords.latitude,
                lon: coords.longitude,
              }),
            ),
          );
        });
      });
      geolocationPromise
        .then((response) => {
          console.log('geolocationPromise', response);
        })
        .catch((error) => {
          setGeoError(error);
        })
        .finally(() => {
          setGeolocationIsLoading(false);
        });
    } else {
      setGeoError('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      {geoError && <div>{geoError}</div>}
      {geolocationIsLoading && (
        <Spin size="large" tip="Requesting current coordinates..."></Spin>
      )}
      {data && (
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
                {data.name}, {data.sys.country}
              </Title>
            </div>
          </div>
          <div className="this__day_info">
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
          {/*<div>*/}
          {/*  <div>Current town: {data.name}</div>*/}
          {/*  <pre>{JSON.stringify(data, null, 2)}</pre>*/}
          {/*</div>*/}
          {/*<div className="weather">*/}
          {/*  <div className="top">*/}
          {/*    <div>*/}
          {/*      <h3 className="city">{data.name}</h3>*/}
          {/*      /!*<p className="weather-description">*!/*/}
          {/*      /!*  {data.name}.weather[0].description}*!/*/}
          {/*      /!*</p>*!/*/}
          {/*    </div>*/}
          {/*    <img*/}
          {/*      alt="weather"*/}
          {/*      className="weather-icon"*/}
          {/*      src={`icons/${data?.weather[0]?.icon}.png`}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  <div className="bottom">*/}
          {/*    <p className="temperature">*/}
          {/*      {Math.round(data.main.temp - 273.15)}°C*/}
          {/*    </p>*/}
          {/*    <div className="details">*/}
          {/*      <div className="parameter-row">*/}
          {/*        <span className="parameter-label">Details</span>*/}
          {/*      </div>*/}
          {/*      <div className="parameter-row">*/}
          {/*        <span className="parameter-label">Feels like</span>*/}
          {/*        <span className="parameter-value">*/}
          {/*          {Math.round(data.main.feels_like - 273.15)}°C*/}
          {/*        </span>*/}
          {/*      </div>*/}
          {/*      <div className="parameter-row">*/}
          {/*        <span className="parameter-label">Wind</span>*/}
          {/*        <span className="parameter-value">{data.wind.speed} m/s</span>*/}
          {/*      </div>*/}
          {/*      <div className="parameter-row">*/}
          {/*        <span className="parameter-label">Humidity</span>*/}
          {/*        <span className="parameter-value">{data.main.humidity}%</span>*/}
          {/*      </div>*/}
          {/*      <div className="parameter-row">*/}
          {/*        <span className="parameter-label">Pressure</span>*/}
          {/*        <span className="parameter-value">*/}
          {/*          {data.main.pressure} hPa*/}
          {/*        </span>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      )}
    </div>
  );
};
