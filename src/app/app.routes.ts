import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { RoutedAdminPlist } from './component/blog/routed-admin-plist/routed-admin-plist';
import { RoutedAdminView } from './component/blog/routed-admin-view/routed-admin-view';
import { RoutedUserPlist } from './component/blog/routed-user-plist/routed-user-plist';
import { RoutedUserView } from './component/blog/routed-user-view/routed-user-view';
import { RoutedAdminEdit } from './component/blog/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNew } from './component/blog/routed-admin-new/routed-admin-new';
import { RoutedAdminRemove } from './component/blog/routed-admin-remove/routed-admin-remove';
import { RoutedAdminPlist as RoutedAdminPlistPalomares } from './component/palomares/routed-admin-plist/routed-admin-plist';
import { RoutedAdminView as RoutedAdminViewPalomares } from './component/palomares/routed-admin-view/routed-admin-view';
import { RoutedUserPlist as RoutedUserPlistPalomares } from './component/palomares/routed-user-plist/routed-user-plist';
import { RoutedUserView as RoutedUserViewPalomares } from './component/palomares/routed-user-view/routed-user-view';
import { RoutedAdminEdit as RoutedAdminEditPalomares } from './component/palomares/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNew as RoutedAdminNewPalomares } from './component/palomares/routed-admin-new/routed-admin-new';
import { RoutedAdminRemove as RoutedAdminRemovePalomares } from './component/palomares/routed-admin-remove/routed-admin-remove';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: RoutedUserPlist },
  { path: 'blog/post/:id', component: RoutedUserView },
  { path: 'blog/plist', component: RoutedAdminPlist },
  { path: 'blog/view/:id', component: RoutedAdminView },
  { path: 'blog/new', component: RoutedAdminNew },
  { path: 'blog/edit/:id', component: RoutedAdminEdit },
  { path: 'blog/remove/:id', component: RoutedAdminRemove },
  { path: 'palomares', component: RoutedUserPlistPalomares },
  { path: 'palomares/task/:id', component: RoutedUserViewPalomares },
  { path: 'palomares/plist', component: RoutedAdminPlistPalomares },
  { path: 'palomares/view/:id', component: RoutedAdminViewPalomares },
  { path: 'palomares/new', component: RoutedAdminNewPalomares },
  { path: 'palomares/edit/:id', component: RoutedAdminEditPalomares },
  { path: 'palomares/remove/:id', component: RoutedAdminRemovePalomares },
];
