import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup
} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-loginfrm",
  templateUrl: "./loginfrm.component.html",
  styleUrls: ["./loginfrm.component.css"]
})
export class LoginfrmComponent implements OnInit {
  logdata: any;
  results: any;
  errormsg: "";
  reurl = "";
  loader = "";
  loginchk: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private logedUser: AuthService
  ) {}

  ngOnInit() {
    this.loginchk = this.logedUser.getToken();
    if (this.loginchk) {
      this.router.navigate(["/myaccount"]);
      console.log("Loged in");
    } else {
      console.log("Not Login");
      return true;
    }
  }

  loginForm = this.fb.group({
    user: ["", Validators.required],
    pass: ["", Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.loader = "t";
      var form = this.loginForm.value;

      const url = environment.apiUrl + "auth/login/";

      this.http
        .post(url, { username: form.user, password: form.pass })
        .subscribe(
          data => {
            this.loader = "";
            this.logdata = data;
            /*  console.log(this.logdata); */
            localStorage.setItem("token", this.logdata.data.token);
            localStorage.setItem("logedUser", this.logdata.data.User.id);
            localStorage.setItem("logedname", this.logdata.data.User.username);
            localStorage.setItem("usertype", this.logdata.data.User.role_id);
            localStorage.setItem("agentid", this.logdata.data.User.uuid);
            localStorage.setItem("userlog", this.logdata.data.User.referral_id);

            this.reurl = localStorage.getItem("reUrl");
            if (this.reurl) {
              window.location.href = environment.siteUrl + this.reurl;
              localStorage.removeItem("reUrl");
            } else {
              window.location.href = environment.siteUrl + "myaccount";
            }

            this.loginForm.reset();
          },
          msg => {
            this.loader = "";
            this.results = msg;
            this.results = msg.error;
            this.errormsg = msg["error"].error;
          }
        );
    } else {
      this.validateAllFormFields(this.loginForm);
    }
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
}
