import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { environment } from "../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Component({
  selector: "app-verifyemail",
  templateUrl: "./verifyemail.component.html",
  styleUrls: ["./verifyemail.component.css"]
})
export class VerifyemailComponent implements OnInit {
  sitepath = environment.sitepath;
  seopath = environment.siteUrl;
  seourl = environment.apiUrl + "pages/verifyemail";
  seometa: any;
  bemail = sessionStorage.getItem("addedEmail");

  vaildtoken: any;
  errormsg: any;
  success: any;
  listingid = this.route.snapshot.paramMap.get("id");
  verifyurl = environment.apiUrl + "listings/listings/verify/email/";
  verifysucc = "";
  verifyfail = "";

  constructor(
    private router: Router,
    private http: HttpClient,
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
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
    this.http.post(this.verifyurl, { listing_id: this.listingid }).subscribe(
      (res: any) => {
        this.verifysucc = "t";
        this.verifyfail = "";
        console.log(res);
      },
      (msg: any) => {
        this.verifysucc = "";
        this.verifyfail = "t";
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
          content: this.seopath + "/verifyemail"
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
