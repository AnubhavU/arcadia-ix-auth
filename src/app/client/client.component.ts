import { LocalStorageService } from 'src/app/core/localstorage.service';
import { DataService } from './../services/data.service';
import { logging } from 'protractor';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { PayersService } from '../services/payers.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoaderService } from '../utility/loader/loader.service';
import { ErrorMessageService } from '../utility/error-message/error-message.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientComponent {
  formGroup: FormGroup;
  obj: any = {};
  scope1: any;
  scope2: any;
  scope3: any;
  editdata: any;
  scopeTypes: any = [
    { name: 'All', id: 'all' },
    { name: 'Clinical', id: 'clinical' },
    { name: 'Administrative', id: 'administrative' },
    { name: 'Financial', id: 'financial' },
    { name: 'Other', id: 'other' },
  ];
  scopesByType: any = [];
  allscopes: any = [];
  clinicalScopes: any = [];
  administrativeScopes: any = [];
  financialScopes: any = [];
  otherScopes: any = [
    { name: 'launch', id: 'launch', checked: true },
    { name: 'launch/patient', id: 'launch/patient', checked: true },
    { name: 'fhir_complete', id: 'fhir_complete', checked: true },
    { name: 'openid', id: 'openid', checked: true },
    { name: 'fhirUser', id: 'fhirUser', checked: true },
    { name: 'offline_access', id: 'offline_access', checked: true },
    { name: 'online_access', id: 'online_access', checked: true },
  ];
  isOther: boolean = false;
  selectedApplicationType: any = 'user';
  clientDetails: any;
  edit: boolean = false;
  selectedItems: any = [];
  count: any = 0;
  constructor(
    public apiservice: PayersService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router, private loader: LoaderService, private messageService: ErrorMessageService,
    private dataservice: DataService,
    private localStorage: LocalStorageService
  ) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      application_type: new FormControl('', [Validators.required]),
      contact_name: new FormControl('', [Validators.required]),
      contact_mail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      org_name: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      launch_uri: new FormControl(null, [Validators.required]),
      redirect_uri: new FormControl('', [Validators.required]),
      scopeType: new FormControl('', [Validators.required]),
      scope: this.formBuilder.array([]),
      confidentialClient: new FormControl('', [])
    });
    setTimeout((res) => {
      this.scope1 = [
        'user/Patient.read',
        'user/AllergyIntolerance.read',
        'user/CarePlan.read',
        'user/CareTeam.read',
        'user/Condition.read',
        'user/Device.read',
        'user/DiagnosticReport.read',
        'user/DocumentReference.read',
        'user/Encounter.read',
        'user/Goal.read',
        'user/Immunization.read',
        'user/Location.read',
        'user/Medication.read',
        'user/MedicationRequest.read',
        'user/Observation.read',
        'user/Organization.read',
        'user/Practitioner.read',
        'user/PractitionerRole.read',
        'user/Procedure.read',
        'user/Provenance.read',
        'user/RelatedPerson.read',
      ];
      this.scope2 = [
        'launch',
        'launch/patient',
        'fhir_complete',
        'openid',
        'fhirUser',
        'offline_access',
        'online_access',
        'patient/*.read',
        'patient/Patient.read',
        'patient/AllergyIntolerance.read',
        'patient/CarePlan.read',
        'patient/CareTeam.read',
        'patient/Condition.read',
        'patient/Device.read',
        'patient/DiagnosticReport.read',
        'patient/DocumentReference.read',
        'patient/Encounter.read',
        'patient/Goal.read',
        'patient/Immunization.read',
        'patient/Location.read',
        'patient/Medication.read',
      ];
      this.scope3 = [
        'patient/MedicationRequest.read',
        'patient/Observation.read',
        'patient/Organization.read',
        'patient/Practitioner.read',
        'patient/PractitionerRole.read',
        'patient/Procedure.read',
        'patient/Provenance.read',
        'patient/RelatedPerson.read',
      ];
    });
    this.formGroup.controls['application_type'].setValue('user');
    if (this.localStorage.getFromStorage('client')) {
      this.loader.show();
      this.edit = true;
      this.clientDetails = this.localStorage.getFromStorage('client');
      this.selectedItems = this.clientDetails.scopeType.split(',');

      if (this.clientDetails) {
        let getAppType = this.formGroup.get('application_type').value;
        this.selectedApplicationType = this.clientDetails.appType == 'provider' ? 'user' : this.clientDetails.appType;
      }
      this.getAllScopes("edit");
    } else {
      this.getAllScopes();
    }
  }

  getAllScopes(from?: any) {
    for (let item of this.scopeTypes) {
      if (item.id !== 'other') {
        this.getScopeByType(item.id, from);
      }
    }
  }

  //for copy to clipboard
  copyInputMessage(inputElement) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = inputElement;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  //upon check box check event
  onChange(event) {
    event.source.value.checked = !event.source.value.checked;
    const newArr = this.allscopes.map((element) => {
      return element;
    });
    this.allscopes = newArr;
  }

  getScopes() {
    let tempScopes = [];
    for (let item of this.formGroup.value.scopeType) {
      switch (item) {
        case 'all':
          this.allscopes.forEach((element) => {
            if (element.checked) {
              tempScopes.push(element.name);
            }
          });
          this.otherScopes.forEach((element) => {
            if (element.checked) {
              tempScopes.push(element.name);
            }
          });
          break;
        case 'clinical':
          this.clinicalScopes.forEach((element) => {
            if (element.checked) {
              tempScopes.push(element.name);
            }
          });
          break;
        case 'administrative':
          this.administrativeScopes.forEach((element) => {
            if (element.checked) {
              tempScopes.push(element.name);
            }
          });
          break;
        case 'financial':
          this.financialScopes.forEach((element) => {
            if (element.checked) {
              tempScopes.push(element.name);
            }
          });
          break;
        case 'other':
          this.otherScopes.forEach((element) => {
            if (element.checked) {
              tempScopes.push(element.name);
            }
          });
          break;
      }
    }
    return tempScopes;
  }

  //upon submit
  onSubmit() {
    let scopes = this.formGroup.value.scopeType;
    let myscopes = scopes.join(",");
    this.obj = {
      appType: this.formGroup.value.application_type,
      contact_name: this.formGroup.value.contact_name,
      contact_mail: this.formGroup.value.contact_mail,
      org_name: this.formGroup.value.org_name,
      name: this.formGroup.value.name,
      launchUri: this.formGroup.value.launch_uri,
      redirect_uri: this.formGroup.value.redirect_uri,
      confidentialClient: this.formGroup.value.confidentialClient,
      scope: this.getScopes().join(','),
      // userId: 1,
      userId: this.localStorage.getFromStorage('userId'),
      scopeType: myscopes
    };
    if (this.formGroup.valid) {
      this.loader.show();
      if (this.edit === false) {
        this.apiservice.clientRegistration(this.obj).subscribe(
          (result) => {
            if (result) {
              this.messageService.show('Success', 'Client Registered Successfully', 'success');
              setTimeout(() => {
                this.router.navigate(['registeredclientapps']);
                this.loader.hide();
              }, 3000);
            } else {
            }
          },
          (err) => {
            if (err.error.status != 200) {
              this.messageService.show('Error', err.error.message, 'error');
            }
            this.loader.hide();
          }
        );
      } else if (this.edit === true) {
        this.clientDetails['appType'] = this.formGroup.value.application_type,
          this.clientDetails['contact_name'] = this.formGroup.value.contact_name,
          this.clientDetails['contact_mail'] = this.formGroup.value.contact_mail,
          this.clientDetails['org_name'] = this.formGroup.value.org_name,
          this.clientDetails['name'] = this.formGroup.value.name,
          this.clientDetails['launchUri'] = this.formGroup.value.launch_uri,
          this.clientDetails['redirect_uri'] = this.formGroup.value.redirect_uri,
          this.clientDetails['confidentialClient'] = this.formGroup.value.confidentialClient,
          this.clientDetails['scopeType'] = myscopes,
          this.clientDetails['scope'] = this.getScopes().join(','),
          this.apiservice.updateclient(this.clientDetails).subscribe(result => {
            if (result) {
              this.messageService.show('Success', 'Client Updated Successfully', 'success');
              setTimeout(() => {
                this.router.navigate(['registeredclientapps']);
                this.loader.hide();
              }, 3000);
            } else {
            }
          }, (err) => {
            if (err.error.status != 200) {
              this.messageService.show('Error', err.error.message, 'error');
            }
            this.loader.hide();
          });
      }
    }
  }

  disabled(value) {
    if (this.formGroup.value.scopeType.includes(value)) {
      return true;
    }
  }

  onSelectType(event) {
    if (event.value.includes('all')) {
      this.formGroup.patchValue({
        scopeType: ['all'],
      });

      if (this.formGroup.controls['scopeType'].value == 'all') {
        const newArrAll = this.allscopes.map((element) => {
          element.checked = true;
          return element;
        });
        this.allscopes = newArrAll;

        const newArrOther = this.otherScopes.map((element) => {
          element.checked = true;
          return element;
        });
        this.otherScopes = newArrOther;
      }
    }
  }

  onChangeRadio(event) {
    setTimeout(() => {
      this.selectedApplicationType = event.value;
      this.getAllScopes();
      this.formGroup.patchValue({
        scopeType: [],
      });
    }, 100)
  }

  editclient(item) {
    if (item.scopeType == 'all') {
      for (let aitem of this.allscopes) {
        aitem['checked'] = false;
        for (let scope of item.scope.split(',')) {
          if (scope === aitem.name) {
            aitem['checked'] = true;
          }
        }
      }
      for (let aitem of this.otherScopes) {
        aitem['checked'] = false;
        for (let scope of item.scope.split(',')) {
          if (scope === aitem.name) {
            aitem['checked'] = true;
          }
        }
      }
    }

    for (let aitem of this.otherScopes) {
      aitem['checked'] = false;
      for (let scope of item.scope.split(',')) {
        if (scope === aitem.name) {
          aitem['checked'] = true;
        }
      }
    }

    for (let aitem of this.administrativeScopes) {
      aitem['checked'] = false;
      for (let scope of item.scope.split(',')) {
        if (scope === aitem.name) {
          aitem['checked'] = true;
        }
      }
    }
  
    for (let aitem of this.financialScopes) {
      aitem['checked'] = false;
      for (let scope of item.scope.split(',')) {
        if (scope === aitem.name) {
          aitem['checked'] = true;
        }
      }
    }
   
    for (let aitem of this.clinicalScopes) {
      aitem['checked'] = false;
      for (let scope of item.scope.split(',')) {
        if (scope === aitem.name) {
          aitem['checked'] = true;
        }
      }
    }

    this.formGroup.patchValue({
      application_type: (item.appType === 'provider') ? 'user' : item.appType,
      // userName: item.userName,
      name: item.name,
      contact_name: item.contact_name,
      // fullName: item.fullName,
      contact_mail: item.contact_mail,
      org_name: item.org_name,
      launch_uri: item.launchUri,
      redirect_uri: item.redirect_uri,
      confidentialClient: item.confidentialClient,
      // scopeType: item.scope
    });
    this.loader.hide();
  }

  getScopeByType(type, from?: any) {
    this.allscopes = [];
    this.clinicalScopes = [];
    this.administrativeScopes = [];
    this.financialScopes = [];
    this.apiservice.getScopeByType(type).subscribe((result) => {
      if (result) {
        let tempResult = [];
        this.count = this.count + 1;
        result.forEach((element, index, theArray) => {
          let obj = {
            name: this.selectedApplicationType + '/' + element + '.read',
            id: element,
            checked: true,
          };
          tempResult.push(obj);
          // theArray[index] = 'user/' + element + '.read';
        });
        switch (type) {
          case 'all':
            let temp =
              [
                {
                  name: this.selectedApplicationType + '/*.read',
                  id: this.selectedApplicationType + '/*.read',
                  checked: true,
                },
                {
                  name: this.selectedApplicationType + '/*.*',
                  id: this.selectedApplicationType + '/*.*',
                  checked: true
                }
              ];
            for (let i = 0; i < temp.length; i++) {
              tempResult.push(temp[i]);
            }

            this.allscopes = tempResult;
            break;
          case 'clinical':
            this.clinicalScopes = tempResult;
            break;
          case 'administrative':
            this.administrativeScopes = tempResult;
            break;
          case 'financial':
            this.financialScopes = tempResult;
            break;
        }
      }
      if (this.count >= 4) {
        this.editclient(this.clientDetails);
      }
    });
  }

  get formValidator() {
    return {
      type: this.formGroup.get('application_type'),
      contactName: this.formGroup.get('contact_name'),
      contactMail: this.formGroup.get('contact_mail'),
      orgName: this.formGroup.get('org_name'),
      name: this.formGroup.get('name'),
      lUri: this.formGroup.get('launch_uri'),
      rUri: this.formGroup.get('redirect_uri'),
    };
  }

  ngOnDestroy(): void {
    this.localStorage.remove('client');
  }
}
