import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-scope-popup',
  templateUrl: './scope-popup.component.html',
  styleUrls: ['./scope-popup.component.scss']
})
export class ScopePopupComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  dialogdata: any;

  scopeList: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data: string,) {
    this.dialogdata = data;
    this.scopeList = this.dialogdata.data;
  }

  ngOnInit() {

  }

}
