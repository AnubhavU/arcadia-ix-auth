import { DataService } from './../services/data.service';
import { AuthService } from '@auth0/auth0-angular';
import { LocalStorageService } from 'src/app/core/localstorage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Auth0Service } from '../services/auth0.service';

@Injectable()
export class CustomAuthGuard implements CanActivate {
  constructor(private router: Router, private localStorage: LocalStorageService,
    public auth: AuthService, public auth0Service: Auth0Service, public dataService: DataService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.auth.getAccessTokenSilently().subscribe(data => {
      this.auth0Service.getAuth0ClientUSerDetails().subscribe(data => {
        this.localStorage.setToStorage('isLogin', 'true');
        let temp = {
          userPermissions: data['userRole'],
          email: data['email'],
          name: data['name'],
          userId: data['userId']
        }
        this.localStorage.setToStorage("userId", data['userId']);
        this.localStorage.setToStorage("userDetails", temp);
        this.dataService.sendUserType(temp);
        this.router.navigate(['/registeredclientapps']);
      });
    });

    // this.router.navigate(['/home']);
    return true;
  }

}



// else if((localStorage.getItem('dashboard') == 'userdashBoard' && state.url == '/adminDashboard')
//             || localStorage.getItem('dashboard') == 'adminDashboard' && state.url == '/userdashBoard') {
//             this.router.navigate(['/'+localStorage.getItem('dashboard')]);
//             return false
//         }
