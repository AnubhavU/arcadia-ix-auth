import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PayersService } from '../services/payers.service';
import { LoaderService } from '../utility/loader/loader.service';

@Component({
  selector: 'app-launch-app-dialog',
  templateUrl: './launch-app-dialog.component.html',
  styleUrls: ['./launch-app-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LaunchAppDialogComponent implements OnInit {
  launchdata: any;
  launchAppForm = new FormGroup({
    patientCtrl: new FormControl(),
    encounterId: new FormControl(''),
    // locationId: new FormControl(""),
  });
  filteredPatient: Observable<any>;
  patientarray: any;
  param: any = {};
  // dummy data just for visualization, please delete this once we integrate the api and start getting data from api
  patients: any = [
    {
      name: 'Adams, Daniel',
      id: 'ID-1235',
      age: '95',
      dob: '23 Dec 1925',
    },
    {
      name: 'Brown, Peter',
      id: 'ID-1237',
      age: '56',
      dob: '24 Aug 1963',
    },
    {
      name: 'Black, Jack',
      id: 'ID-1224',
      age: '6',
      dob: '16 Jan 2009',
    },
    {
      name: 'Rolland, Kelly',
      id: 'ID-6533',
      age: '26',
      dob: '19 May 1995',
    },
    {
      name: 'Evans, Austin',
      id: 'ID-5652',
      age: '45',
      dob: '22 Apr 1981',
    },
    {
      name: 'Cage, Nicholas',
      id: 'ID-8965',
      age: '65',
      dob: '5 Sep 1975',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public apiservice: PayersService, public loader: LoaderService,
    public dialogRef: MatDialogRef<LaunchAppDialogComponent>
  ) {
    this.launchdata = data.data;
  }

  private _filterPatients(value: string) {
    const filterValue = value.toLowerCase();

    return this.patients.filter((patient) =>
      patient.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit() {
    this.getpatients();
  }

  getpatients() {
    this.param['page-no'] = 1;
    this.param['page-size'] = 15;
    this.apiservice.patientList(this.param).subscribe(data => {
      this.patientarray = [];
      for (var i = 0; i < data.results.length; i++) {
        this.patientarray.push(JSON.parse(data.results[i].data))
      }
      this.filteredPatient = this.launchAppForm
        .get('patientCtrl')
        .valueChanges.pipe(
          startWith(''),
          map((patient) =>
            patient ? this._filterPatients(patient) : this.patientarray.slice()
          )
        );
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.loader.show();
    this.apiservice.launch(this.launchdata.id, this.launchAppForm.value.patientCtrl).subscribe((data) => {
      this.dialogRef.close();
      this.loader.hide();
    })
    let data = this.launchdata;
    // {{data.launchUri}}?launch={{data.launchId}}&iss={{fhir_server_url}}
    window.open(data.launchUri + '?launch=' + data.launchId + '&iss=' + location.origin + '/InteropXFHIR/fhir/', '_blank');
  }

  clearSearch() {
    this.launchAppForm.get('patientCtrl').reset();
  }

  onEnter(ev) {
    this.param['name'] = this.launchAppForm.value.patientCtrl
  }

}
