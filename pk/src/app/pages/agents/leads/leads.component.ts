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
  selector: "app-leads",
  templateUrl: "./leads.component.html",
  styleUrls: ["./leads.component.css"]
})
export class LeadsComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/lead-listing";
  seometa: any;

  listcountry: any;
  listRegs: any;

  Auth_Token = this.window.localStorage.getItem("token");
  logeduser = this.localStorage.getItem("logedUser");

  getlead = environment.apiUrl + "agent/" + this.logeduser + "/leads";
  lscustomer: any;

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
    this.http
      .get(this.getlead, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.lscustomer = res.data;
          console.log(res);
        },
        (msg: any) => {
          console.log(msg);
        }
      );
    this.getRegion();
    this.getCountry();
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
