import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-enquiry",
  templateUrl: "./enquiry.component.html",
  styleUrls: ["./enquiry.component.css"]
})
export class EnquiryComponent implements OnInit {
  siteUrl = environment.siteUrl;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/listing-enquiry";
  seometa: any;

  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  url = environment.apiUrl + "auth/profile/" + this.logeduser + "/listings";
  listDetails: any;
  results: any;
  errormsg: any;
  successmsg: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc
  ) {
    this.setSeo();

    this.meta.updateTag({
      name: "robots",
      content: "noindex"
    });
  }

  ngOnInit() {
    this.getListing();
  }

  getListing() {
    this.http
      .get(this.url, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (lists: any) => {
          this.listDetails = lists.enquires;
          console.log(this.listDetails);
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
