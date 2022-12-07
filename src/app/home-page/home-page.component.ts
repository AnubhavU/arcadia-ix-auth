import { AuthService } from '@auth0/auth0-angular';
import { LocalStorageService } from 'src/app/core/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { RegistrationService } from '../services/registration.service';
import { ErrorMessageService } from '../utility/error-message/error-message.service';
import { LoaderService } from '../utility/loader/loader.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  getStartedForm: FormGroup;
  loginForm: FormGroup;
  permissionlist: any = [];
  notSame: any = false;
  constructor(private fb: FormBuilder, private regservice: RegistrationService, private dataService: DataService,
    private router: Router, private loader: LoaderService, private messageService: ErrorMessageService,
    private localStorage: LocalStorageService, public auth: AuthService) { }

  isLoginFormDisplay: boolean = false;

  ngOnInit() {
    // this.localStorage.clear();
    this.getStartedForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      middleName: [],
      lastName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required,Validators.pattern("^[0-9]{10}$")]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    },
      // { validator: this.checkpasswords }
      );
  }

  checkpasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmpassword.value;
    if(confirmPass.length >= 2){
      return pass === confirmPass ? this.notSame = false :  this.notSame = true ;
    }
  }

  submitGetStartedForm() {
    console.log('form',this.getStartedForm);
    this.loader.show();
    this.regservice.userRegistration(this.getStartedForm.value).subscribe((data) => {
      this.loader.hide();
      if (data && (data.status === 201) && 'body' in data) {
        this.getStartedForm.reset();
        this.messageService.show('Success', 'User Registered Successfully.', 'success');
      }
    }, (error) => {
      this.loader.hide();
      this.messageService.show('Error', error.error.messsage, 'error');
    });
  }

  get getStartedValidationDetails() {
    return {
      firstName: this.getStartedForm.get('firstName'),
      email: this.getStartedForm.get('email'),
      lastName: this.getStartedForm.get('lastName'),
      mobileNumber: this.getStartedForm.get('mobileNumber'),
      password: this.getStartedForm.get('password'),
      confirmpassword: this.getStartedForm.get('confirmpassword'),
    };
  }
}
