import { Component, OnInit, Injectable, Inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";

import { SocialUser } from "angularx-social-login";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Observer } from "rxjs";
import { environment } from "../../../environments/environment.prod";
import { DOCUMENT } from "@angular/common";
import { AuthService } from "../../auth/auth.service";
import { getInjectionTokens } from "@angular/core/src/render3/discovery_utils";
import { Meta, Title } from "@angular/platform-browser";
import { AuthService as socialLogin } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angularx-social-login";
import { LOCAL_STORAGE, WINDOW } from "@ng-toolkit/universal";

@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  homefeed: any;
  logdata: any;
  results: any;
  errormsg: "";
  reurl = "";
  user: SocialUser;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/login";
  seometa: any;

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private logedUser: AuthService,
    private socialLogin: socialLogin,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {
    this.socialLogin.authState.subscribe(user => {
      this.user = user;
    });

    this.homefeed = this.logedUser.getToken();
    if (this.homefeed) {
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
      var form = this.loginForm.value;

      const url = environment.apiUrl + "auth/login/";

      this.http
        .post(url, { username: form.user, password: form.pass })
        .subscribe(
          data => {
            this.logdata = data;

            this.localStorage.setItem("token", this.logdata.data.token);
            this.localStorage.setItem("logedUser", this.logdata.data.User.id);
            this.localStorage.setItem(
              "logedname",
              this.logdata.data.User.username
            );
            this.localStorage.setItem(
              "usertype",
              this.logdata.data.User.role_id
            );
            this.localStorage.setItem(
              "userlog",
              this.logdata.data.User.referral_id
            );
            this.reurl = this.localStorage.getItem("reUrl");
            //console.log(localStorage.getItem('logedUser'));

            if (this.reurl) {
              //this.router.navigate([this.reurl]);
              this.window.location.href = environment.siteUrl + this.reurl;
              this.localStorage.removeItem("reUrl");
            } else {
              //this.router.navigate(["/myaccount"]);
              if (this.logdata.data.User.role_id == 3) {
                this.window.location.href = environment.siteUrl + "myaccount";
              } else {
                this.window.location.href = environment.siteUrl + "agent";
              }
            }

            this.loginForm.reset();
          },
          msg => {
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

  values = "";
  onKey(event: any) {
    this.values = "";
    this.values += event.target.value + "";
  }

  signInWithGoogle(): void {
    this.socialLogin.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialLogin
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((res: any) =>
        this.http
          .post(environment.apiUrl + "auth/login/facebook", {
            name: res.name,
            first_name: res.name,
            last_name: res.name,
            email: res.email,
            id: res.id
          })
          .subscribe(
            (data: any) => {
              this.logdata = data;
              this.localStorage.setItem("token", this.logdata.data.token);
              this.localStorage.setItem("logedUser", this.logdata.data.User.id);
              this.localStorage.setItem(
                "logedname",
                this.logdata.data.User.username
              );
              this.reurl = this.localStorage.getItem("reUrl");
              if (this.reurl) {
                this.window.location.href = environment.siteUrl + this.reurl;
                this.localStorage.removeItem("reUrl");
              } else {
                this.window.location.href = environment.siteUrl + "myaccount";
              }
            },
            (msg: any) => {
              //console.log(msg);
              this.results = msg;
              this.results = msg.error;
              this.errormsg = msg["error"].error;
            }
          )
      );
  }

  /* SEO SETTINGS */
  setSeo() {
    this.http.get(this.seourl).subscribe(
      (res: any) => {
        this.seometa = res;
        if (this.seometa.metas.title) {
          this.title.setTitle(this.seometa.metas.title);
          this.meta.updateTag({
            name: "twitter:title",
            content: this.seometa.metas.title
          });
          this.meta.updateTag({
            name: "og:title",
            content: this.seometa.metas.title
          });
        }

        this.meta.addTag({
          property: "og:url",
          content: this.seopath + "" + this.router.url
        });

        if (this.seometa.metas.description) {
          this.meta.updateTag({
            name: "description",
            content: this.seometa.metas.description
          });
          this.meta.addTag({
            property: "og:description",
            content: this.seometa.metas.description
          });
          this.meta.updateTag({
            name: "twitter:description",
            content: this.seometa.metas.description
          });
        }
        if (this.seometa.metas.keywords) {
          this.meta.updateTag({
            name: "keywords",
            content: this.seometa.metas.keywords
          });
        }
      },
      (msg: any) => {
        //console.log(msg);
      }
    );

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute("href", this.seopath + "/login");
  }
  /* SEO SETTINGS Close*/
}
