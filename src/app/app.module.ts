import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { environment } from '@env/environment';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { GraphQLModule } from './graphql.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';

function keycloakInitFactory(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://auth.agri-logix.io/auth',
        realm: 'agri-logix',
        clientId: 'agri-logix-test',
      },
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      },
      bearerExcludedUrls: ['/assets', ''],
    });
}
@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    GraphQLModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AuthModule,
    KeycloakAngularModule,
    Angulartics2Module.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: keycloakInitFactory,
      multi: true,
      deps: [KeycloakService],
    },
    MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
