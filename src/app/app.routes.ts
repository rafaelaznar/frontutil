import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { RoutedAdminPlist } from './component/blog/routed-admin-plist/routed-admin-plist';
import { RoutedAdminView } from './component/blog/routed-admin-view/routed-admin-view';
import { RoutedUserPlist } from './component/blog/routed-user-plist/routed-user-plist';
import { RoutedUserView } from './component/blog/routed-user-view/routed-user-view';
import { RoutedAdminEdit } from './component/blog/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNew } from './component/blog/routed-admin-new/routed-admin-new';
import { RoutedAdminRemove } from './component/blog/routed-admin-remove/routed-admin-remove';
import { SemperteguiRoutedUserPlist } from './component/sempertegui/routed-user-plist/sempertegui-routed-user-plist';
import { SemperteguiRoutedAdminPlist } from './component/sempertegui/routed-admin-plist/sempertegui-routed-admin-plist';
import { SemperteguiRoutedAdminView } from './component/sempertegui/routed-admin-view/sempertegui-routed-admin-view';
import { SemperteguiRoutedAdminEdit } from './component/sempertegui/routed-admin-edit/sempertegui-routed-admin-edit';
import { SemperteguiRoutedAdminRemove } from './component/sempertegui/routed-admin-remove/sempertegui-routed-admin-remove';
import { SemperteguiRoutedAdminNew } from './component/sempertegui/routed-admin-new/sempertegui-routed-admin-new';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: RoutedUserPlist },
  { path: 'blog/post/:id', component: RoutedUserView },
  { path: 'blog/plist', component: RoutedAdminPlist },
  { path: 'blog/view/:id', component: RoutedAdminView },
  { path: 'blog/new', component: RoutedAdminNew },
  { path: 'blog/edit/:id', component: RoutedAdminEdit },
  { path: 'blog/remove/:id', component: RoutedAdminRemove },
  { path: 'sempertegui', component: SemperteguiRoutedUserPlist },
  { path: 'sempertegui/plist', component: SemperteguiRoutedAdminPlist },
  { path: 'sempertegui/view/:id', component: SemperteguiRoutedAdminView},
  { path: 'sempertegui/edit/:id', component: SemperteguiRoutedAdminEdit },
  { path: 'sempertegui/remove/:id', component: SemperteguiRoutedAdminRemove },
  { path: 'sempertegui/new', component: SemperteguiRoutedAdminNew }
];
