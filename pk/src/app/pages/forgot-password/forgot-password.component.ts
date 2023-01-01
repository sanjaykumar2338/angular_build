import { Component, OnInit, Inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";

import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";
import { AuthService } from "../../../../src/app/auth/auth.service";
import { Meta, Title } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  homefeed: any;
  resetdata: any;
  results: any;
  errormsg: any;
  sendmsg: any;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/forgot-password";
  seometa: any;
  loader: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private logedUser: AuthService,
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
    this.homefeed = this.logedUser.getToken();
    if (this.homefeed) {
      this.router.navigate(["/myaccount"]);
      console.log("Loged in");
    } else {
      console.log("Not Login");
      return true;
    }
  }

  forgotForm = this.fb.group({
    email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    ]
  });

  onSubmit() {
    if (this.forgotForm.valid) {
      console.log("form submitted");
      this.loader = "t";

      const url = environment.apiUrl + "auth/forgot";
      var form = this.forgotForm.value;

      this.http
        .post(url, {
          email: form.email
        })
        .subscribe(
          (res: any) => {
            this.loader = "";
            this.resetdata = res.data;
            this.sendmsg = res.message;
            this.errormsg = "";
            this.forgotForm.reset();
          },
          msg => {
            this.loader = "";
            this.results = msg;
            this.results = msg.error;
            this.errormsg = msg["error"].error;
            this.sendmsg = "";
            console.log(this.results);
          }
        );
    } else {
      this.validateAllFormFields(this.forgotForm);
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
    link.setAttribute("href", this.seopath + "/forgot-password");
  }
  /* SEO SETTINGS Close*/
}
