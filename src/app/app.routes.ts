import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { RoutedAdminPlist } from './component/blog/routed-admin-plist/routed-admin-plist';
import { RoutedAdminView } from './component/blog/routed-admin-view/routed-admin-view';
import { RoutedUserPlist } from './component/blog/routed-user-plist/routed-user-plist';
import { RoutedUserView } from './component/blog/routed-user-view/routed-user-view';
import { RoutedAdminEdit } from './component/blog/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNew } from './component/blog/routed-admin-new/routed-admin-new';
import { RoutedAdminRemove } from './component/blog/routed-admin-remove/routed-admin-remove';
import { FernandezRoutedAdminPlist } from './component/fernandez-idea/routed-admin-plist/routed-admin-plist';
import { FernandezRoutedAdminView } from './component/fernandez-idea/routed-admin-view/routed-admin-view';
import { FernandezRoutedAdminEdit } from './component/fernandez-idea/routed-admin-edit/routed-admin-edit';
import { FernandezRoutedAdminNew } from './component/fernandez-idea/routed-admin-new/routed-admin-new';
import { FernandezRoutedAdminRemove } from './component/fernandez-idea/routed-admin-remove/routed-admin-remove';
import { FernandezRoutedUserPlist } from './component/fernandez-idea/routed-user-plist/routed-user-plist';
import { FernandezRoutedUserView } from './component/fernandez-idea/routed-user-view/routed-user-view';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: RoutedUserPlist },
  { path: 'blog/post/:id', component: RoutedUserView },
  { path: 'blog/plist', component: RoutedAdminPlist },
  { path: 'blog/view/:id', component: RoutedAdminView },
  { path: 'blog/new', component: RoutedAdminNew },
  { path: 'blog/edit/:id', component: RoutedAdminEdit },
  { path: 'blog/remove/:id', component: RoutedAdminRemove },
  // Rutas de Fernandez Ideas - Administración
  { path: 'fernandez-idea/admin/plist', component: FernandezRoutedAdminPlist },
  { path: 'fernandez-idea/admin/view/:id', component: FernandezRoutedAdminView },
  { path: 'fernandez-idea/admin/new', component: FernandezRoutedAdminNew },
  { path: 'fernandez-idea/admin/edit/:id', component: FernandezRoutedAdminEdit },
  { path: 'fernandez-idea/admin/remove/:id', component: FernandezRoutedAdminRemove },
  // Rutas de Fernandez Ideas - Usuario
  { path: 'fernandez-idea/user/plist', component: FernandezRoutedUserPlist },
  { path: 'fernandez-idea/user/view/:id', component: FernandezRoutedUserView },
  { path: 'fernandez-idea', redirectTo: 'fernandez-idea/user/plist', pathMatch: 'full' },
];
