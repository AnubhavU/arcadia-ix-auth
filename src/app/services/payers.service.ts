import { LocalStorageService } from 'src/app/core/localstorage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { authurl, base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayersService {
  constructor(private _http: HttpClient, private localStorage: LocalStorageService) {
  }

  // clientRegistration(obj: any): Observable<any> {
  //   return this._http.post(base_url + '/api/client/', obj, { observe: 'response' })
  // }

  clientRegistration(obj): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    let options = { headers: headers };
    const url = base_url + authurl + '/api/client/';
    return this._http.post(url, obj, options);
  }

  // Registeredclients() {
  //   return this._http.get(base_url + '/api/client/list/1')
  // }
  Registeredclients(): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    return this._http.get(base_url + authurl + '/api/client/list/' + this.localStorage.getFromStorage('userId'), { headers: reqHeader });
  }

  updateclient(obj): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    let options = { headers: headers };
    const url = base_url + authurl + '/api/client/';
    return this._http.put(url, obj, options);
  }

  apprequests(): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    return this._http.get(base_url + authurl + '/api/clients', { headers: reqHeader });
  }

  getappbystatus(status): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    return this._http.get(base_url + authurl + '/api/client/listbystatus/' + status, { headers: reqHeader });
  }

  launch(id, patientid): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.localStorage.getFromStorage('token'),
      'Content-Type': 'text/plain',
    });
    let options = { headers: headers };
    const url = base_url + authurl + '/api/client/' + id + '/' + patientid;
    return this._http.put(url, { observe: 'response', responseType: 'text' }, options);
  }

  backendClientRegistration(name, org_name, issuer, scope, userId, fileToUpload) {
    let formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    var reqHeader = new HttpHeaders({
      enctype: 'multipart/form-data',
    });
    return this._http.post(base_url + authurl + '/api/client/backendclient/?name=' + name + '&org_name=' + org_name + '&userId=1&issuer=' + issuer + '&scope=' + scope, formData, { headers: reqHeader });
  }

  patientList(param): Observable<any> {
    let queryParams = '';
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        queryParams += `${key}=${param[key]}&`;
      }
    }
    queryParams = queryParams.slice(0, -1);
    return this._http.get(base_url + '/InteropXFHIR/launchpatient?' + queryParams);
  }
  launchPatient(dataid: any, transaction_id): Observable<any> {
    const url = base_url + authurl + '/api/authorize/launchpatient?id=';
    var reqHeader = new HttpHeaders({
      Contenttype: 'application/json'
    });
    return this._http.post(url + dataid + '&transaction_id=' + transaction_id, { headers: reqHeader },
      { observe: 'response', responseType: 'text' });
  }

  updatestatus(param): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    let options = { headers: headers };
    return this._http.put(base_url + authurl + '/api/client/status', param, options);
  }

  scopelist(obj: any, transaction_id): Observable<any> {
    const url = base_url + authurl + '/api/authorize/' + '&transaction_id=' + transaction_id;
    return this._http.post(url, obj);
  }

  authorization(scope: any, transaction_id, allow): Observable<any> {
    const url = base_url + authurl + '/api/authorize?scopes=' + scope + '&transaction_id=' + transaction_id + '&request_type=' + allow;
    var reqHeader = new HttpHeaders({
      Contenttype: 'application/json'
    });
    return this._http.post(url, { headers: reqHeader }, { observe: 'response', responseType: 'text' });
  }

  backendClient(obj: any): Observable<any> {
    // return this._http.post(base_url + '/api/client/backendclient/', obj, { observe: 'response' })
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    let options = { headers: headers };
    const url = base_url + authurl + '/api/client/backendclient/';
    return this._http.post(url, obj, options);
  }

  updateBackendclient(obj): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    let options = { headers: headers };
    const url = base_url + authurl + '/api/client/backendclient/';
    return this._http.put(url, obj, options);
  }

  getScopeByType(type: any): Observable<any> {
    let dev_url = 'https://dev.interopx.com';
    var reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.localStorage.getFromStorage('token')
    });
    return this._http.get(base_url + authurl + '/api/getresources?type=' + type, { headers: reqHeader });
  }


}
