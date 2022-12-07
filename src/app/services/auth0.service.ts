import { LocalStorageService } from 'src/app/core/localstorage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authurl, base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {

  constructor(private _http: HttpClient, private localStorage: LocalStorageService) { }

  getloggedInuserRoles(): Observable<any> {
    return this._http.get("https://dev-2yq4yxzg.us.auth0.com" + '/userinfo')
  }

  getAuth0ClientUSerDetails(): Observable<any> {
    return this._http.get(base_url + "/api/user")
  }

}
