import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, WINDOW } from "@ng-toolkit/universal";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/agent-customer-listing";
  seometa: any;

  Auth_Token = this.window.localStorage.getItem("token");
  logeduser = this.window.localStorage.getItem("logedUser");

  customerurl = environment.apiUrl + "agent/" + this.logeduser + "/customers";
  profDetails: any;
  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private meta: Meta,
    private title: Title,
    private router: Router,
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

  ngOnInit() {
    this.http
      .get(this.customerurl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.profDetails = res.data;
          console.log(this.profDetails);
        },
        msg => {
          console.log(msg);
        }
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
  }
  /* SEO SETTINGS Close*/
}
