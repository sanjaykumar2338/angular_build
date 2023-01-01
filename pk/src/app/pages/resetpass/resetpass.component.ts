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
import { environment } from "../../../../src/environments/environment.prod";
import { AuthService } from "../../../../src/app/auth/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-resetpass",
  templateUrl: "./resetpass.component.html",
  styleUrls: ["./resetpass.component.css"]
})
export class ResetpassComponent implements OnInit {
  homefeed: any;
  resetdata: any;
  results: any;
  errormsg: any;
  sendmsg: any;
  vaildtoken: any;
  loader: boolean = false;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/reset-password";
  seometa: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private logedUser: AuthService,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "noindex"
    });
    this.meta.updateTag({
      name: "googlebot",
      content: "noindex"
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.vaildtoken = params["token"];
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

  checkPasswords(registerForm: FormGroup) {
    const pass = registerForm.controls.pass.value;
    const confirmPass = registerForm.controls.cpass.value;
    return pass == confirmPass ? null : { notSame: true };
  }

  resetForm = this.fb.group(
    {
      pass: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      cpass: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    },
    {
      validator: this.checkPasswords
    }
  );

  onSubmit() {
    var form = this.resetForm.value;

    if (this.resetForm.valid) {
      this.loader = true;

      const url = environment.apiUrl + "auth/reset";

      this.http
        .post(url, {
          password: form.pass,
          token: this.vaildtoken
        })
        .subscribe(
          (res: any) => {
            this.resetdata = res.data;
            //console.log(this.resetdata);
            this.loader = false;
            this.resetForm.reset();
            this.sendmsg = true;
            setTimeout(() => {
              this.router.navigate(["/login"]);
            }, 3000);
          },
          msg => {
            this.results = msg;
            this.loader = false;
            this.results = msg.error;
            //console.log(this.results);
            this.errormsg = msg["error"].message;
          }
        );

      console.log("form submitted");
    } else {
      this.validateAllFormFields(this.resetForm);
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
    link.setAttribute("href", this.seopath + "/reset-password");
  }
  /* SEO SETTINGS Close*/
}
