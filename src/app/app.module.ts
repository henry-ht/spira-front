

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NotifierModule } from 'angular-notifier';
import { rootRouterConfig } from './app-routing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { IntroPageComponent } from './pages/intro-page/intro-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InterceptorErrorService } from './services/interceptor-error.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    IntroPageComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NotifierModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rootRouterConfig, { 
      useHash: false, 
      anchorScrolling: 'enabled', 
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorErrorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
