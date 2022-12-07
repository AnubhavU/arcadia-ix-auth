import { LocalStorageService } from 'src/app/core/localstorage.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: "app-adminpanel",
  templateUrl: "./adminpanel.component.html",
  styleUrls: ["./adminpanel.component.scss"],
})
export class AdminpanelComponent implements OnChanges {
  @Input() headerName: any;

  menuItemsPath: any = [];
  notificationOptions = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    position: ["bottom", "right"],
  };
  @Input() isSidemenuNeeded: any;

  menuItems: any = [
    {
      id: "0",
      name: "OAuth Client Registration",
      image: 'userdashboard.png',
      path: 'client',
      type: 'item',
      permissionRequired: ['ADMIN', 'DEVELOPER'],
    },
    {
      id: "1",
      name: "Backend Client Registration",
      image: 'analytics-icon.svg',
      path: 'backendclient',
      type: 'item',
      permissionRequired: ['ADMIN', 'DEVELOPER'],
    },
    {
      id: "2",
      name: "Registered clients",
      image: "patient-icon.svg",
      path: "registeredclients",
      type: "item",
      permissionRequired: ['ADMIN', 'DEVELOPER'],
    },
    {
      id: "3",
      name: "Apps",
      image: "patient-icon.svg",
      path: "app-requests",
      type: "item",
      permissionRequired: ['ADMIN', 'DEVELOPER'],
    },
    {
      id: "4",
      name: "Practices",
      image: "patient-icon.svg",
      path: "practices",
      type: "item",
      permissionRequired: ['ADMIN', 'DEVELOPER'],
    },
    {
      id: '2',
      name: "Registered Apps",
      image: 'patient-icon.svg',
      path: 'registeredapps',
      type: 'item',
      permissionRequired: ['ADMIN', 'DEVELOPER'],
    },
    {
      id: '2',
      name: "User Management",
      image: 'patient-icon.svg',
      path: 'usermanagement',
      type: 'item',
      permissionRequired: ['ADMIN'],
    },
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

  title = "interopX-Client";
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
  constructor(private router: Router, private dataService: DataService, private localStorage: LocalStorageService) {
    // this.router.events.subscribe((data) => {
    //   if (data instanceof NavigationEnd) {
    //     this.isSelectedTab = data["url"].split("/")[1];
    //     console.log("isSelectedTab", this.isSelectedTab);
    //   }
    // });

    this.loginConfiguration();

    this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        this.isSelectedTab = data['url'].split('/')[1];
        if (this.isSelectedTab.includes('?')) {
          this.isSelectedTab = this.isSelectedTab.split('?')[0];
        }
        if (data['url'] === "/home" && this.localStorage.getFromStorage('isLogin')) {
          this.router.navigate(['/' + this.redirectPath]);
        }
      }
    });

    this.service = this.dataService.userType.subscribe(data => {
      this.localStorage.setToStorage('userDetails', data);
      this.loginConfiguration();
    });
  }

  loginConfiguration() {
    let userDetails = {};
    this.localStorage.setToStorage('path', 'client');
    userDetails = this.localStorage.getFromStorage('userDetails');
    if (userDetails) {
      this.localStorage.setToStorage('isLogin', 'true');
      this.permissionLists = userDetails['userPermissions'];
      this.groupper = userDetails['userPermissions'];
      if ('userPermissions' in userDetails) {
        this.groupper = userDetails['userPermissions'];
      }
      this.userEmail = 'email' in userDetails ? userDetails['email'] : '';
      // this.inactive();
    }


    this.getpermisssionforPage(this.menuItems);
    this.localStorage.setToStorage('permisionActive', this.menuItemsPath);

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
        return item.includes(it);
      });
      return found;
    }

  }

  ngOnChanges() {
  }

  onSelect(list): void {
    list.hide = !list.hide;
    this.selectedList = list;
  }

  onSelectTab(selectedTab) {
    selectedTab["show"] = !selectedTab["show"];
    if (selectedTab.name != "client") {
      this.isSelectedTab = selectedTab.path;
    }
    if ("path" in selectedTab) {
      this.router.navigate(["/" + selectedTab.path]);
    }
  }
  logout() {
    this.localStorage.clear();
    this.router.navigate(['/home']);
  }
}
