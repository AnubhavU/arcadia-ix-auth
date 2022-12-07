import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ErrorMessageService } from 'src/app/utility/error-message/error-message.service';
import { LoaderService } from 'src/app/utility/loader/loader.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  getStartedForm: FormGroup;
  dialogdata: any;
  roles: any;
  constructor(@Inject(MAT_DIALOG_DATA) data: string, private fb: FormBuilder, private userservice: UserService,
    private dialogRef: MatDialogRef<UserFormComponent>, private loader: LoaderService,
    private messageservice: ErrorMessageService) {
    this.dialogdata = data;

  }

  ngOnInit() {
    this.roles = JSON.stringify(this.dialogdata.roles);
    this.roles = JSON.parse(this.roles);
    this.getStartedForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: [],
      lastName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      userId: [],
    });
    this.edit(this.dialogdata.data);
  }

  edit(item) {
    this.getStartedForm.patchValue({
      userId: item.userId,
      // userName: item.userName,
      email: item.email,
      role: item.roleid,
      // fullName: item.fullName,
      firstName: item.firstName,
      middleName: item.middleName,
      lastName: item.lastName,
      mobileNumber: item.mobileNumber,
    });
  }

  submitGetStartedForm(getStartedForm) {
    this.loader.show();
    this.userservice.updateuser(this.getStartedForm.value).subscribe((data) => {
      if (data) {
        let param = {
          userId: this.getStartedForm.value.userId,
          userRole: [1]
        };
        this.loader.hide();
        this.loader.show();
        this.userservice.updaterole(param).subscribe(data => {
          if (data) {
            this.dialogRef.close();
            this.loader.hide();
            this.messageservice.show('Success', 'User Updated Successfully', 'success')
          }
        }, (error) => {
          this.loader.hide();
        });
      }
    }, (error) => {
      this.loader.hide();
    });
  }
}
