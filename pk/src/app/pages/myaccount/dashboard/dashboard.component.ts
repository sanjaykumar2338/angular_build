import { Component, OnInit, Inject } from "@angular/core";
import { environment } from "../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Meta, Title } from "@angular/platform-browser";
import { AuthService } from "../../../auth/auth.service";
import { PLATFORM_ID } from "@angular/core";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";
import { UserdetailService } from "../../../services/userdetail.service";
import { LOCAL_STORAGE } from "@ng-toolkit/universal";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  dashUrl: any;
  counts: any;
  logeduser: any;
  Auth_Token: any;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/myaccount";
  seometa: any;
  cusertype = "owner";

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    public authservice: AuthService,
    private getcounts: UserdetailService,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private _platformId: Object
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
    this.cusertype = this.localStorage.getItem("utype")
      ? this.localStorage.getItem("utype")
      : "owner";
    //this.cusertype = "owner";
    //this.getCounts();

    this.getcounts.getDashcounts().subscribe((res: any) => {
      this.counts = res;
      console.log(res);
    });

    /* if (!isPlatformBrowser(this._platformId)) {
      this.dashUrl =
        environment.apiUrl + "auth/" + this.logeduser + "/dashboard/counts";
      this.logeduser = this.authservice.getUser();
      this.Auth_Token = this.authservice.getToken();
    } */
  }

  getCounts() {
    this.http
      .get(this.dashUrl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.counts = res;
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
