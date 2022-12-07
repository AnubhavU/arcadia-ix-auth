import { LocalStorageService } from 'src/app/core/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user.service';
import { ErrorMessageService } from '../utility/error-message/error-message.service';
import { LoaderService } from '../utility/loader/loader.service';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  userDisplayColumns = ['userId', 'email', 'permission', 'mobileNumber', 'lastUpdatedTime', 'userActive', 'actions'];
  userdataSource: MatTableDataSource<any>;
  roledata: any;
  constructor(private userservice: UserService, private dialog: MatDialog, private loader: LoaderService,
    private messageService: ErrorMessageService, private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.getuserslist();
    this.getroleslist();
  }

  getuserslist() {
    this.loader.show();
    this.userservice.getusers().subscribe((data) => {
      let userlist = [];
      this.loader.hide();
      for (let item of data) {
        if (this.localStorage.getFromStorage('userId') !== item.userId) {
          if ('userRole' in item && item.userRole instanceof Array) {
            for (let ritem of item.userRole) {
              if ('roleId' in ritem && 'permissionNames' in ritem) {
                item['roleid'] = ritem.roleId;
                item['permission'] = ritem.permissionNames;
                if(ritem.roleName != 'Patient'){
                  userlist.push(item);
                }
              }
            }
          }
          // userlist.push(item);
        }
      }
      this.userdataSource = new MatTableDataSource<any>(userlist);
    });
  }

  getroleslist() {
    this.userservice.getroles().subscribe((data) => {
      this.roledata = data;
    });
  }

  activation(el) {
    this.loader.show();
    let status = el.userActive ? ' Deactivated ' : ' Activated '
    this.userservice.useractivate(el.userId, !el.userActive).subscribe((data) => {
      this.messageService.show('Success', 'User' + status + 'Successfully', 'success');
      this.loader.hide();
      if (data) {
        this.getuserslist();
      }
    }, (error) => {
      this.messageService.show('Error', error.error.message, 'error');
      this.loader.hide();
    });
  }


  editUser(ev, type) {
    let value = { title: type, data: ev, roles: this.roledata };
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: value,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getuserslist();
    });
  }

}
