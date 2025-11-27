import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { RoutedAdminPlist } from './component/blog/routed-admin-plist/routed-admin-plist';
import { RoutedAdminView } from './component/blog/routed-admin-view/routed-admin-view';
import { RoutedUserPlist } from './component/blog/routed-user-plist/routed-user-plist';
import { RoutedUserView } from './component/blog/routed-user-view/routed-user-view';
import { RoutedAdminEdit } from './component/blog/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNew } from './component/blog/routed-admin-new/routed-admin-new';
import { RoutedAdminRemove } from './component/blog/routed-admin-remove/routed-admin-remove';
import { RoutedAdminEdit as RoutedAdminEditSilvestre } from './component/silvestre/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNew as RoutedAdminNewSilvestre } from './component/silvestre/routed-admin-new/routed-admin-new';
import { RoutedAdminRemove as RoutedAdminRemoveSilvestre } from './component/silvestre/routed-admin-remove/routed-admin-remove';
import { RoutedAdminPlist as RoutedAdminPlistSilvestre } from './component/silvestre/routed-admin-plist/routed-admin-plist';
import { RoutedAdminView as RoutedAdminViewSilvestre } from './component/silvestre/routed-admin-view/routed-admin-view';
import { RoutedUserPlist as RoutedUserPlistSilvestre } from './component/silvestre/routed-user-plist/routed-user-plist';
import { RoutedUserView as RoutedUserViewSilvestre } from './component/silvestre/routed-user-view/routed-user-view';  


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: RoutedUserPlist },
  { path: 'blog/post/:id', component: RoutedUserView },
  { path: 'blog/plist', component: RoutedAdminPlist },
  { path: 'blog/view/:id', component: RoutedAdminView },
  { path: 'blog/new', component: RoutedAdminNew },
  { path: 'blog/edit/:id', component: RoutedAdminEdit },
  { path: 'blog/remove/:id', component: RoutedAdminRemove },
  { path: 'silvestre', component: RoutedUserPlistSilvestre },
  { path: 'silvestre/post/:id', component: RoutedUserViewSilvestre },
  { path: 'silvestre/plist', component: RoutedAdminPlistSilvestre },
  { path: 'silvestre/view/:id', component: RoutedAdminViewSilvestre },
  { path: 'silvestre/new', component: RoutedAdminNewSilvestre },
  { path: 'silvestre/edit/:id', component: RoutedAdminEditSilvestre },
  { path: 'silvestre/remove/:id', component: RoutedAdminRemoveSilvestre },
];
