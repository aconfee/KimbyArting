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

import { ProjectPlaqueComponent } from './components/project-plaque/project-plaque.component';
import { ProjectGalleryComponent } from './components/project-gallery/project-gallery.component';

import { ScrollToDirective } from './components/scroll-directive/scroll-directive';

import { ExampleThingComponent } from './components/exampleThing/example-thing.component';

// Application services
import { ExampleService } from './services/example.service';
import { PortfolioDataService } from './services/portfolio-data.service';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    HttpModule
  ],
  declarations: [
    ProjectPlaqueComponent,
    ScrollToDirective,
    ProjectGalleryComponent,
    ExampleThingComponent,
    CoverPageComponent,
    PortfolioPageComponent,
    ContactPageComponent,
    AppComponent
  ],
  providers: [
    ExampleService,
    PortfolioDataService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
