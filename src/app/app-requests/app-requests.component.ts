import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import uniqWith from 'lodash/uniqWith';
import get from 'lodash/get';
// import { MatDialog, MatDialogRef, MatMenuTrigger,  } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PayersService } from '../services/payers.service';
import { LoaderService } from '../utility/loader/loader.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-app-requests',
  templateUrl: './app-requests.component.html',
  styleUrls: ['./app-requests.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppRequestsComponent implements OnInit {
  // @ViewChild("menuTrigger") menuTrigger: MatMenuTrigger;
  demo1TabIndex = 0;

  newAppRequestDisplayedColumns: string[] = [
    'userName',
    'userEmail',
    'client_id',
    'name',
    'org_name',
    // 'appType',
    'centerId',
    'customerId',
    // 'reqsince',
    'approvedStatus',
    'action',
  ];

  newAppRequestData: any;

  spans = {};
  newstatusdata: any;

  constructor(private dialog: MatDialog, public apiservice: PayersService,private loaderService: LoaderService) {
    this.spans = Object.assign(
      {},
      {
        userName: this.spanDeep(['userName'], this.newAppRequestData),
        userEmail: this.spanDeep(['userName', 'userEmail'], this.newAppRequestData),
      }
    );
  }

  ngOnInit() {
    this.appstatus('PENDING')
  }

  getappbystatus(ev: any) {
    if (ev.index === 1) {
      let status = 'APPROVED';
      this.appstatus(status);
    } else if (ev.index === 2) {
      let status = 'REJECTED';
      this.appstatus(status)
    } else if (ev.index === 0) {
      this.appstatus('PENDING')
    }

  }

  appstatus(status: any) {
    this.newAppRequestData = [];
    this.loaderService.show();
    this.apiservice.getappbystatus(status).subscribe(data => {
      if (data) {
        this.loaderService.hide();
        let group: any = [];
        for (let i = 0; i < data.length; i++) {
          if (!data[i].dynamicClient && data[i].userEmail !== "adminuser@gmail.com") {
            group.push(data[i]);
          }
        }
        this.newAppRequestData = group;
      }
    });
  }

  getallapprequests() {
    this.apiservice.apprequests().subscribe(data => {
      this.newAppRequestData = data;
      if (data) {
        for (let item of data) {
        }
      }
    });
  }

  spanDeep(paths: string[] | null, data: any[]) {
    if (!paths.length) {
      return [...data].fill(0).fill(data.length, 0, 1);
    }

    const copyPaths = [...paths];
    const path = copyPaths.shift();

    const uniq = uniqWith(data, (a, b) => get(a, path) === get(b, path)).map(
      (item) => get(item, path)
    );

    return uniq
      .map((uniqItem) =>
        this.spanDeep(
          copyPaths,
          data.filter((item) => uniqItem === get(item, path))
        )
      )
      .flat(paths.length);
  }

  getRowSpan(path, idx) {
    console.log(path, idx)
    return this.spans[path][idx];
  }

  openDialog(el) {
    const dialogRef = this.dialog.open(confirmationDialog, {
      data: el,
      disableClose: true,
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === 'PENDING') {
        this.demo1TabIndex = 0;
      } else if (data === 'APPROVED') {
        this.demo1TabIndex = 1;
      } else if (data === 'REJECTED') {
        this.demo1TabIndex = 2;
      }
      this.appstatus(data);
    });
  }
}

@Component({
  selector: "dialog-from-menu-dialog",
  templateUrl: 'confirmation-popup.html',
  styleUrls: ['./app-requests.component.scss'],
})
export class confirmationDialog {
  dialogdata: any;
  formGroup: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<confirmationDialog>,
    private apiservice: PayersService, private loader: LoaderService, private formBuilder: FormBuilder,private route: Router) {
    this.dialogdata = data;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      reviewComment: new FormControl('',[Validators.required]),
      // jku: new FormControl('')
    });
  }

  onClose() {
    this.dialogRef.close('PENDING');
    this.route.navigate(['/app-requests']);
  }

  status(el) {
    if(this.formGroup.valid){
    this.loader.show();
    let param = {
      "id": this.dialogdata.id,
      "approvedStatus": el,
      "reviewComments": this.formGroup.controls['reviewComment'].value
    }
    this.apiservice.updatestatus(param).subscribe((data) => {
      this.loader.hide(); this.dialogRef.close();
      if (data) {
        this.dialogRef.close(el);
      }
    })
  }
}
}
