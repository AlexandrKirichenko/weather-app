import { ArrowLeftOutlined } from '@ant-design/icons';
import { Tooltip, Col, Divider, Row } from 'antd';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { UPDATE_INTERVAL } from '../../../config';
import { townListWeatherSlice } from '../townListWeatherSlice';
// import { townListSlice } from '../townListSlice';
// import { TownWeatherDataItem } from '../../../types/TownWeatherData';
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
      console.log('TownListItem update');
      if (id) {
        dispatch(townListWeatherSlice.thunks.fetchWeatherHistoryThunk(id));
      }
    };
    fetch();
    console.log('TownListItemMainForm timeOut start');
    const intervalId = setInterval(fetch, UPDATE_INTERVAL);
    return () => {
      console.log('TownListItemMainForm timeOut stop');
      clearInterval(intervalId);
      dispatch(townListWeatherSlice.actions.clear());
    };
  }, []);

  const handleReturnToTownListBtn = () => {
    const path = getRoutePath('TownListPage');
    dispatch(appSlice.actions.redirect(path));
  };

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
          <div>7 Day Weather Forecast</div>
          <Row>
            <Col className="7days-col" flex={3}>
              <div className="7days-col__item">
                <h3 className="item__title">
                  {fetchWeatherHistoryRequest.data.timezone.split('/')[1]}
                </h3>
                <div className="item__date">
                  {new Date(
                    fetchWeatherHistoryRequest?.data?.daily[0]?.dt * 1000,
                  )
                    .toLocaleString()
                    .slice(0, 10)}
                </div>
                {/*<img*/}
                {/*  alt="weather"*/}
                {/*  className="weather-icon"*/}
                {/*  src={`icons/${fetchWeatherHistoryRequest.data?.current.weather[0]?.icon}.png`}*/}
                {/*/>*/}
              </div>
            </Col>
            <Col flex={1}></Col>
            <Col flex={2}></Col>
          </Row>
        </div>
      )}
    </div>
  );
};
