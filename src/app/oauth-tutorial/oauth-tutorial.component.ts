import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-oauth-tutorial',
  templateUrl: './oauth-tutorial.component.html',
  styleUrls: ['./oauth-tutorial.component.scss']
})
export class OauthTutorialComponent implements OnInit {
  pageNames: any = [
    "Standalone",
    "SMART Backend Services",
    "EHR Launch"
  ];
  
  apiPageName: string = "standalone";
  selectedItem: any = 'Standalone';
  iFrameSrc: any;
  url: any;

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.changePageName(this.apiPageName);
  }

  changePageName(page: string) {
    this.selectedItem = page;
    if(page == 'standalone'){
      this.apiPageName = 'standalone';
    }else if(page == 'smart backend services'){
      this.apiPageName = 'smart-backend-services';
    }else if(page == 'ehr launch'){
      this.apiPageName = 'ehr-launch';
    }
    this.url = `assets/oauth-tutorial-pages/${this.apiPageName}.html`;
    this.iFrameSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
