import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { UPDATE_INTERVAL } from '../../../config';
import { townListWeatherSlice } from '../townListWeatherSlice';
import { townListSlice } from '../townListSlice';
import { TownWeatherDataItem } from '../../../types/TownWeatherData';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import styles from './TownListItemMainForm.module.scss';

export const TownListItemMainForm: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const townList = useAppSelector(townListSlice.selectors.getTownList);
  const townWeatherData = useAppSelector(
    townListWeatherSlice.selectors.getTownWeatherData,
  );
  const fetchWeatherHistoryRequest = useAppSelector(
    townListWeatherSlice.selectors.getFetchWeatherHistory,
  );

  const townListItem = townList.find((item) => item.id === id);

  let townWeatherDataItem: TownWeatherDataItem | null | undefined = null;

  if (id) {
    townWeatherDataItem = townWeatherData[id];
  }

  useEffect(() => {
    const fetch = () => {
      console.log('TownListItem update');
      if (id) {
        dispatch(townListWeatherSlice.thunks.fetchWeatherTownForIdThunk(id));
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

  const handleReturnToTownListBtnClk = () => {
    const path = getRoutePath('TownListPage');
    dispatch(appSlice.actions.redirect(path));
  };

  return (
    <div className={styles.wrap}>
      <div>
        <button onClick={handleReturnToTownListBtnClk}>
          return to town list
        </button>
      </div>
      {!townListItem && <div>Id was not found! = {id}</div>}
      {townListItem && (
        <div className={styles.townInfoWrap}>
          <div>ДАННЫЕ ПО ГОРОДУ</div>
          <pre>{JSON.stringify(townListItem, null, 2)}</pre>
        </div>
      )}

      {townWeatherDataItem && (
        <div className={styles.townWeatherWrap}>
          <div>ДАННЫЕ ПО ТЕКУЩЕЙ ПОГОДЕ</div>
          <pre>{JSON.stringify(townWeatherDataItem, null, 2)}</pre>
        </div>
      )}

      {fetchWeatherHistoryRequest.data && (
        <div className={styles.townHistoryWrap}>
          <div>ДАННЫЕ ПО ИСТОРИИ ПОГОДЫ</div>
          <pre>{JSON.stringify(fetchWeatherHistoryRequest.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
