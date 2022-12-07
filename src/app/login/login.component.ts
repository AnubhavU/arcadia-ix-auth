import { LocalStorageService } from 'src/app/core/localstorage.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { DataService } from '../services/data.service';
import { LoaderService } from '../utility/loader/loader.service';
import { ErrorMessageService } from '../utility/error-message/error-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  permissionlist: any = [];
  trans_id: any;

  constructor(
    private fb: FormBuilder, private dataService: DataService,
    private router: Router, private regservice: RegistrationService, private loader: LoaderService,
    // private dialogRef: MatDialogRef<LoginComponent>,
    private messageService: ErrorMessageService,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalStorageService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.trans_id = params['transaction_id'];
      console.log('trans id', this.trans_id);
      if ('error' in params) {
        this.messageService.show('Error', params.error, 'error');
      }
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string) {
    return (
      (this.form.get(field).invalid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.router.navigate(['/client']);
    }
  }

  submitLoginForm() {
    this.loader.show();
    if (this.form.valid) {
      if (this.trans_id) {
        let username = this.form.controls['email'].value;
        let pswd = this.form.controls['password'].value;
        this.regservice.authUserLogin(username, pswd, this.trans_id).subscribe((data) => {
          this.loader.hide();
          if (data && 'body' in data) {
            window.location.replace(data.body);
          }
        }, (error) => {
          if ('error' in error) {
            this.messageService.show('Error', error.error, 'error');
            this.router.navigate(['/login']);
            this.loader.hide();
          }
        }
        );
      } else {
        this.regservice.userlogin(this.form.value).subscribe((data) => {
          this.loader.hide();
          let permissions = [];
          if (data && (data.status === 200) && 'body' in data) {
            this.messageService.show('Success', 'User LoggedIn Successfully', 'success');
            // this.dialogRef.close();
            this.localStorage.setToStorage('isLogin', 'true');
            this.localStorage.setToStorage('user', data.body.userName);
            this.localStorage.setToStorage('userId', data.body.userId);
            if ('userRole' in data.body && data.body.userRole instanceof Array) {
              for (let item of data.body.userRole) {
                if ('roleId' in item) {
                  if ('roleName' in item) {
                    permissions.push(item.roleName);
                    if (item.roleName == 'Patient') {
                      this.messageService.show('Error', 'Invalid user', 'error');
                      this.router.navigate(['/login']);
                    }
                  }
                  if ('permissionNames' in item && item.permissionNames instanceof Array) {
                    for (let rolepermission of item.permissionNames) {
                      this.permissionlist.push(rolepermission);
                    }
                  }
                }
              }
            }
          }
          this.localStorage.setToStorage('token', data.body.accessToken);
          data.body['userPermissions'] = this.permissionlist;
          this.dataService.sendUserType(data.body);
          if (this.permissionlist.includes('DEVELOPER')) {
            this.router.navigate(['/registeredclientapps']);
          } else if (this.permissionlist.includes('ADMIN')) {
            this.router.navigate(['/app-requests']);
          }
        }, (error) => {
          if ('error' in error) {
            this.messageService.show('Error', error.error, 'error');
            this.router.navigate(['/login']);
            this.loader.hide();
          }
        }
        );
      }
    }
  }
}
