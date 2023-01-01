import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-reqcustomer",
  templateUrl: "./reqcustomer.component.html",
  styleUrls: ["./reqcustomer.component.css"]
})
export class ReqcustomerComponent implements OnInit {
  logeduser = localStorage.getItem("logedUser");
  Auth_Token = localStorage.getItem("token");

  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/customer-requests";
  seometa: any;

  reqcounts: any;
  noPaidUser: any;
  categoryreq: any;
  homeserreq: any;
  planurl =
    environment.apiUrl + "auth/profile/" + this.logeduser + "/RemainingListing";
  userplan: any;
  nopack: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title
  ) {
    this.setSeo();
  }

  ngOnInit() {
    this.http
      .get(this.planurl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.userplan = res.data.plan;
          if (this.userplan.plan_id == "766") {
            this.noPaidUser = "";
          } else {
            this.noPaidUser = "t";
          }
          console.log(this.userplan);
          this.nopack = "";
        },
        (msg: any) => {
          /*  this.nopack = "t"; */
          this.nopack = msg;
        }
      );

    this.http
      .get(environment.apiUrl + "auth/" + this.logeduser + "/owner-enquiries", {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.reqcounts = res;
          this.categoryreq = res.categoryjoiner;
          this.homeserreq = res.servicereqest;
          console.log(this.reqcounts);
        },
        (msg: any) => {
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
