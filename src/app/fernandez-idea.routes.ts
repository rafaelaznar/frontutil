import { Routes } from '@angular/router';
import { FernandezRoutedAdminPlist } from './component/fernandez-idea/routed-admin-plist/routed-admin-plist';
import { FernandezRoutedAdminView } from './component/fernandez-idea/routed-admin-view/routed-admin-view';
import { FernandezRoutedAdminEdit } from './component/fernandez-idea/routed-admin-edit/routed-admin-edit';
import { FernandezRoutedAdminNew } from './component/fernandez-idea/routed-admin-new/routed-admin-new';
import { FernandezRoutedAdminRemove } from './component/fernandez-idea/routed-admin-remove/routed-admin-remove';
import { FernandezRoutedUserPlist } from './component/fernandez-idea/routed-user-plist/routed-user-plist';
import { FernandezRoutedUserView } from './component/fernandez-idea/routed-user-view/routed-user-view';

export const fernandezIdeaRoutes: Routes = [
  // Rutas de administración
  { path: 'fernandez-idea/admin/plist', component: FernandezRoutedAdminPlist },
  { path: 'fernandez-idea/admin/view/:id', component: FernandezRoutedAdminView },
  { path: 'fernandez-idea/admin/new', component: FernandezRoutedAdminNew },
  { path: 'fernandez-idea/admin/edit/:id', component: FernandezRoutedAdminEdit },
  { path: 'fernandez-idea/admin/remove/:id', component: FernandezRoutedAdminRemove },
  
  // Rutas de usuario
  { path: 'fernandez-idea/user/plist', component: FernandezRoutedUserPlist },
  { path: 'fernandez-idea/user/view/:id', component: FernandezRoutedUserView },
  
  // Ruta por defecto de ideas redirige al listado de usuario
  { path: 'fernandez-idea', redirectTo: 'fernandez-idea/user/plist', pathMatch: 'full' },
];
