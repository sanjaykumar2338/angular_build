import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-listreviews",
  templateUrl: "./listreviews.component.html",
  styleUrls: ["./listreviews.component.css"]
})
export class ListreviewsComponent implements OnInit {
  logeduser = localStorage.getItem("logedUser");
  Auth_Token = localStorage.getItem("token");
  dashUrl = environment.apiUrl + "listings/reviews/list/user/" + this.logeduser;
  contreview =
    environment.apiUrl + "auth/" + this.logeduser + "/dashboard/counts";
  imgPath = environment.imgPath;
  reviewls: any;
  recounts: any;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/listing-reviews";
  seometa: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title
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
    this.getReviews();
  }

  getReviews() {
    this.http
      .get(this.dashUrl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.reviewls = res;
          //console.log(res);
        },
        (msg: any) => {
          console.log(msg);
        }
      );

    this.http
      .get(this.contreview, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.recounts = res;
          console.log(res);
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
