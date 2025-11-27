import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { RoutedAdminPlist } from './component/blog/routed-admin-plist/routed-admin-plist';
import { RoutedAdminView } from './component/blog/routed-admin-view/routed-admin-view';
import { RoutedUserPlist } from './component/blog/routed-user-plist/routed-user-plist';
import { RoutedUserView } from './component/blog/routed-user-view/routed-user-view';
import { RoutedAdminEdit } from './component/blog/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNew } from './component/blog/routed-admin-new/routed-admin-new';
import { RoutedAdminRemove } from './component/blog/routed-admin-remove/routed-admin-remove';
import { RoutedUserPlistGarcia } from './component/garcia/routed-user-plistGarcia/Garciarouted-user-plist';
import { RoutedUserViewGarcia } from './component/garcia/routed-user-viewGarcia/Garciarouted-user-view';
import { RoutedAdminPlistGarcia } from './component/garcia/routed-admin-plistGarcia/Garciarouted-admin-plist';
import { RoutedAdminViewGarcia } from './component/garcia/routed-admin-viewGarcia/Garciarouted-admin-view';
import { RoutedAdminNewGarcia } from './component/garcia/routed-admin-newGarcia/Garciarouted-admin-new';
import { RoutedAdminEditGarcia } from './component/garcia/routed-admin-editGarcia/Garciarouted-admin-edit';
import { RoutedAdminRemoveGarcia } from './component/garcia/routed-admin-removeGarcia/Garciarouted-admin-remove';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: RoutedUserPlist },
  { path: 'blog/post/:id', component: RoutedUserView },
  { path: 'blog/plist', component: RoutedAdminPlist },
  { path: 'blog/view/:id', component: RoutedAdminView },
  { path: 'blog/new', component: RoutedAdminNew },
  { path: 'blog/edit/:id', component: RoutedAdminEdit },
  { path: 'blog/remove/:id', component: RoutedAdminRemove },
  { path: 'garcia', component: RoutedUserPlistGarcia},
  { path: 'garcia/post/:id', component: RoutedUserViewGarcia },
  { path: 'garcia/plist', component: RoutedAdminPlistGarcia },
  { path: 'garcia/view/:id', component: RoutedAdminViewGarcia },
  { path: 'garcia/new', component: RoutedAdminNewGarcia },
  { path: 'garcia/edit/:id', component: RoutedAdminEditGarcia },
  { path: 'garcia/remove/:id', component: RoutedAdminRemoveGarcia }
];
