import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-api-specifications",
  templateUrl: "./api-specifications.component.html",
  styleUrls: ["./api-specifications.component.scss"],
})
export class ApiSpecificationsComponent implements OnInit {
  pageNames: any = [
    "AllergyIntolerance",
    "CarePlan",
    "CareTeam",
    "Condition",
    "DiagnosticReport",
    "DocumentReference",
    "Encounter",
    "Goal",
    "Immunization",
    "Implantable Device",
    "Location",
    "Medication",
    "MedicationRequest",
    "Observation",
    "Organization",
    "Patient",
    "Practitioner",
    "PractitionerRole",
    "Procedure",
    "Provenance",
  ];

  apiPageName: string = "allergyintolerance";
  iFrameSrc: any;
  url: any;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.changePageName(this.apiPageName);
  }

  changePageName(page: string) {
    this.apiPageName = page;
    this.url = `assets/api-spec-pages/${this.apiPageName}.html`;
    this.iFrameSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
