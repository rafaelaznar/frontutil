import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { RoutedAdminPlist } from './component/blog/routed-admin-plist/routed-admin-plist';
import { RoutedAdminView } from './component/blog/routed-admin-view/routed-admin-view';
import { RoutedUserPlist } from './component/blog/routed-user-plist/routed-user-plist';
import { RoutedUserView } from './component/blog/routed-user-view/routed-user-view';
import { RoutedAdminEdit } from './component/blog/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNew } from './component/blog/routed-admin-new/routed-admin-new';
import { RoutedAdminRemove } from './component/blog/routed-admin-remove/routed-admin-remove';
import { AlcaldeRoutedAdminPlist } from './component/alcalde/routed-admin-plist/routed-admin-plist';
import { AlcaldeRoutedAdminView } from './component/alcalde/routed-admin-view/routed-admin-view';
import { AlcaldeRoutedAdminNew } from './component/alcalde/routed-admin-new/routed-admin-new';
import { AlcaldeRoutedAdminEdit } from './component/alcalde/routed-admin-edit/routed-admin-edit';
import { AlcaldeRoutedAdminRemove } from './component/alcalde/routed-admin-remove/routed-admin-remove';
import { AlcaldeRoutedUserPlist } from './component/alcalde/routed-user-plist/routed-user-plist';
import { AlcaldeRoutedUserView } from './component/alcalde/routed-user-view/routed-user-view';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: RoutedUserPlist },
  { path: 'blog/post/:id', component: RoutedUserView },
  { path: 'blog/plist', component: RoutedAdminPlist },
  { path: 'blog/view/:id', component: RoutedAdminView },
  { path: 'blog/new', component: RoutedAdminNew },
  { path: 'blog/edit/:id', component: RoutedAdminEdit },
  { path: 'blog/remove/:id', component: RoutedAdminRemove },
  { path: 'alcalde', component: AlcaldeRoutedUserPlist },
  { path: 'alcalde/post/:id', component: AlcaldeRoutedUserView },
  { path: 'alcalde/plist', component: AlcaldeRoutedAdminPlist },
  { path: 'alcalde/view/:id', component: AlcaldeRoutedAdminView },
  { path: 'alcalde/new', component: AlcaldeRoutedAdminNew },
  { path: 'alcalde/edit/:id', component: AlcaldeRoutedAdminEdit },
  { path: 'alcalde/remove/:id', component: AlcaldeRoutedAdminRemove },
];
