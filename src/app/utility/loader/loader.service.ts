import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LoaderState } from './loader';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  xAuthToken: any;
  username: any;
  uId: any;

  private loaderSubject = new Subject<LoaderState>();

  loaderState = this.loaderSubject.asObservable();

  constructor(private toastr: ToastrService) { }

  public showNotificationMsg(
    message: string,
    type: NotificationType = 'info',
    title?: string,
  ) {
    this.toastr[type](message, title);
    // this.notificationService[type](
    //   title,
    //   message,
    //   overrideOptions
    // );
  }

  show() {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }

  hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}
