import { Component, OnInit, Inject } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { environment } from "../../../../environments/environment.prod";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { AuthService } from "../../../../../src/app/auth/auth.service";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";

@Component({
  selector: "app-starter",
  templateUrl: "./starter.component.html",
  styleUrls: ["./starter.component.css"]
})
export class StarterComponent implements OnInit {
  pagename = this.route.snapshot.paramMap.get("page");
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/link-building-service";
  seometa: any;
  content: any;

  adminId: any;
  auth_Token: any;
  logeduser: any;
  freepack: boolean = false;
  ipAddress: any;
  packcountry = "";
  packPath = "";
  errormsg: any;
  successmsg: any;
  loader: any;
  isLoggedIn = "";

  pack1 = "";
  private _prevSelected: any;
  namepack = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {
    this.auth_Token = this.authservice.getToken();
    this.logeduser = this.authservice.getUser();
    this.doc.body.classList.add("plan-landing-page");

    this.http
      .get(environment.apiUrl + "auth/country-zone")
      .subscribe((data: any) => {
        this.ipAddress = data.free;
        if (this.ipAddress == 0) {
          this.packcountry = "usa";
          this.freepack = false;
          console.log("Free Disabled All country - Exclude of Us");
        } else {
          console.log("Free Enabled - All country");
          this.packcountry = "";
          this.freepack = true;
        }

        this.packcountry = "usa";
        this.freepack = false;
      });
  }

  checkout(evt, pack) {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem("package", evt);
    }
    if (isPlatformBrowser(this._platformId)) {
      this.isLoggedIn = this.authservice.getToken();
    }

    if (evt == environment.freePackage) {
      localStorage.setItem("reUrl", "plans/link-building-service");
    } else {
      localStorage.setItem("reUrl", "checkout");
    }

    if (this.isLoggedIn) {
      /*Free*/
      this.loader = "t";
      this.successmsg = "";
      this.errormsg = "";
      var packid = this.authservice.getChoosePackage();
      if (packid == environment.freePackage) {
        var packUrl = environment.apiUrl + "orders/free";

        this.http
          .post(
            packUrl,
            {
              user_id: this.logeduser,
              plan_id: packid
            },
            { headers: new HttpHeaders().set("Authorization", this.auth_Token) }
          )
          .subscribe(
            (res: any) => {
              this.successmsg = "t";
              this.errormsg = "";
              this.loader = "";
              localStorage.setItem("starteractive", "1");
              localStorage.removeItem("package");
              localStorage.removeItem("reUrl");
              window.location.href = environment.siteUrl + "add-business";
            },
            (msg: any) => {
              this.successmsg = "";
              this.loader = "";
              this.errormsg = msg.error.error;
              document.getElementById("msgbox").scrollIntoView({
                behavior: "smooth"
              });
              setTimeout(() => {
                this.errormsg = "";
              }, 6000);
              localStorage.removeItem("package");
            }
          );
      } else {
        this.router.navigate(["/checkout"]);
      }
    } else {
      window.location.href = "/login";
    }
  }

  /* SEO SETTINGS */
  setSeo() {
    this.http.get(this.seourl).subscribe(
      (res: any) => {
        this.seometa = res;
        this.content = res.content;
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

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute("href", this.seopath + "/plans/link-building-service");
  }
  /* SEO SETTINGS Close*/
}
