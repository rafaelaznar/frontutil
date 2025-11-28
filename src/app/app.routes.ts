import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { RoutedAdminPlist } from './component/blog/routed-admin-plist/routed-admin-plist';
import { RoutedAdminView } from './component/blog/routed-admin-view/routed-admin-view';
import { RoutedUserPlist } from './component/blog/routed-user-plist/routed-user-plist';
import { RoutedUserView } from './component/blog/routed-user-view/routed-user-view';
import { RoutedAdminEdit } from './component/blog/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNew } from './component/blog/routed-admin-new/routed-admin-new';
import { RoutedAdminRemove } from './component/blog/routed-admin-remove/routed-admin-remove';

import { RoutedAdminPlistZanon } from './component/zanon/routed-admin-plist/routed-admin-plist';
import { RoutedAdminViewZanon } from './component/zanon/routed-admin-view/routed-admin-view';
import { RoutedUserPlistZanon } from './component/zanon/routed-user-plist/routed-user-plist';
import { RoutedUserViewZanon } from './component/zanon/routed-user-view/routed-user-view';
import { RoutedAdminEditZanon } from './component/zanon/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNewZanon } from './component/zanon/routed-admin-new/routed-admin-new';
import { RoutedAdminRemoveZanon } from './component/zanon/routed-admin-remove/routed-admin-remove';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: RoutedUserPlist },
  { path: 'blog/post/:id', component: RoutedUserView },
  { path: 'blog/plist', component: RoutedAdminPlist },
  { path: 'blog/view/:id', component: RoutedAdminView },
  { path: 'blog/new', component: RoutedAdminNew },
  { path: 'blog/edit/:id', component: RoutedAdminEdit },
  { path: 'blog/remove/:id', component: RoutedAdminRemove },

  { path: 'zanon', component: RoutedUserPlistZanon},
  { path: 'zanon/post/:id', component: RoutedUserViewZanon },
  { path: 'zanon/plist', component: RoutedAdminPlistZanon },
  { path: 'zanon/view/:id', component: RoutedAdminViewZanon },
  { path: 'zanon/new', component: RoutedAdminNewZanon },
  { path: 'zanon/edit/:id', component: RoutedAdminEditZanon },
  { path: 'zanon/remove/:id', component: RoutedAdminRemoveZanon },
];
