import { Routes, RouterModule } from '@angular/router';

import { CoverPageComponent } from './components/cover-page/cover-page.component';
import { PortfolioPageComponent } from './components/portfolio-page/portfolio-page.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: CoverPageComponent
  },
  {
    path: 'portfolio',
    component: PortfolioPageComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);
