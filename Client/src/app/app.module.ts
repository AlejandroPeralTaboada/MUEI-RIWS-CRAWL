import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { DetailsComponent } from './views/details/details.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import {
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule
} from '@angular/material';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    SidebarComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    AppRoutingModule,
    HttpClientModule,
    // Angular Material
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
