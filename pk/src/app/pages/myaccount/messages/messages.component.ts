import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"]
})
export class MessagesComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/list-of-messages";
  seometa: any;

  logeduser = localStorage.getItem("logedUser");
  Auth_Token = localStorage.getItem("token");
  nodiUrl =
    environment.apiUrl + "auth/" + this.logeduser + "/notifications-by-page";
  nodifyList: any;

  contmsg = environment.apiUrl + "auth/" + this.logeduser + "/dashboard/counts";
  msgcounts: any;
  config: any;
  collection = [];
  tot: any;
  p: number = 1;

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

  getMessages() {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
    };
    this.http
      .get(this.nodiUrl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.nodifyList = res;
          console.log(res);

          this.msgcounts = res.count;
          this.collection = res.data;
          this.tot = res.count;
        },
        (msg: any) => {
          console.log(msg);
        }
      );
  }

  pageChange(newPage: number) {
    this.config = {
      currentPage: newPage,
      itemsPerPage: 10
    };
    this.p = newPage; //page index change.
    this.http
      .get(this.nodiUrl + "?page=" + newPage, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.nodifyList = res;
          console.log(res);
          this.collection = res.data;
        },
        (msg: any) => {
          console.log(msg);
        }
      );
  }

  ngOnInit() {
    this.getMessages();
    /* this.http
      .get(this.contmsg, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.msgcounts = res;
          //console.log(res);
        },
        (msg: any) => {
          console.log(msg);
        }
      ); */
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
