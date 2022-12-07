import { LocalStorageService } from 'src/app/core/localstorage.service';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS, HttpBackend } from '@angular/common/http';
import { MatTableExporterModule } from 'mat-table-exporter';
// import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { HeaderComponent } from './utility/header/header.component';
import { FooterComponent } from './utility/footer/footer.component';
import { SidebarComponent } from './utility/sidebar/sidebar.component';
import { MaterialModule } from './material/material.module';
import { InterceptorService } from './services/interceptor.service';
import { ClientComponent } from './client/client.component';
import { RegisteredClientComponent } from './registered-client/registered-client.component';
import { LoginComponent } from './login/login.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { ToastrModule } from 'ngx-toastr';
import { BackendClientRegistrationComponent } from './backend-client-registration/backend-client-registration.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { ScopesListComponent } from './scopes-list/scopes-list.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { BackendClientComponent } from './backend-client/backend-client.component';
import { NoContentComponent } from './no-content/no-content.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { ScopePopupComponent } from './authentication/scope-popup/scope-popup.component';
// import {
//   MatDialogModule,
//   MatDialogRef,
//   MatIconModule,
//   MatTableModule,
//   MAT_DIALOG_DATA,
// } from '@angular/material';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderComponent } from './utility/loader/loader.component';
import { ApiSpecificationsComponent } from './api-specifications/api-specifications.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from './utility/nav-bar/nav-bar.component';
// import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { RegisteredAppsComponent } from './registered-apps/registered-apps.component';
import { CustomAuthGuard } from './core/auth.gaurd';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserFormComponent } from './user-management/user-form/user-form.component';
import { DataService } from './services/data.service';
import { LaunchAppDialogComponent } from './launch-app-dialog/launch-app-dialog.component';
import {
  AppRequestsComponent,
  confirmationDialog,
} from './app-requests/app-requests.component';
import { ErrorMessageComponent } from './utility/error-message/error-message';
import { OauthTutorialComponent } from './oauth-tutorial/oauth-tutorial.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import * as Hammer from 'hammerjs';
import { AuthModule, AuthClientConfig, AuthConfig } from '@auth0/auth0-angular';
// import { Auth0Interceptor } from './services/auth0.interceptor';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { tap } from 'rxjs/operators';
export class HammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

export function configInitializer(handler: HttpBackend, authClientConfig: AuthClientConfig) {

  return () => {
    const http = new HttpClient(handler);
    console.log("AuthConfigAuthConfig", window.location.origin);
    // ${window.location.origin}
   return http.get(`${window.location.origin}/ix-auth-server/config`).pipe(
	 //return http.get(`http://localhost:8055/config`).pipe(
      tap((config: AuthConfig) => {
        console.log("AuthConfigAuthConfig", config);
        if (!config) {
          throw new Error("AuthConfig is null or undefined");
        }
        authClientConfig.set(config.auth0);

      })
    );
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ClientComponent,
    RegisteredClientComponent,
    LoginComponent,
    AdminpanelComponent,
    BackendClientRegistrationComponent,
    PatientListComponent,
    ScopesListComponent,
    AuthenticationComponent,
    BackendClientComponent,
    NoContentComponent,
    DialogboxComponent,
    ScopePopupComponent,
    LoaderComponent,
    ApiSpecificationsComponent,
    HomePageComponent,
    NavBarComponent,
    RegisteredAppsComponent,
    UserManagementComponent,
    UserFormComponent,
    AppRequestsComponent,
    LaunchAppDialogComponent,
    confirmationDialog,
    ErrorMessageComponent,
    OauthTutorialComponent,
    // HammerModule
  ],
  entryComponents: [
    ScopePopupComponent,
    UserFormComponent,
    DialogboxComponent,
    ScopePopupComponent,
    LaunchAppDialogComponent,
    LoginComponent,
    AppRequestsComponent,
    confirmationDialog
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    MatTableExporterModule,
    MatIconModule,
    // Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    AuthModule.forRoot(
    //  {
    //    domain: 'default-development-arcadia.us.auth0.com',
    //    clientId: 'oNNNQWwQMQ6hZHoqW60mqgx1LBhNIA6q',
    //   httpInterceptor: {
    //     allowedList: [
    //       "http://localhost:8055/*",
    //       "http://localhost:8055/*",
    //       "http://localhost:8080/ix-auth-server/*",
    //       "https://default-development-arcadia.us.auth0.com/userinfo",
    //       "https://authserver.development.arcadiaanalytics.com/*",
    //     ]
    //    }
    //  }
    ),
  ],
  providers: [
    CustomAuthGuard,
    DataService,
    LocalStorageService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true},
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig, deps: []  },
    { provide: APP_INITIALIZER, useFactory: configInitializer, deps: [HttpBackend, AuthClientConfig], multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
