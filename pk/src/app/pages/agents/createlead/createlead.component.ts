import { Component, OnInit, Inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { from } from "rxjs";
import { LOCAL_STORAGE, WINDOW } from "@ng-toolkit/universal";

@Component({
  selector: "app-createlead",
  templateUrl: "./createlead.component.html",
  styleUrls: ["./createlead.component.css"]
})
export class CreateleadComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/create-lead";
  seometa: any;

  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  phonereg = /^[0-9][0-9]*([.][0-9]{2}|)$/;

  listcountry: any;
  listRegs: any;
  loader: any;
  Auth_Token = this.window.localStorage.getItem("token");
  logeduser = this.localStorage.getItem("logedUser");
  errormsg: any;
  successmsg: any;

  createurl = environment.apiUrl + "agent/" + this.logeduser + "/create-lead";
  newlead: FormGroup;

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private meta: Meta,
    private title: Title,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
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

  getRegion() {
    const url = environment.apiUrl + "listings/regions";
    this.http.get(url).subscribe((res: any) => {
      this.listRegs = res.data;
    });
  }

  getCountry() {
    const url = environment.apiUrl + "auth/countries";
    this.http.get(url).subscribe((res: any) => {
      this.listcountry = res.data;
    });
  }

  ngOnInit() {
    this.newlead = this.fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      address: [""],
      state: [""],
      country: [""],
      company: [""]
    });
    this.getRegion();
    this.getCountry();
  }

  onSubmit() {
    var form = this.newlead.value;
    if (this.newlead.valid) {
      console.log("form submitted");
      this.loader = "t";
      this.http
        .post(
          this.createurl,
          {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            address: form.address,
            state: form.state,
            country: form.country,
            company: form.company
          },
          { headers: new HttpHeaders().set("Authorization", this.Auth_Token) }
        )
        .subscribe(
          (res: any) => {
            this.loader = "";
            this.successmsg = "t";
            this.errormsg = "";
            this.newlead.reset();
            /*  console.log(res); */
          },
          (msg: any) => {
            this.loader = "";
            this.successmsg = "";
            this.errormsg = "t";
            console.log(msg);
          }
        );
    } else {
      this.validateAllFormFields(this.newlead);
    }
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
  }
  /* SEO SETTINGS Close*/
}
