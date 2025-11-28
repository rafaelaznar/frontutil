import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { RoutedAdminPlist } from './component/blog/routed-admin-plist/routed-admin-plist';
import { RoutedAdminView } from './component/blog/routed-admin-view/routed-admin-view';
import { RoutedUserPlist } from './component/blog/routed-user-plist/routed-user-plist';
import { RoutedUserView } from './component/blog/routed-user-view/routed-user-view';
import { RoutedAdminEdit } from './component/blog/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNew } from './component/blog/routed-admin-new/routed-admin-new';
import { RoutedAdminRemove } from './component/blog/routed-admin-remove/routed-admin-remove';
import { SalinasRoutedUserPlist } from './component/salinasReceta/routed-user-plist/routed-user-plist';
import { SalinasRoutedUserView } from './component/salinasReceta/routed-user-view/routed-user-view';
import { SalinasRoutedAdminPlist } from './component/salinasReceta/routed-admin-plist/routed-admin-plist';
import { SalinasRoutedAdminView } from './component/salinasReceta/routed-admin-view/routed-admin-view';
import { SalinasRoutedAdminNew } from './component/salinasReceta/routed-admin-new/routed-admin-new';
import { SalinasRoutedAdminEdit } from './component/salinasReceta/routed-admin-edit/routed-admin-edit';
import { SalinasRoutedAdminRemove } from './component/salinasReceta/routed-admin-remove/routed-admin-remove';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: RoutedUserPlist },
  { path: 'blog/post/:id', component: RoutedUserView },
  { path: 'blog/plist', component: RoutedAdminPlist },
  { path: 'blog/view/:id', component: RoutedAdminView },
  { path: 'blog/new', component: RoutedAdminNew },
  { path: 'blog/edit/:id', component: RoutedAdminEdit },
  { path: 'blog/remove/:id', component: RoutedAdminRemove },
  // Rutas de Joan Salinas
  { path:'receta', component: SalinasRoutedUserPlist },
  { path: 'receta/post/:id', component: SalinasRoutedUserView },
  { path: 'receta/plist', component: SalinasRoutedAdminPlist },
  { path: 'receta/view/:id', component: SalinasRoutedAdminView },
  { path: 'receta/new', component: SalinasRoutedAdminNew },
  { path: 'receta/edit/:id', component: SalinasRoutedAdminEdit },
  { path: 'receta/remove/:id', component: SalinasRoutedAdminRemove },

];
