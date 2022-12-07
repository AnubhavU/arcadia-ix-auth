import { LocalStorageService } from 'src/app/core/localstorage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authurl, base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient, private localStorage: LocalStorageService) { }

  getroles(): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    return this._http.get(base_url + authurl + '/api/sofroles', { headers: reqHeader })
  }

  getusers(): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    return this._http.get(base_url + authurl + '/user/list', { headers: reqHeader })
  }

  useractivate(userid, status): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    let options = { headers: headers };
    const url = base_url + authurl + '/user/activation/' + userid + '/' + status
    return this._http.post(url, null, options);
  }

  updateuser(obj): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    let options = { headers: headers };
    const url = base_url + authurl + '/user/updateuser'
    return this._http.put(url, obj, options);
  }

  updaterole(obj): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    let options = { headers: headers };
    const url = base_url + authurl + '/user/updaterole'
    return this._http.put(url, obj, options);
  }
}
