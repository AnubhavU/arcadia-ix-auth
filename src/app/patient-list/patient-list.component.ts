import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { PayersService } from '../services/payers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LoaderService } from '../utility/loader/loader.service';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  searchForm: FormGroup;
  patientdata: any;
  patientarray: any = [];
  hideName: boolean = false;
  transaction_id: any;
  response_url: any;
  displayedColumns: string[] = ['name', 'gender', 'birthdate'];
  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  resultsLength: any;
  recordperPage: any = 15;
  searchOffset: any = 1;
  pageSizeOptions = [15, 20, 30, 40];
  expand: any = false;
  genders: any = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Other', value: 'other' },
    { name: 'Unknown', value: 'unknown' }
  ];
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
    this.clearsearch();
  }

  constructor(public apiservice: PayersService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dataPipe: DatePipe) {
      // private loaderservice: Ng4LoadingSpinnerService
    this.searchForm = new FormGroup({
      searchname: new FormControl(''),
      gender: new FormControl(''),
      birthdate: new FormControl('')
    });



  }

  expform() {
    this.expand = !this.expand;
  }

  clearsearch() {
    this.expand = false;
  }

  clear() {
    // this.loaderservice.show();
    this.searchForm.reset();
    this.searchOffset = 1;
    this.recordperPage = 15;
    this.expand = false;
    this.paginator.pageIndex = 0;
    this.getPatientList();
  }

  search() {
    // this.loaderservice.show();
    this.searchOffset = 1;
    this.paginator.pageIndex = 0;
    this.getPatientList();
  }

  ngOnInit() {
    // this.loaderservice.show();
    this.getPatientList();
  }

  onPageChanged(event) {
    // this.loaderservice.show();
    this.recordperPage = event.pageSize;
    this.searchOffset = event.pageIndex + 1;
    if (event.pageIndex === 0 && event.length >= this.resultsLength) {
      this.searchOffset = 1;
    }
    this.getPatientList();
  }

  getPatientList() {
    // this.patientarray = [];
    let param = {};
    if (this.searchForm.value.searchname) {
      param['name'] = this.searchForm.value.searchname;
    }
    if (this.searchForm.value.gender) {
      param['gender'] = this.searchForm.value.gender;
    }
    if (this.searchForm.value.birthdate) {
      param['dob'] = this.dataPipe.transform(this.searchForm.value.birthdate, 'yyyy-MM-dd');
    }
    param['page-no'] = this.searchOffset;
    param['page-size'] = this.recordperPage;

    this.transaction_id = this.actRoute.snapshot.queryParamMap.get('transaction_id');
    this.apiservice.patientList(param).subscribe(data => {
      this.patientarray = [];
      this.clearsearch();
      this.hideName = true;
      this.resultsLength = data.totalRecords;
      this.patientdata = data.results;
      for (var i = 0; i < this.patientdata.length; i++) {
        this.patientarray.push(JSON.parse(this.patientdata[i].data));
      }
      this.dataSource = new MatTableDataSource(this.patientarray);
      // this.loaderservice.hide();
    });
  }

  patientlist(dataid) {
    this.apiservice.launchPatient(dataid, this.transaction_id).subscribe(data => {
      window.location.replace(data.body);
    });
  }

}
