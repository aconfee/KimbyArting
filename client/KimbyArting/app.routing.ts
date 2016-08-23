import { Routes, RouterModule } from '@angular/router';

import { CoverPageComponent } from './components/cover-page/cover-page.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: CoverPageComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);
