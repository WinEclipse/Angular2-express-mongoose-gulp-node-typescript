import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { HeroesComponent }      from './components/heroes/heroes.component';
import { HeroDetailComponent }  from './components/heroDetail/hero-detail.component';
import { LoginComponent }      from './components/login/login.component';
// import { UserComponent }      from './components/user/user.component';
import { UsersComponent }      from './components/users/users.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // {
  //   path: 'user',
  //   component: UserComponent
  // },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
