import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authurl, base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  userRegistration(obj: any): Observable<any> {
    return this.http.post(base_url + authurl + '/user/register', obj, { observe: 'response' });
  }

  userlogin(obj: any): Observable<any> {
    return this.http.post(base_url + authurl + '/user/login', obj, { observe: 'response' });
  }

  authUserLogin(username, password, transaction_id): Observable<any> {
    return this.http.post(base_url + authurl + '/api/authorize/userValidate?userName=' + username + "&password=" + password + "&transaction_id=" + transaction_id, {}, { observe: 'response', responseType: 'text' })
  }

}
