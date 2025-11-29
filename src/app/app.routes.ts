import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { RoutedAdminPlist } from './component/blog/routed-admin-plist/routed-admin-plist';
import { RoutedAdminView } from './component/blog/routed-admin-view/routed-admin-view';
import { RoutedUserPlist } from './component/blog/routed-user-plist/routed-user-plist';
import { RoutedUserView } from './component/blog/routed-user-view/routed-user-view';
import { RoutedAdminEdit } from './component/blog/routed-admin-edit/routed-admin-edit';
import { RoutedAdminNew } from './component/blog/routed-admin-new/routed-admin-new';
import { RoutedAdminRemove } from './component/blog/routed-admin-remove/routed-admin-remove';
import { SoaresRoutedAdminPlist } from './component/soares/routed-admin-plist/routed-admin-plist';
import { SoaresRoutedAdminNew } from './component/soares/routed-admin-new/routed-admin-new';
import { SoaresRoutedAdminEdit } from './component/soares/routed-admin-edit/routed-admin-edit';
import { SoaresRoutedAdminRemove } from './component/soares/routed-admin-remove/routed-admin-remove';
import { SoaresRoutedUserPlist } from './component/soares/routed-user-plist/routed-user-plist';
import { PreguntasPorTemaComponent } from './component/soares/preguntas-por-tema/preguntas-por-tema';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: RoutedUserPlist },
  { path: 'blog/post/:id', component: RoutedUserView },
  { path: 'blog/plist', component: RoutedAdminPlist },
  { path: 'blog/view/:id', component: RoutedAdminView },
  { path: 'blog/new', component: RoutedAdminNew },
  { path: 'blog/edit/:id', component: RoutedAdminEdit },
  { path: 'blog/remove/:id', component: RoutedAdminRemove },
  { path: 'soares/user/plist', component: SoaresRoutedUserPlist },
  { path: 'soares/user/temas', component: PreguntasPorTemaComponent },
  { path: 'soares/user/new', component: SoaresRoutedAdminNew },
  { path: 'soares/admin/plist', component: SoaresRoutedAdminPlist },
  { path: 'soares/admin/new', component: SoaresRoutedAdminNew },
  { path: 'soares/admin/edit/:id', component: SoaresRoutedAdminEdit },
  { path: 'soares/admin/remove/:id', component: SoaresRoutedAdminRemove },
];
