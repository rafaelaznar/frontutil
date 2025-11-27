import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { RoutedAdminPlist } from './component/blog/routed-admin-plist/routed-admin-plist';
import { RoutedAdminView } from './component/blog/routed-admin-view/routed-admin-view';
import { RoutedUserPlist } from './component/blog/routed-user-plist/routed-user-plist';
import { RoutedUserView } from './component/blog/routed-user-view/routed-user-view';
import { RoutedAdminEdit } from './component/blog/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNew } from './component/blog/routed-admin-new/routed-admin-new';
import { RoutedAdminRemove } from './component/blog/routed-admin-remove/routed-admin-remove';
import {PallasPlist} from './component/pallas/pallas-plist/pallas-plist'
import {PallasView} from './component/pallas/pallas-view/pallas-view'
import {PallasNew} from './component/pallas/pallas-new/pallas-new'
import {PallasUpdate} from './component/pallas/pallas-update/pallas-update'
import {PallasRemove} from './component/pallas/pallas-remove/pallas-remove'
import { PallasHome } from './component/pallas/pallas-home/pallas-home';
import { FechaFiltrar } from './component/pallas/fecha-filtrar/fecha-filtrar';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: RoutedUserPlist },
  { path: 'blog/post/:id', component: RoutedUserView },
  { path: 'blog/plist', component: RoutedAdminPlist },
  { path: 'blog/view/:id', component: RoutedAdminView },
  { path: 'blog/new', component: RoutedAdminNew },
  { path: 'blog/edit/:id', component: RoutedAdminEdit },
  { path: 'pallas/plist', component: PallasPlist },
  { path: 'pallas/new', component: PallasNew },
  { path: 'pallas/view/:id', component: PallasView },
  { path: 'pallas/edit/:id', component: PallasUpdate },
  { path: 'pallas/remove/:id', component: PallasRemove },
  { path: 'pallas', component: PallasHome },
  { path: 'pallas/fecha-filtrar', component: FechaFiltrar }
];
