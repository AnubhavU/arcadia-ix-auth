import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorStateMessageParam } from './errormessage';

export type ErrorMessageType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  private errormessageSubject = new Subject<ErrorStateMessageParam>();

  errormessageState = this.errormessageSubject.asObservable();


  constructor() { }

  show(title: any, message: any, type: ErrorMessageType) {
    this.errormessageSubject.next(<ErrorStateMessageParam>{ title: title, message: message, type: type });
  }

}
