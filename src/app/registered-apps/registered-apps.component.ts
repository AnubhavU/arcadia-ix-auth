import { LocalStorageService } from 'src/app/core/localstorage.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LaunchAppDialogComponent } from '../launch-app-dialog/launch-app-dialog.component';
import { PayersService } from '../services/payers.service';
import { LoaderService } from '../utility/loader/loader.service';

@Component({
	selector: 'app-registered-apps',
	templateUrl: './registered-apps.component.html',
	styleUrls: ['./registered-apps.component.scss']
})
export class RegisteredAppsComponent implements OnInit {
	clientData: any;
	redirect_uri: any;
	launchId: any;
	fhir_server_url: any;
	authclient: any;
	backendClients: any = [];
	oAuthClients: any = [];
	folders = [
		{ name: 'Analytics App', link: 'Draft', version: 1.0, color: '#6bb3ca' },
		{ name: 'Metrics App', link: 'Draft', version: 1.0, color: '#6bb3ca' },
		{ name: 'PAS App', link: 'Draft', version: 1.0, color: '#6bb3ca' },
		{ name: 'DTR', link: 'Changes Requested', version: 1.0, color: '#ff8c34' },
		{ name: 'Metrics App', link: 'Rejected', version: 1.0, color: '#ec6a6a' },
		{ name: 'PAS App', link: 'Approved', version: 1.0, color: '#54dfa4' },
		{ name: 'CRD APP', link: 'Approved', version: 1.0, color: '#54dfa4' },
		{ name: 'Metrics App', link: 'Rejected', version: 1.0, color: '#ec6a6a' }
	];
	constructor(public apiservice: PayersService, private dialog: MatDialog, private router: Router,
		private loader: LoaderService, private dataService: DataService, private localStorage: LocalStorageService
	) { }

	ngOnInit() {
		this.loader.show();
		// this.fhir_server_url = location.origin + "/InteropXFHIR/fhir";
		this.apiservice.Registeredclients().subscribe(data => {
			this.loader.hide();
			if (data) {
				this.clientData = data;
				for (let item of this.clientData) {
					if ('appType' in item && item.appType === 'user') {
						item['appType'] = 'provider';
					}
					if (item.approvedStatus === 'PENDING') {
						item['color'] = '#ff8c34';
					} else if (item.approvedStatus === 'APPROVED') {
						item['color'] = '#54dfa4';
					} else if (item.approvedStatus === 'REJECTED') {
						item['color'] = '#ec6a6a';
					}
					if ('isBackendClient' in item && item.isBackendClient) {
						this.backendClients.push(item);
					} else {
						this.oAuthClients.push(item);
					}
				}
			}
			this.backendClients.sort((a, b) => b.id - a.id);
			this.oAuthClients.sort((a, b) => b.id - a.id);
			if (this.clientData) {
				this.clientData.sort((a, b) => b.id - a.id);
			}

			this.authclient = this.oAuthClients;
		});
	}

	launchapp(data) {
		let value = { data: data };
		const dialogRef = this.dialog.open(LaunchAppDialogComponent, {
			data: value,
			width: '50vw',
		});

		dialogRef.afterClosed().subscribe(data => {
		});
	}

	editclient(value) {
		console.log(value);
		// this.dataService.setApplicationDetails(value);
		this.localStorage.setToStorage('client', value);
		this.router.navigate(['/client']);
	}

	editbackendclient(value) {
		console.log(value);
		this.localStorage.setToStorage('backendclient', value);
		this.router.navigate(['/backendclient']);
	}

}
