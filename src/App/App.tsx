import React from 'react';
import 'antd/dist/antd.css';
import './App.css';

import { Layout } from 'antd';

import { Router } from '../router';
import { Head } from './Head';

const { Header, Content } = Layout;

export const App: React.FC = () => {
  return (
    <Layout className="layout">
      <div className="container">
        <Header>
          <Head />
        </Header>
        <Content>
          <Router />
        </Content>
      </div>
    </Layout>
  );
};
