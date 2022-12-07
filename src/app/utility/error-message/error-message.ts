import { LocalStorageService } from 'src/app/core/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ErrorMessageService } from './error-message.service';
import { ErrorStateMessageParam } from './errormessage';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.html',
  styleUrls: ['./error-message.scss']
})
export class ErrorMessageComponent implements OnInit {
  show = false;

  private messageSubscription: Subscription;
  message: ErrorStateMessageParam;
  isClose = true;
  selectedIcon: any = 'error';
  iconNames = {
    success: 'check_circle',
    error: 'block',
    warning: 'report_problem',
    info: 'info'
  };

  constructor(private errormessageService: ErrorMessageService, private localStorage: LocalStorageService) {

    const tempMsg = this.localStorage.getFromStorage('tempErrorMessage');
    if (tempMsg) {
      this.isClose = false;
      // this.message = JSON.parse(tempMsg);
      this.message = tempMsg;
      this.selectedIcon = this.iconNames[this.message.type];
    }



  }

  ngOnInit() {
    this.messageSubscription = this.errormessageService.errormessageState.subscribe((message: ErrorStateMessageParam) => {
      this.message = message;
      this.localStorage.setToStorage('tempErrorMessage', message);
      this.selectedIcon = this.iconNames[this.message.type];
      this.isClose = false;
      // setTimeout(() => {
      //   this.isClose = true;
      //   this.localStorage.remove('tempErrorMessage');
      // }, 5000);
    });
  }

  onClose() {
    this.isClose = true;
    this.localStorage.remove('tempErrorMessage');
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
    this.isClose = true;
    this.localStorage.remove('tempErrorMessage');
  }

}
