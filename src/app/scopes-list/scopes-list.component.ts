import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PayersService } from '../services/payers.service';

@Component({
  selector: 'app-scopes-list',
  templateUrl: './scopes-list.component.html',
  styleUrls: ['./scopes-list.component.scss']
})
export class ScopesListComponent implements OnInit {
  formGroup: FormGroup;
  obj: any = {};
  scope1: any;
  scope2: any = [];
  messages = [];
  transaction_id: any;

  constructor(public apiservice: PayersService, private formBuilder: FormBuilder, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.transaction_id = this.actRoute.snapshot.queryParamMap.get('transaction_id')
    this.formGroup = this.formBuilder.group({
      scope: this.formBuilder.array([])
    });
    this.scope2 = [
      'launch/patient', 'openid', 'fhirUser', 'offline_access', 'patient/Medication.read',
      'patient/AllergyIntolerance.read', 'patient/CarePlan.read', 'patient/CareTeam.read', 'patient/Condition.read',
      'patient/Device.read', 'patient/DiagnosticReport.read', 'patient/DocumentReference.read'
      , 'patient/Encounter.read', 'patient/Goal.read', 'patient/Immunization.read', 'patient/Location.read', 'patient/MedicationRequest.read', 'patient/Observation.read',
      'patient/Organization.read', 'patient/Patient.read', 'patient/Practitioner.read', 'patient/PractitionerRole.read',
      'patient/Procedure.read', 'patient/Provenance.read', 'patient/RelatedPerson.read']
    const scopearray = <FormArray>this.formGroup.get('scope') as FormArray;
    for (let item of this.scope2) {
      scopearray.push(new FormControl(item))
    }
  }

  onChange(event) {
    const scopearray = <FormArray>this.formGroup.get('scope') as FormArray;

    if (event.checked) {
      scopearray.push(new FormControl(event.source.value))
    } else {
      const i = scopearray.controls.findIndex(x => x.value === event.source.value);
      scopearray.removeAt(i);
    }
  }

  allow() {
    this.obj = {
      'scope': this.formGroup.value.scope,
    }
    this.apiservice.scopelist(this.obj, this.transaction_id).subscribe(result => {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

}
