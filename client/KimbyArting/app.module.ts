// Angular components
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { routing }        from './app.routing';
import 'rxjs/add/operator/toPromise';

// Application components
import { AppComponent } from './app.component';
import { CoverPageComponent } from './components/cover-page/cover-page.component';
import { PortfolioPageComponent } from './components/portfolio-page/portfolio-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';

import { ScrollToDirective } from './components/scroll-directive/scroll-directive';
import { ScrollOffsetDirective } from './components/scroll-offset/scroll-offset.directive';
import { ProjectPlaqueComponent } from './components/project-plaque/project-plaque.component';
import { ProjectGalleryIndexComponent } from './components/project-gallery-index/project-gallery-index.component';
import { ProjectGalleryComponent } from './components/project-gallery/project-gallery.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';

// Application services
import { PortfolioDataService } from './services/portfolio-data.service';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    HttpModule
  ],
  declarations: [
    ScrollToDirective,
    ScrollOffsetDirective,
    ProjectPlaqueComponent,
    ProjectGalleryIndexComponent,
    ProjectGalleryComponent,
    NavigationMenuComponent,
    CoverPageComponent,
    PortfolioPageComponent,
    ContactPageComponent,
    AppComponent
  ],
  providers: [
    PortfolioDataService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
