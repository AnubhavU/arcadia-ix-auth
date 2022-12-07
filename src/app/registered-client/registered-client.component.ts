import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PayersService } from '../services/payers.service';
import { base_url } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LaunchAppDialogComponent } from '../launch-app-dialog/launch-app-dialog.component';

@Component({
  selector: 'app-registered-client',
  templateUrl: './registered-client.component.html',
  styleUrls: ['./registered-client.component.scss'],
})
export class RegisteredClientComponent implements OnInit {
  encapsulation: ViewEncapsulation.None;
  tabs = ['User OAuth Clients', 'Backend Clients'];
  selected = new FormControl(0);
  clientData: any;
  redirect_uri: any;
  launchId: any;
  fhir_server_url: any;
  backendClients: any = [];
  oAuthClients: any = [];
  backendDisplayColumns: string[] = ['clientname', 'clientid', 'tokenendpoint'];
  backenddataSource: MatTableDataSource<any>;
  oAuthClientDisplayColumns: string[] = [
    'id',
    'clientname',
    'applicationtype',
    'clientid',
    'clientsecret',
    'actions',
  ];
  oAuthClientdataSource: MatTableDataSource<any>;

  constructor(public apiservice: PayersService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.fhir_server_url = location.origin + '/InteropXFHIR/fhir';
    this.apiservice.Registeredclients().subscribe((data) => {
      if (data) {
        this.clientData = data;
        for (let item of this.clientData) {
          if ('isBackendClient' in item && item.isBackendClient) {
            this.backendClients.push(item);
          } else {
            this.oAuthClients.push(item);
          }
        }
      }
      this.backendClients.sort((a, b) => b.id - a.id);
      this.oAuthClients.sort((a, b) => b.id - a.id);
      this.clientData.sort((a, b) => b.id - a.id);

      this.oAuthClientdataSource = this.oAuthClients;
      this.backenddataSource = this.backendClients;
    });
  }

  onSubmit(data) {
    this.redirect_uri = data.redirect_uri;
    this.launchId = data.launchId;
    window.open(
      this.redirect_uri +
      '?launch=' +
      this.launchId +
      '&iss=' +
      base_url +
      '/InteropXFHIR/fhir',
      '_blank'
    );
  }

  openDialog() {
    let dialogRef = this.matDialog.open(LaunchAppDialogComponent, {
      data: 10,
      width: '75%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((res) => res);
  }
}
