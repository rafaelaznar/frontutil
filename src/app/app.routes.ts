import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { RoutedAdminPlist } from './component/blog/routed-admin-plist/routed-admin-plist';
import { RoutedAdminView } from './component/blog/routed-admin-view/routed-admin-view';
import { RoutedUserPlist } from './component/blog/routed-user-plist/routed-user-plist';
import { RoutedUserView } from './component/blog/routed-user-view/routed-user-view';
import { RoutedAdminEdit } from './component/blog/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNew } from './component/blog/routed-admin-new/routed-admin-new';
import { RoutedAdminRemove } from './component/blog/routed-admin-remove/routed-admin-remove';

import { CastanyeraRoutedAdminPlist } from './component/castanyera/castanyera-routed-admin-plist/routed-admin-plist';
import { CastanyeraRoutedAdminView } from './component/castanyera/castanyera-routed-admin-view/routed-admin-view';
import { CastanyeraRoutedUserPlist } from './component/castanyera/castanyera-routed-user-plist/routed-user-plist';
import { CastanyeraRoutedUserView } from './component/castanyera/castanyera-routed-user-view/routed-user-view';
import { CastanyeraRoutedAdminEdit } from './component/castanyera/castanyera-routed-admin-edit/routed-admin-edit';
import { CastanyeraRoutedAdminNew } from './component/castanyera/castanyera-routed-admin-new/routed-admin-new';
import { CastanyeraRoutedAdminRemove } from './component/castanyera/castanyera-routed-admin-remove/routed-admin-remove';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: RoutedUserPlist },
  { path: 'blog/post/:id', component: RoutedUserView },
  { path: 'blog/plist', component: RoutedAdminPlist },
  { path: 'blog/view/:id', component: RoutedAdminView },
  { path: 'blog/new', component: RoutedAdminNew },
  { path: 'blog/edit/:id', component: RoutedAdminEdit },
  { path: 'blog/remove/:id', component: RoutedAdminRemove },

  { path: 'castanyera', component: CastanyeraRoutedUserPlist },
  { path: 'castanyera/post/:id', component: CastanyeraRoutedUserView },
  { path: 'castanyera/plist', component: CastanyeraRoutedAdminPlist },
  { path: 'castanyera/view/:id', component: CastanyeraRoutedAdminView },
  { path: 'castanyera/new', component: CastanyeraRoutedAdminNew },
  { path: 'castanyera/edit/:id', component: CastanyeraRoutedAdminEdit },
  { path: 'castanyera/remove/:id', component: CastanyeraRoutedAdminRemove },
];
