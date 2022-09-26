import React, { FC, useState } from 'react';
import './Head.css';
import { PlusOutlined } from '@ant-design/icons';
import { Typography, Button, Tooltip } from 'antd';
import { TownSearchMainForm } from '../../features/townSearch/TownSearchMainForm';
import { ModalWindow } from '../../UIKit/ModalWindow';

export const Head: FC = () => {
  const [showTownSearchModalWindow, setShowTownSearchModalWindow] =
    useState<boolean>(false);

  const handleModalClose = () => {
    setShowTownSearchModalWindow(false);
  };

  const handleAddTownBtn = () => {
    setShowTownSearchModalWindow(true);
  };

  return (
    <div className="container__header">
      <div className="flex">
        <div className="logo"></div>
        <Typography className="typography">WEATHER APP</Typography>
        <Tooltip title="Add town in saved" color="#8b9dc3">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={handleAddTownBtn}
          />
        </Tooltip>
      </div>
      <ModalWindow
        isShowModal={showTownSearchModalWindow}
        handleModalClose={handleModalClose}
      >
        <TownSearchMainForm onClose={() => handleModalClose()} />
      </ModalWindow>
    </div>
  );
};
