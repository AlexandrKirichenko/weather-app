import { FC, ChangeEvent, useEffect } from 'react';
import { debounce } from 'lodash';
import { Button, Input, List, Tooltip } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { townSearchSlice } from '../townSearchSlice';
import { townListSlice } from '../../townList/townListSlice';
import { TownListItem } from '../../../types/TownListItem';
import { getUUID } from '../../../utils/getUUID';
import { townListWeatherSlice } from '../../townList/townListWeatherSlice';
import './TownSearchMainForm.css';

const DELAY = 600;

interface TownSearchMainFormProps {
  onClose: () => void;
}

export const TownSearchMainForm: FC<TownSearchMainFormProps> = ({
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const townSearchRequest = useAppSelector(
    townSearchSlice.selectors.getTownSearchRequest,
  );

  useEffect(
    () => () => {
      dispatch(townSearchSlice.actions.clear());
    },
    [],
  );

  const handleChangeSearchValue = debounce(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.length > 0) {
        dispatch(townSearchSlice.thunks.townSearchThunks(value));
        return;
      }
      dispatch(townSearchSlice.actions.clear());
    },
    DELAY,
  );

  const handleAddTown = (townListItem: TownListItem) => {
    dispatch(townListSlice.actions.addTownListItem(townListItem));
    dispatch(townListWeatherSlice.thunks.fetchWeatherTownThunk(townListItem));
    onClose();
  };

  const handleShowTown = (townListItem: TownListItem) => {
    dispatch(townSearchSlice.thunks.fetchShowTownDataThunk(townListItem));
    onClose();
  };

  return (
    <div className="wrap">
      <div>
        <Input
          size="middle"
          allowClear
          placeholder="Type town for search..."
          type="text"
          autoFocus={true}
          onChange={handleChangeSearchValue}
        />
      </div>
      <List className="townSearchList">
        {townSearchRequest.data &&
          townSearchRequest.data.map((item) => {
            const townListItem: TownListItem = {
              lat: item.lat,
              lon: item.lon,
              name: item.name,
              id: getUUID(),
              state: item.state,
              country: item.country,
            };
            return (
              <List.Item
                key={getUUID()}
                onDoubleClick={() => handleShowTown(townListItem)}
              >
                <Tooltip title="Add town in saved" color="#8b9dc3">
                  <Button
                    className="add-btn"
                    onClick={() => handleAddTown(townListItem)}
                    shape="circle"
                    icon={<PlusOutlined />}
                  />
                </Tooltip>
                <Tooltip title="Search town" color="#8b9dc3">
                  <Button
                    className="add-btn"
                    onClick={() => handleShowTown(townListItem)}
                    shape="circle"
                    icon={<SearchOutlined />}
                  />
                </Tooltip>
                <span>Town</span>: {item.name}, <span>Country</span>:{' '}
                {item.country}, {item.state}
              </List.Item>
            );
          })}
      </List>
    </div>
  );
};
