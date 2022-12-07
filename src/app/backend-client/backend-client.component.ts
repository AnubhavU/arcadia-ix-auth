import { LocalStorageService } from "src/app/core/localstorage.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  FormBuilder,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DialogboxComponent } from "../dialogbox/dialogbox.component";
import { PayersService } from "../services/payers.service";
import { ErrorMessageService } from "../utility/error-message/error-message.service";
import { LoaderService } from "../utility/loader/loader.service";

@Component({
  selector: "app-backend-client",
  templateUrl: "./backend-client.component.html",
  styleUrls: ["./backend-client.component.scss"],
})
export class BackendClientComponent implements OnInit {
  formGroup: FormGroup;
  obj: any = {};
  scope1: any;
  scope2: any;
  response: any;
  scopeTypes: any = [
    { name: "All", id: "all" },
    { name: "Clinical", id: "clinical" },
    { name: "Administrative", id: "administrative" },
    { name: "Financial", id: "financial" },
  ];
  scopesByType: any = [];
  allscopes: any = [];
  clinicalScopes: any = [];
  administrativeScopes: any = [];
  financialScopes: any = [];
  edit: boolean = false;
  clientDetails: any;
  selectedApplicationType: any = "system";
  selectedItems: any = [];
  checked: boolean = true;
  count: any = 0;
  constructor(
    private formBuilder: FormBuilder,
    public apiservice: PayersService,
    public loader: LoaderService,
    public dialog: MatDialog,
    public router: Router,
    private messageService: ErrorMessageService,
    private localStorage: LocalStorageService
  ) {
    setTimeout((res) => {
      this.scope1 = [
        "system/Medication.read",
        "system/AllergyIntolerance.read",
        "system/CarePlan.read",
        "system/CareTeam.read",
        "system/Condition.read",
        "system/Device.read",
        "system/DiagnosticReport.read",
        "system/DocumentReference.read",
        "system/Encounter.read",
        "system/Goal.read",
      ];
      this.scope2 = [
        "system/Immunization.read",
        "system/Location.read",
        "system/MedicationRequest.read",
        "system/Observation.read",
        "system/Organization.read",
        "system/system.read",
        "system/Practitioner.read",
        "system/PractitionerRole.read",
        "system/Procedure.read",
        "system/Provenance.read",
        "system/RelatedPerson.read",
      ];
    });
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      org_name: new FormControl("", [Validators.required]),
      issuer: new FormControl(null, [Validators.required]),
      jku: new FormControl("", [Validators.required]),
      algorithmUsed: new FormControl("", [Validators.required]),
      scope: this.formBuilder.array([]),
      scopeType: new FormControl("", [Validators.required]),
      customerId: new FormControl("", [Validators.required]),
      centerId: new FormControl(""),
    });
    //get the backend client details from local storage
    if (this.localStorage.getFromStorage("backendclient")) {
      this.loader.show();
      this.edit = true;
      this.clientDetails = this.localStorage.getFromStorage("backendclient");
      this.selectedItems = this.clientDetails.scopeType.split(",");
      this.getAllScopes("edit");
    } else {
      this.getAllScopes();
    }
    this.formGroup.controls["algorithmUsed"].setValue("RS384");
  }

  //get all the scopes present
  getAllScopes(from?: any) {
    for (let item of this.scopeTypes) {
      if (item.id !== "other") {
        this.getScopeByType(item.id, from);
      }
    }
  }

  //making the checkbox checked and unchecked on click and passing it
  onChange(event) {
    event.source.value.checked = !event.source.value.checked;
    const newArr = this.allscopes.map((element) => {
      return element;
    });
    this.allscopes = newArr;
  }

  //getting the scopes according to the selected scope type
  getScopes() {
    let tempScopes = [];
    for (let item of this.formGroup.value.scopeType) {
      switch (item) {
        case "all":
          this.allscopes.forEach((element) => {
            if (element.checked) {
              tempScopes.push(element.name);
            }
          });
          break;
        case "clinical":
          this.clinicalScopes.forEach((element) => {
            if (element.checked) {
              tempScopes.push(element.name);
            }
          });
          break;
        case "administrative":
          this.administrativeScopes.forEach((element) => {
            if (element.checked) {
              tempScopes.push(element.name);
            }
          });
          break;
        case "financial":
          this.financialScopes.forEach((element) => {
            if (element.checked) {
              tempScopes.push(element.name);
            }
          });
          break;
      }
    }
    return tempScopes;
  }

  //submitting user data to backend
  onSubmit() {
    let scopes = this.formGroup.value.scopeType;
    let myscopes = scopes.join(",");
    this.obj = {
      name: this.formGroup.value.name,
      org_name: this.formGroup.value.org_name,
      issuer: this.formGroup.value.issuer,
      jku: this.formGroup.value.jku,
      scope: this.getScopes().join(","),
      userId: this.localStorage.getFromStorage("userId"),
      algorithmUsed: this.formGroup.value.algorithmUsed,
      scopeType: myscopes,
      customerId: this.formGroup.value.customerId,
      centerId: this.formGroup.value.centerId,
    };

    if (this.formGroup.valid) {
      this.loader.show();
      //when user is registering the client
      if (this.edit === false) {
        this.apiservice.backendClient(this.obj).subscribe(
          (result) => {
            this.loader.hide();
            this.response = result;
            this.messageService.show(
              "Success",
              "Client Registered Successfully",
              "success"
            );
            const dialogRef = this.dialog.open(DialogboxComponent, {
              data: {
                dataKey: this.response,
              },
              width: "700px",
            });
            dialogRef.afterClosed().subscribe((result) => {
              this.router.navigate(["registeredclientapps"]);
            });
          },
          (error) => {
            if (error.error.status != 200) {
              this.messageService.show("Error", error.error.message, "error");
            }
            this.loader.hide();
          }
        );
      }
      //when user is editing the exsting client
      else if (this.edit === true) {
        (this.clientDetails["name"] = this.formGroup.value.name),
          (this.clientDetails["org_name"] = this.formGroup.value.org_name),
          (this.clientDetails["issuer"] = this.formGroup.value.issuer),
          (this.clientDetails["jku"] = this.formGroup.value.jku),
          (this.clientDetails["scope"] = this.getScopes().join(",")),
          (this.clientDetails["algorithmUsed"] = "RS384"),
          (this.clientDetails["scopeType"] = myscopes),
          (this.clientDetails["customerId"] = this.formGroup.value.customerId),
          (this.clientDetails["centerId"] = this.formGroup.value.centerId);
        this.apiservice.updateBackendclient(this.clientDetails).subscribe(
          (result) => {
            this.loader.hide();
            this.response = result;
            this.messageService.show(
              "Success",
              "Client Updated Successfully",
              "success"
            );
            const dialogRef = this.dialog.open(DialogboxComponent, {
              data: {
                dataKey: this.response,
              },
              width: "700px",
            });
            dialogRef.afterClosed().subscribe((result) => {
              this.router.navigate(["registeredclientapps"]);
            });
          },
          (error) => {
            if (error.error.status != 200) {
              this.messageService.show("Error", error.error.message, "error");
            }
            this.loader.hide();
          }
        );
      }
    }
  }

  disabled(value) {
    if (this.formGroup.value.scopeType.includes(value)) {
      return true;
    }
  }

  //appending the all and other scope when all scope type is selected
  onSelectType(event) {
    if (event.value.includes("all")) {
      this.formGroup.patchValue({
        scopeType: ["all"],
      });
      if (this.formGroup.controls["scopeType"].value == "all") {
        const newArrAll = this.allscopes.map((element) => {
          element.checked = true;
          return element;
        });
        this.allscopes = newArrAll;
      }
    }
  }

  //getting the scopes by types from API and storing in variable
  getScopeByType(type, from?: any) {
    this.allscopes = [];
    this.clinicalScopes = [];
    this.administrativeScopes = [];
    this.financialScopes = [];
    this.apiservice.getScopeByType(type).subscribe(
      (result) => {
        this.loader.hide();
        if (result) {
          let tempResult = [];
          this.count = this.count + 1;
          result.forEach((element, index, theArray) => {
            let obj = {
              name: this.selectedApplicationType + "/" + element + ".read",
              id: element,
              checked: true,
            };
            tempResult.push(obj);
            // theArray[index] = 'user/' + element + '.read';
          });
          switch (type) {
            case "all":
              let temp = [
                {
                  name: this.selectedApplicationType + "/*.read",
                  id: this.selectedApplicationType + "/*.read",
                  checked: true,
                },
                {
                  name: this.selectedApplicationType + "/*.*",
                  id: this.selectedApplicationType + "/*.*",
                  checked: true,
                },
              ];
              for (let i = 0; i < temp.length; i++) {
                tempResult.push(temp[i]);
              }
              this.allscopes = tempResult;
              break;
            case "clinical":
              this.clinicalScopes = tempResult;
              break;
            case "administrative":
              this.administrativeScopes = tempResult;
              break;
            case "financial":
              this.financialScopes = tempResult;
              break;
          }
        }
        if (this.count >= 4) {
          this.editclient(this.clientDetails);
        }
      },
      (error) => {
        this.loader.hide();
      }
    );
  }

  get formValidator() {
    return {
      name: this.formGroup.get("name"),
      org_name: this.formGroup.get("org_name"),
      issuer: this.formGroup.get("issuer"),
      jku: this.formGroup.get("jku"),
      algorithmUsed: this.formGroup.get("algorithmUsed"),
      customerId: this.formGroup.get("customerId"),
    };
  }

  editclient(item) {
    if (item) {
      for (let aitem of this.clinicalScopes) {
        aitem["checked"] = false;
        for (let scope of item.scope.split(",")) {
          if (scope === aitem.name) {
            aitem["checked"] = true;
          }
        }
      }

      for (let aitem of this.financialScopes) {
        aitem["checked"] = false;
        for (let scope of item.scope.split(",")) {
          if (scope === aitem.name) {
            aitem["checked"] = true;
          }
        }
      }

      for (let aitem of this.administrativeScopes) {
        aitem["checked"] = false;
        for (let scope of item.scope.split(",")) {
          if (scope === aitem.name) {
            aitem["checked"] = true;
          }
        }
      }

      for (let aitem of this.allscopes) {
        aitem["checked"] = false;
        for (let scope of item.scope.split(",")) {
          if (scope === aitem.name) {
            aitem["checked"] = true;
          }
        }
      }

      this.loader.hide();
      this.formGroup.patchValue({
        name: item.name,
        issuer: item.issuer,
        jku: item.jku,
        org_name: item.orgName,
        customerId: item.customerId,
        centerId: item.centerId,
        // algorithmUsed: item.algorithmUsed,
        // scopeType: item.
      });
    }
  }

  ngOnDestroy(): void {
    this.localStorage.remove("backendclient");
  }
}
