import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { PayersService } from '../services/payers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-backend-client-registration',
  templateUrl: './backend-client-registration.component.html',
  styleUrls: ['./backend-client-registration.component.scss']
})
export class BackendClientRegistrationComponent implements OnInit {
  file: string;
  formGroup: FormGroup;
  obj: any = {};  
  scope1: any;
  fileToUpload: File = null;

  constructor(public apiservice: PayersService, private formBuilder: FormBuilder, private toastr: ToastrService,) {
    setTimeout((res) => {
      this.scope1 = ["system/*.read", "user/*.read"];
    });
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      org_name: new FormControl(null, [Validators.required]),
      issuer: new FormControl(null, [Validators.required]),
      scope: this.formBuilder.array([])
    });
  }

  onChange(event) {
    const interests = <FormArray>this.formGroup.get('scope') as FormArray;

    if (event.checked) {
      interests.push(new FormControl(event.source.value))
    } else {
      const i = interests.controls.findIndex(x => x.value === event.source.value);
      interests.removeAt(i);
    }
  }

  handleChange(files: FileList) {
    if (files && files.length) {
      this.file = files[0].name;
      this.fileToUpload = files.item(0);
    }
  }

  onSubmit() {
    let name = this.formGroup.value.name;
    let org_name = this.formGroup.value.orgName;
    let issuer = this.formGroup.value.issuer;
    let scope = this.formGroup.value.scope.join(",")
    let userId = 1

    this.apiservice.backendClientRegistration(name, org_name, issuer, scope, userId, this.fileToUpload).subscribe(result => {
      this.toastr.success('Successfully Submitted your Registration'), {
        progressBar: true,
        timeOut: 2000,
        progressAnimation: 'increasing'
      };
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

}
