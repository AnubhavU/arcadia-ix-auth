import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { RegisteredClientComponent } from './registered-client/registered-client.component';
import { BackendClientRegistrationComponent } from './backend-client-registration/backend-client-registration.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { ScopesListComponent } from './scopes-list/scopes-list.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { BackendClientComponent } from './backend-client/backend-client.component';
import { NoContentComponent } from './no-content/no-content.component';
import { ApiSpecificationsComponent } from './api-specifications/api-specifications.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisteredAppsComponent } from './registered-apps/registered-apps.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CustomAuthGuard } from './core/auth.gaurd';
import { AuthGuard } from '@auth0/auth0-angular';
import { AppRequestsComponent } from './app-requests/app-requests.component';
import { OauthTutorialComponent } from './oauth-tutorial/oauth-tutorial.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: '', component: HomePageComponent, canActivate: [CustomAuthGuard]},
  { path: 'home', component: HomePageComponent, canActivate: [CustomAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'api-specifications', component: ApiSpecificationsComponent, data: { roles: ['ADMIN', 'DEVELOPER'] } },
  { path: 'oauth-tutorial', component: OauthTutorialComponent, data: { roles: ['ADMIN', 'DEVELOPER'] } },
  // { path: 'client', component: ClientComponent, canActivate: [AuthGuard], data: { roles: ['DEVELOPER'] } },
  { path: 'registeredclients', component: RegisteredClientComponent, canActivate: [AuthGuard], data: { roles: ['DEVELOPER'] } },
  {
    path: 'backendclientregistration',
    component: BackendClientRegistrationComponent, canActivate: [AuthGuard], data: { roles: ['DEVELOPER'] }
  },
  { path: 'patientlist', component: PatientListComponent, data: { roles: ['ADMIN', 'DEVELOPER'] } },
  { path: 'scopelist', component: ScopesListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'DEVELOPER'] } },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'error', component: NoContentComponent },
  { path: 'registeredclientapps', component: RegisteredAppsComponent, canActivate: [AuthGuard], data: { roles: ['DEVELOPER'] } },
  { path: 'usermanagement', component: UserManagementComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'backendclient', component: BackendClientComponent, canActivate: [AuthGuard], data: { roles: ['DEVELOPER'] } },
  { path: 'app-requests', component: AppRequestsComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
