import { FC } from 'react';
import { TownListMainForm } from '../features/townList/TownListMainForm';
import { P404page } from '../pages/P404page';
import { TownListItemPage } from '../pages/TownListItemPage';

interface RouteItem {
  path: string;
  component: FC;
}

export const routeNameList = [
  'TownListPage',
  'TownListItemPage',
  'Page404',
] as const;

export type Routes = typeof routeNameList[number];

export const routeList: Record<Routes, RouteItem> = {
  TownListPage: {
    path: '/',
    component: TownListMainForm,
  },

  TownListItemPage: {
    path: '/town-item/:id',
    component: TownListItemPage,
  },

  Page404: {
    path: '*',
    component: P404page,
  },
};
