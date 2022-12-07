import { AuthService } from '@auth0/auth0-angular';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "src/app/login/login.component";
import { Auth0Service } from 'src/app/services/auth0.service';

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  selectedHome: boolean = false;
  selectedAPI: boolean = false;
  selectedAuth: boolean = false;
  isSelectedTab:any;

  constructor(private matDialog: MatDialog,private route: Router, public auth: AuthService, public auth0Service: Auth0Service) {
    this.route.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        this.isSelectedTab = data['url'].split('/')[1];
      }
    })
  }

  ngOnInit() {
    if(this.isSelectedTab == 'home'){
      this.selectedHome = true;
    }
    if(this.isSelectedTab == 'api-specifications'){
      this.selectedAPI = true;
    }
    if(this.isSelectedTab == 'oauth-tutorial'){
      this.selectedAuth = true;
    }
  }

  onLogin() {
    this.auth.loginWithRedirect();
  }

  openLoginDialog() {
    this.matDialog.open(LoginComponent, {
      position: {
        top: "5%",
        right: "2%",
      },
      width: "20%",
    });
  }

  getProfileDetails() {
    this.auth0Service.getloggedInuserRoles().subscribe(data => {
      console.log("auth0Service", data);
    })
  }
}
