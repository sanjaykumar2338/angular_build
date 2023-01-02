import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-joiners",
  templateUrl: "./joiners.component.html",
  styleUrls: ["./joiners.component.css"]
})
export class JoinersComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/list-of-joiners";
  seometa: any;

  imgPath = environment.imgPath;
  logeduser = localStorage.getItem("logedUser");
  Auth_Token = localStorage.getItem("token");
  joinerUlr = environment.apiUrl + "listings/joiners/user/" + this.logeduser;
  joinerls: any;

  joincounturl =
    environment.apiUrl + "auth/" + this.logeduser + "/dashboard/counts";
  joincount: any;

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
    this.getjoiners();
  }

  getjoiners() {
    this.http
      .get(this.joinerUlr, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.joinerls = res;
          console.log(res);
        },
        (msg: any) => {
          console.log(msg);
        }
      );

    this.http
      .get(this.joincounturl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.joincount = res;
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
