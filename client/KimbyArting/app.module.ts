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

import { ExampleThingComponent } from './components/exampleThing/example-thing.component';

// Application services
import { ExampleService } from './services/example.service';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    HttpModule
  ],
  declarations: [
    ExampleThingComponent,
    CoverPageComponent,
    PortfolioPageComponent,
    ContactPageComponent,
    AppComponent
  ],
  providers: [
    ExampleService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
