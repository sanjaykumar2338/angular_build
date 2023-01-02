import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment.prod";

@Component({
  selector: "app-reqtoadmin",
  templateUrl: "./reqtoadmin.component.html",
  styleUrls: ["./reqtoadmin.component.css"]
})
export class ReqtoadminComponent implements OnInit {
  reqtoAdmin: FormGroup;
  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  frmsuccess: any;
  frmerr: any;
  frmload: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.reqtoAdmin = this.fb.group({
      amount: ["", Validators.required],
      message: ["", Validators.required]
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    var form = this.reqtoAdmin.value;
    console.log(form);
    if (this.reqtoAdmin.valid) {
      var form = this.reqtoAdmin.value;
      console.log(form);
      this.http
        .post(
          environment.apiUrl + "agent/" + this.logeduser + "/payment-request",
          {
            amount: form.amount
          },
          { headers: new HttpHeaders().set("Authorization", this.Auth_Token) }
        )
        .subscribe(
          (res: any) => {
            this.frmerr = "";
            this.frmload = "";
            this.frmsuccess = res;
            setTimeout(() => {
              this.frmsuccess = "";
            }, 3000);
          },
          (msg: any) => {
            this.frmerr = "t";
            this.frmsuccess = "";
            this.frmload = "";
            console.log(msg);
          }
        );
    } else {
      this.validateAllFormFields(this.reqtoAdmin);
    }
  }
}
