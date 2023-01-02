import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { environment } from "../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Component({
  selector: "app-thanks",
  templateUrl: "./thanks.component.html",
  styleUrls: ["./thanks.component.css"],
})
export class ThanksComponent implements OnInit {
  sitepath = environment.sitepath;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/thankyou";
  seometa: any;

  listingId = this.route.snapshot.paramMap.get("id");
  bemail = sessionStorage.getItem("addedEmail");
  sendmail = "";
  mailsend = "";
  mailfail = "";
  verifyUrl = environment.apiUrl + "listings/listings/send/verifyemail";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private meta: Meta,
    private title: Title
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "noindex",
    });
  }

  ngOnInit() {}

  send_verification() {
    this.sendmail = "t";
    this.mailsend = "";
    this.mailfail = "";
    this.http.post(this.verifyUrl, { listing_id: this.listingId }).subscribe(
      (res: any) => {
        console.log(res);
        this.sendmail = "";
        this.mailsend = res.message;
        this.mailfail = "";
        setTimeout(() => {
          this.mailsend = "";
        }, 3000);
      },
      (msg: any) => {
        console.log(msg);
        this.sendmail = "";
        this.mailsend = "";
        this.mailfail = msg;
        setTimeout(() => {
          this.mailfail = "";
        }, 3000);
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
            content: this.seometa.metas.title,
          });
          this.meta.updateTag({
            name: "og:title",
            content: this.seometa.metas.title,
          });
          this.meta.updateTag({
            name: "robots",
            content: "noindex",
          });
          this.meta.updateTag({
            name: "googlebot",
            content: "index, follow",
          });
        }

        this.meta.addTag({
          property: "og:url",
          content: this.seopath + "" + this.router.url,
        });

        if (this.seometa.metas.description) {
          this.meta.updateTag({
            name: "description",
            content: this.seometa.metas.description,
          });
          this.meta.addTag({
            property: "og:description",
            content: this.seometa.metas.description,
          });
          this.meta.updateTag({
            name: "twitter:description",
            content: this.seometa.metas.description,
          });
        }
        if (this.seometa.metas.keywords) {
          this.meta.updateTag({
            name: "keywords",
            content: this.seometa.metas.keywords,
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
