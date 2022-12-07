import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {
  clientdata: any[] = [];
  client: any;
  fileUrl;
  data: any;

  constructor(private dialogRef: MatDialogRef<DialogboxComponent>, @Inject(MAT_DIALOG_DATA) public dialogdata: any, private sanitizer: DomSanitizer) {
    this.data = dialogdata;
  }

  ngOnInit() {
    this.client = this.data.dataKey;
    this.clientdata.push(this.client);
  }

  savedetails() {
    const data = 'Registered Client Details' + "\n" + "\n" + "\n";
    const clientname = 'Client Name: ' + this.clientdata[0].name + "\n";
    const orgname = 'Organization Name: ' + this.clientdata[0].orgName + "\n";
    const clientid = 'Client Id: ' + this.clientdata[0].clientId + "\n";
    const tokenurl = 'Token URL: ' + this.clientdata[0].tokenEndPoint + "\n";
    const blob = new Blob([data, clientname, orgname, clientid, tokenurl], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  }

}
