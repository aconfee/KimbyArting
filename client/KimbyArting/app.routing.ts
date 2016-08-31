import { Routes, RouterModule } from '@angular/router';

import { CoverPageComponent } from './components/cover-page/cover-page.component';
import { PortfolioPageComponent } from './components/portfolio-page/portfolio-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';

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
  },
  {
    path: 'contact',
    component: ContactPageComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);
