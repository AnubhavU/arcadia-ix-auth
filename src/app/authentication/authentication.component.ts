import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { PayersService } from '../services/payers.service';
import { MatDialog } from '@angular/material/dialog';
import { ScopePopupComponent } from './scope-popup/scope-popup.component';
import { CLINICAL, DEMOGRAPHICS, FINANCIAL, MAINSCOPES, SECURITY, USER_CLINICAL, USER_DEMOGRAPHICS, USER_FINANCIAL, USER_MAINSCOPES, USER_SECURITY, OTHER, USER_OTHER } from './scope-list';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  formGroup: FormGroup;
  scope = '';
  transaction_id: '';
  scope1: any;
  name: any;
  cName: any;
  cName1: any;
  name1: any;
  appType: any;
  requesttype: any;
  redirectedurl: any;
  //Patient App Scopes
  demographics: any = DEMOGRAPHICS;
  clinical: any = CLINICAL;
  finantial: any = FINANCIAL;
  mainScopes: any = MAINSCOPES;
  security: any = SECURITY;
  other: any = OTHER;
  isDemographicsIndeterminate: any;
  isClinicalIndeterminate: any;
  isFinancialIndeterminate: any;
  isSecurityIndeterminate: any;
  isOtherIndeterminate: any;

  //Provider App Scopes
  user_demographics: any = USER_DEMOGRAPHICS;
  user_clinical: any = USER_CLINICAL;
  user_finantial: any = USER_FINANCIAL;
  user_mainScopes: any = USER_MAINSCOPES;
  user_security: any = USER_SECURITY;
  user_other: any = USER_OTHER;
  user_isDemographicsIndeterminate: any;
  user_isClinicalIndeterminate: any;
  user_isFinancialIndeterminate: any;
  user_isSecurityIndeterminate: any;
  user_isOtherIndeterminate: any;

  finalScopeList: any = [];

  constructor(private actRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public apiservice: PayersService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(data => {
      this.scope = data.scope;
      this.transaction_id = data.transaction_id;
      this.name = data.name;
      this.cName = data.cName;
      this.appType = data.appType;
      this.redirectedurl = data.redirect_uri;
    });
    let temp = new Array();
    temp = this.scope.split(',');
    this.scope1 = temp;

    let temp1 = new Array();
    temp1 = this.name.split(',');
    this.name1 = temp1;

    let temp2 = new Array();
    temp2 = this.cName.split(',');
    this.cName1 = temp2;

    this.formGroup = this.formBuilder.group({
      scope: this.formBuilder.array([]),
    });

    if (this.appType === 'patient') {
      const scopearray = <FormArray>this.formGroup.get('scope') as FormArray;
      for (let item of this.scope1) {
        scopearray.push(new FormControl(item));
      }

      for (let scope of this.scope1) {
        this.demographics.some(it => {
          if ((scope === it.scope) || (scope.includes('patient/*.read') && it.scope.includes('.read'))) {
            it.checked = true;
          }
        });

        this.clinical.some(it => {
          if ((scope === it.scope) || (scope.includes('patient/*.read') && it.scope.includes('.read'))) {
            it.checked = true;
          }
        });

        this.finantial.some(it => {
          if ((scope === it.scope) || (scope.includes('patient/*.read') && it.scope.includes('.read'))) {
            it.checked = true;
          }
        });

        this.security.some(it => {
          if ((scope === it.scope) || (scope.includes('patient/*.read') && it.scope.includes('.read'))) {
            it.checked = true;
          }
        });

        this.other.some(it => {
          if ((scope === it.scope) || (scope.includes('patient/*.read') && it.scope.includes('.read'))) {
            it.checked = true;
          }
        });
      }
    }

    if (this.appType === 'user') {
      const scopearray = <FormArray>this.formGroup.get('scope') as FormArray;
      for (let item of this.scope1) {
        scopearray.push(new FormControl(item));
      }

      for (let scope of this.scope1) {
        this.user_demographics.some(it => {
          if (scope === it.scope) {
            it.checked = true;
          }
        });

        this.user_clinical.some(it => {
          if (scope === it.scope) {
            it.checked = true;
          }
        });

        this.user_finantial.some(it => {
          if (scope === it.scope) {
            it.checked = true;
          }
        });

        this.user_security.some(it => {
          if (scope === it.scope) {
            it.checked = true;
          }
        });

        this.user_other.some(it => {
          if (scope === it.scope) {
            it.checked = true;
          }
        });
      }
    }

    this.seperateOtherScopes();

  }

  seperateOtherScopes() {
    this.finalScopeList = [];
    if (this.appType === 'patient') {
      this.finalScopeList = this.scope1.filter(element => {
        return this.mainScopes.indexOf(element) == -1;
      });
    }

    if (this.appType === 'user') {
      this.finalScopeList = this.scope1.filter(element => {
        return this.user_mainScopes.indexOf(element) == -1;
      });
    }


  }

  isTrueChecked(value) {
    let resourceList = [];
    if (value === 'demographics') {
      resourceList = this.appType === 'patient' ? this.demographics : this.user_demographics;
    } else if (value === 'clinical') {
      resourceList = this.appType === 'patient' ? this.clinical : this.user_clinical;
    } else if (value === 'finantial') {
      resourceList = this.appType === 'patient' ? this.finantial : this.user_finantial;
    } else if (value === 'security') {
      resourceList = this.appType === 'patient' ? this.security : this.user_security;
    } else if (value === 'other') {
      resourceList = this.appType === 'patient' ? this.other : this.user_other;
    }

    for (let item of resourceList) {
      if (item.hasOwnProperty('checked') && item.checked) {
        return true;
      }
    }
    return false;
  }

  onCategoryChange(event, value) {
    let resourceList = [];
    if (value === 'demographics') {
      resourceList = this.appType === 'patient' ? this.demographics : this.user_demographics;
    } else if (value === 'clinical') {
      resourceList = this.appType === 'patient' ? this.clinical : this.user_clinical;
    } else if (value === 'finantial') {
      resourceList = this.appType === 'patient' ? this.finantial : this.user_finantial;
    } else if (value === 'security') {
      resourceList = this.appType === 'patient' ? this.security : this.user_security;
    } else if (value === 'other') {
      resourceList = this.appType === 'patient' ? this.other : this.user_other;
    }
    for (let item of resourceList) {
      item.checked = event.checked;
    }
  }

  // onChange(event) {
  //   console.log(event.source.value)
  //   const scopearray = <FormArray>this.formGroup.get('scope') as FormArray;

  //   if (event.checked) {
  //     scopearray.push(new FormControl(event.source.value))
  //   } else {
  //     const i = scopearray.controls.findIndex(x => x.value === event.source.value);
  //     scopearray.removeAt(i);
  //     //    this.formGroup.value.scope.push("null")
  //   }
  // }

  scopenull() {
    if (this.formGroup.value.scope == '') {
      this.formGroup.value.scope.push('null');
    }
  }

  allow() {

    let selectedScopes = [];

    if (this.appType === 'patient') {
      this.demographics.forEach(element => {
        if (element.hasOwnProperty('checked') && element.checked) {
          selectedScopes.push(element.scope);
        }
      });

      this.clinical.forEach(element => {
        if (element.hasOwnProperty('checked') && element.checked) {
          selectedScopes.push(element.scope);
        }
      });

      this.finantial.forEach(element => {
        if (element.hasOwnProperty('checked') && element.checked) {
          selectedScopes.push(element.scope);
        }
      });

      this.security.forEach(element => {
        if (element.hasOwnProperty('checked') && element.checked) {
          selectedScopes.push(element.scope);
        }
      });

      this.other.forEach(element => {
        if (element.hasOwnProperty('checked') && element.checked) {
          selectedScopes.push(element.scope);
        }
      });
    }

    if (this.appType === 'user') {
      this.user_demographics.forEach(element => {
        if (element.hasOwnProperty('checked') && element.checked) {
          selectedScopes.push(element.scope);
        }
      });

      this.user_clinical.forEach(element => {
        if (element.hasOwnProperty('checked') && element.checked) {
          selectedScopes.push(element.scope);
        }
      });

      this.user_finantial.forEach(element => {
        if (element.hasOwnProperty('checked') && element.checked) {
          selectedScopes.push(element.scope);
        }
      });

      this.user_security.forEach(element => {
        if (element.hasOwnProperty('checked') && element.checked) {
          selectedScopes.push(element.scope);
        }
      });

      this.user_other.forEach(element => {
        if (element.hasOwnProperty('checked') && element.checked) {
          selectedScopes.push(element.scope);
        }
      });
    }



    if (selectedScopes.length <= 0) {
      return;
    }

    this.finalScopeList = this.finalScopeList.concat(selectedScopes);

    const requesttype = 'Allow';
    const scope = this.finalScopeList.join(',');
    this.scopenull();
    this.apiservice.authorization(scope, this.transaction_id, requesttype).subscribe(result => {
      //    setTimeout(() => {
      //      window.location.reload();
      //     }, 2000);
      window.location.replace(result.body);
    }, error => {
      this.seperateOtherScopes();
    });
  }

  deny() {
    const requesttype = 'Deny';
    const scope = this.finalScopeList.join(',');
    this.scopenull();
    this.apiservice.authorization(scope, this.transaction_id, requesttype).subscribe(result => {
      let url = this.redirectedurl.substring(0, this.redirectedurl.lastIndexOf('/') + 1);
      console.log(url + 'login');
      let redurl = url + 'login';
      window.location.replace(redurl);
    }, error => {
      this.seperateOtherScopes();
    });
  }

  onClickScope(value, title) {
    const data = { title: title, data: value };
    this.callPopUpModal(data);
  }

  callPopUpModal(value) {
    const dialogRef = this.dialog.open(ScopePopupComponent, {
      // width: '50%',
      // height: '80%',
      // panelClass: 'custom-dialog-container',
      data: value
    });

    dialogRef.afterClosed().subscribe(data => {
      if (this.appType === 'patient') {
        const uncheckedClinicals = this.clinical.filter(x => {
          return x.checked === false;
        });
        if (this.clinical.length != uncheckedClinicals.length && uncheckedClinicals.length > 0) {
          this.isClinicalIndeterminate = true;
        } else if (this.clinical.length != 0 && uncheckedClinicals.length == 0) {
          this.isClinicalIndeterminate = false;
        }
        const uncheckedDemographics = this.demographics.filter(x => {
          return x.checked === false;
        });
        if (this.demographics.length != uncheckedDemographics.length && uncheckedDemographics.length > 0) {
          this.isDemographicsIndeterminate = true;
        } else if (this.demographics.length != 0 && uncheckedDemographics.length == 0) {
          this.isDemographicsIndeterminate = false;
        }
        const uncheckedFinancial = this.finantial.filter(x => {
          return x.checked === false;
        });
        if (this.finantial.length != uncheckedFinancial.length && uncheckedFinancial.length > 0) {
          this.isFinancialIndeterminate = true;
        } else if (this.finantial.length != 0 && uncheckedFinancial.length == 0) {
          this.isFinancialIndeterminate = false;
        }
        const uncheckedSecurity = this.security.filter(x => {
          return x.checked === false;
        });
        if (this.security.length != uncheckedSecurity.length && uncheckedSecurity.length > 0) {
          this.isSecurityIndeterminate = true;
        } else if (this.security.length != 0 && uncheckedSecurity.length == 0) {
          this.isSecurityIndeterminate = false;
        }
        const uncheckedOther = this.other.filter(x => {
          return x.checked === false;
        });
        if (this.other.length != uncheckedOther.length && uncheckedOther.length > 0) {
          this.isOtherIndeterminate = true;
        } else if (this.other.length != 0 && uncheckedOther.length == 0) {
          this.isOtherIndeterminate = false;
        }
      }

      if (this.appType === 'user') {
        const uncheckedClinicals = this.user_clinical.filter(x => {
          return x.checked === false;
        });
        if (this.user_clinical.length != uncheckedClinicals.length && uncheckedClinicals.length > 0) {
          this.user_isClinicalIndeterminate = true;
        } else if (this.user_clinical.length != 0 && uncheckedClinicals.length == 0) {
          this.user_isClinicalIndeterminate = false;
        }
        const uncheckedDemographics = this.user_demographics.filter(x => {
          return x.checked === false;
        });
        if (this.user_demographics.length != uncheckedDemographics.length && uncheckedDemographics.length > 0) {
          this.user_isDemographicsIndeterminate = true;
        } else if (this.user_demographics.length != 0 && uncheckedDemographics.length == 0) {
          this.user_isDemographicsIndeterminate = false;
        }
        const uncheckedFinancial = this.user_finantial.filter(x => {
          return x.checked === false;
        });
        if (this.user_finantial.length != uncheckedFinancial.length && uncheckedFinancial.length > 0) {
          this.user_isFinancialIndeterminate = true;
        } else if (this.user_finantial.length != 0 && uncheckedFinancial.length == 0) {
          this.user_isFinancialIndeterminate = false;
        }
        const uncheckedSecurity = this.user_security.filter(x => {
          return x.checked === false;
        });
        if (this.user_security.length != uncheckedSecurity.length && uncheckedSecurity.length > 0) {
          this.user_isSecurityIndeterminate = true;
        } else if (this.user_security.length != 0 && uncheckedSecurity.length == 0) {
          this.user_isSecurityIndeterminate = false;
        }
        const uncheckedOther = this.user_other.filter(x => {
          return x.checked === false;
        });
        if (this.user_other.length != uncheckedOther.length && uncheckedOther.length > 0) {
          this.user_isOtherIndeterminate = true;
        } else if (this.user_other.length != 0 && uncheckedOther.length == 0) {
          this.user_isOtherIndeterminate = false;
        }
      }
    });

  }

}
