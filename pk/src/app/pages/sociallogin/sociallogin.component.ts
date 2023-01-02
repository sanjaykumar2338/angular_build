import { Component, OnInit, Injectable } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";

import { SocialUser } from "angularx-social-login";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Observer } from "rxjs";
import { environment } from "../../../environments/environment.prod";

import { AuthService } from "../../auth/auth.service";
import { getInjectionTokens } from "@angular/core/src/render3/discovery_utils";

import { AuthService as socialLogin } from "angularx-social-login";

import {
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angularx-social-login";

@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-sociallogin",
  templateUrl: "./sociallogin.component.html",
  styleUrls: ["./sociallogin.component.css"]
})
export class SocialloginComponent implements OnInit {
  logdata: any;
  results: any;
  errormsg: "";
  reurl = "";
  user: SocialUser;
  sitepath = environment.siteUrl;
  pageplan: any;
  urlslug = this.router.url;
  fbtxt = "Facebook";
  gltxt = "Google";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private logedUser: AuthService,
    private route: ActivatedRoute,
    private socialLogin: socialLogin
  ) {}

  ngOnInit() {
    this.pageplan = this.route.snapshot.url.length;
    if (this.urlslug == "/login") {
      this.fbtxt = "Sign in with Facebook";
      this.gltxt = "Sign in with Google";
    } else if (this.urlslug == "/register") {
      this.fbtxt = "Sign up with Facebook";
      this.gltxt = "Sign up with Google";
    } else {
      this.fbtxt = "Facebook";
      this.gltxt = "Google";
    }
  }

  values = "";
  onKey(event: any) {
    this.values = "";
    this.values += event.target.value + "";
  }

  signInWithFB(): void {
    //console.log("dfdsfa");
    this.socialLogin
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((res: any) =>
        this.http
          .post(environment.apiUrl + "auth/login/facebook", {
            name: res.name,
            first_name: res.name,
            last_name: res.name,
            email: res.email,
            id: res.id,
            role_id: 2
          })
          .subscribe(
            (data: any) => {
              this.logdata = data;
              localStorage.setItem("token", this.logdata.data.token);
              localStorage.setItem("logedUser", this.logdata.data.User.id);
              localStorage.setItem(
                "logedname",
                this.logdata.data.User.username
              );
              localStorage.setItem("usertype", this.logdata.data.User.role_id);
              localStorage.setItem("agentid", this.logdata.data.User.uuid);
              this.reurl = localStorage.getItem("reUrl");
              localStorage.setItem(
                "userlog",
                this.logdata.data.User.referral_id
              );
              //console.log(localStorage.getItem('logedUser'));

              if (this.reurl) {
                //this.router.navigate([this.reurl]);
                window.location.href = environment.siteUrl + this.reurl;
                localStorage.removeItem("reUrl");
              } else {
                window.location.href = this.sitepath + "/myaccount";
                //this.router.navigate(["/myaccount"]);
              }
            },
            (msg: any) => {
              console.log(msg);
              this.results = msg;
              this.results = msg.error;
              this.errormsg = msg["error"].error;
            }
          )
      );
  }

  signInWithGoogle(): void {
    //console.log("--slcick");

    this.socialLogin
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res: any) => {
        this.http
          .post(environment.apiUrl + "auth/login/facebook", {
            name: res.name,
            first_name: res.firstName,
            last_name: res.lastName,
            email: res.email,
            id: res.id,
            role_id: 2
          })
          .subscribe(
            (data: any) => {
              this.logdata = data;
              localStorage.setItem("token", this.logdata.data.token);
              localStorage.setItem("logedUser", this.logdata.data.User.id);
              localStorage.setItem(
                "logedname",
                this.logdata.data.User.username
              );
              localStorage.setItem("usertype", this.logdata.data.User.role_id);
              localStorage.setItem("agentid", this.logdata.data.User.uuid);
              localStorage.setItem(
                "userlog",
                this.logdata.data.User.referral_id
              );
              this.reurl = localStorage.getItem("reUrl");

              if (this.reurl) {
                window.location.href = environment.siteUrl + this.reurl;
                localStorage.removeItem("reUrl");
              } else {
                window.location.href = environment.siteUrl + "myaccount";
              }
            },
            (msg: any) => {
              console.log(msg);
            }
          );
      });
  }
}
