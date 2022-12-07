import { Component, Input, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from './services/data.service';
import { LocalStorageService } from './core/localstorage.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() headerName: any;
  isSidemenuNeeded: boolean = false;
  menuItemsPath: any = [];
  notificationOptions = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    position: ['bottom', 'right'],
  };
  // @Input() isSidemenuNeeded: any;

  menuItems: any = [
    {
      id: '1',
      name: 'Registered Clients',
      // image: 'patient-icon.svg',
      image: '',
      icon: 'verified_user',
      path: 'registeredclientapps',
      type: 'item',
      permissionRequired: ['developer', 'admin'],
    },
    // {
    //   id: '2',
    //   name: ' OAuth Client Registration',
    //   image: '',
    //   icon: 'how_to_reg',
    //   path: 'client',
    //   type: 'item',
    //   permissionRequired: ['developer', 'admin'],
    // },
    {
      id: '3',
      name: 'Backend Client Registration',
      // image: 'analytics-icon.svg',
      image: '',
      icon: 'person_outline',
      path: 'backendclient',
      type: 'item',
      permissionRequired: ['developer', 'admin'],
    },
    // {
    //   id: "3",
    //   name: "Registered clients",
    //   image: "patient-icon.svg",
    //   path: "registeredclients",
    //   type: "item",
    //   permissionRequired: ['ADMIN', 'DEVELOPER'],
    // },
    {
      id: '4',
      name: 'Apps',
      icon: 'apps',
      path: 'app-requests',
      type: 'item',
      permissionRequired: ['admin'],
    },
    // {
    //   id: "5",
    //   name: "Practices",
    //   image: "patient-icon.svg",
    //   path: "practices",
    //   type: "item",
    //   permissionRequired: ['ADMIN']
    // },

    // {
    //   id: '5',
    //   name: 'User Management',
    //   image: 'patient-icon.svg',
    //   path: 'usermanagement',
    //   type: 'item',
    //   permissionRequired: ['ADMIN'],
    // },
    // {
    //   id: '3',
    //   name: "Patient List",
    //   image: 'userdashboard.png',
    //   path: 'patientlist',
    //   type: 'item'
    // },
    // {
    //   id: '4',
    //   name: "Scope List",
    //   image: 'patient-icon.svg',
    //   path: 'scopelist',
    //   type: 'item'
    // },
  ];

  title = 'interopX-Client';
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isSelectedTab: any;
  selectedList: any;
  userEmail: any;
  showProgressMsg: boolean = false;
  dashboardType: any;
  isAdmin: any = false;
  service: any;
  permissionLists: any = [];
  redirectPath: any;
  groupper: any = [];
  constructor(private router: Router, private dataService: DataService, private localStorage: LocalStorageService, public auth: AuthService) {
    // auth.logout();
    // auth.loginWithRedirect();

    // this.localStorage.clear();
    this.isSidemenuNeeded = false;

    this.loginConfiguration();

    this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        this.isSelectedTab = data['url'].split('/')[1];
        if (this.isSelectedTab.includes('?')) {
          this.isSelectedTab = this.isSelectedTab.split('?')[0];
        }
        if (data['url'] === '/home') {
          if (this.localStorage.getFromStorage('isLogin')) {
            this.isSidemenuNeeded = true;
            this.router.navigate(['/' + this.redirectPath]);
          }
          else {
            this.isSidemenuNeeded = false;
          }
        }
        else if (data['url'].includes('/authentication?') || data['url'] === '/patientlist') {
          this.isSidemenuNeeded = false;
        } else {
          if (this.localStorage.getFromStorage('isLogin')) {
            this.isSidemenuNeeded = true;
          }
          else {
            this.isSidemenuNeeded = false;
          }
        }
      }
    });

    this.service = this.dataService.userType.subscribe(data => {
      this.localStorage.setToStorage('userDetails', data);
      this.loginConfiguration();
    });
  }

  loginConfiguration() {
    let userDetails: any = {};
    // userDetails = JSON.parse(localStorage.getItem('userDetails'));
    userDetails = this.localStorage.getFromStorage('userDetails');
    if (userDetails && !(userDetails.userPermissions.includes('PATIENT'))) {
      this.localStorage.setToStorage('isLogin', 'true');
      this.isSidemenuNeeded = true;
      this.permissionLists = userDetails['userPermissions'];
      if ('userPermissions' in userDetails) {
        this.groupper = userDetails['userPermissions'];
      }
      this.userEmail = 'email' in userDetails ? userDetails['email'] : '';
      // this.inactive();
    }


    this.getpermisssionforPage(this.menuItems);
    this.localStorage.setToStorage('permisionActive', this.menuItemsPath);
    // localStorage.setItem('permisionActive', JSON.stringify(this.menuItemsPath));

    for (let item of this.menuItemsPath) {
      if (item.isActive) {
        this.redirectPath = item.path;
        this.localStorage.setToStorage('dashboard', this.redirectPath);
        break;
      }
    }
  }

  getpermisssionforPage(array) {
    let tempReturn;
    if (array.type === 'item') {
      tempReturn = this.isInPermission(array.permissionRequired);
      array['isActive'] = tempReturn;
      this.menuItemsPath.push(array);
    }

    if (array.type === 'group') {
      for (let item of array.subMenu) {
        this.getpermisssionforPage(item);
      }

    }

    if (array instanceof Array) {
      for (let item of array) {
        this.getpermisssionforPage(item);
      }
    }
  }

  isInPermission(item) {
    if (item.length <= 0) {
      return true;
    } else {
      const found = this.groupper.some(it => {
        return item.includes(it.toLowerCase());
      });
      return found;
    }

  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  onSelect(list): void {
    list.hide = !list.hide;
    this.selectedList = list;
  }

  onSelectTab(selectedTab) {
    selectedTab['show'] = !selectedTab['show'];
    if (selectedTab.name !== 'client') {
      this.isSelectedTab = selectedTab.path;
    }
    if ('path' in selectedTab) {
      this.router.navigate(['/' + selectedTab.path]);
    }
  }
  logout() {
    this.auth.logout();
    this.localStorage.clear();
    this.isSidemenuNeeded = false;
    this.router.navigate(['/home']);
  }
}
