import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.css"]
})
export class InvoiceComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/billing";
  seometa: any;

  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  billingUrl =
    environment.apiUrl + "auth/profile/" + this.logeduser + "/userorders";
  billinglist: any;
  bllingcount: boolean = false;

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
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
      .get(this.billingUrl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.billinglist = res.data;
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
