import { LocalStorageService } from 'src/app/core/localstorage.service';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() disHeaderName: any;
  userEmail: any;
  headerMenus: any = [
    { routerLink: 'home', linkName: 'Home', linkIconName: 'home' },
    { routerLink: 'config', linkName: 'Config', linkIconName: 'settings_applications' }
  ];
  constructor(private localStorage: LocalStorageService) { }

  ngOnChanges() {
  }

  ngOnInit() {
    let userDetails = {};
    userDetails = this.localStorage.getFromStorage('userDetails');
    if (userDetails) {
      this.userEmail = 'email' in userDetails ? userDetails['email'] : '';
      // this.inactive();
    }
  }

}
