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
  selector: "app-basic",
  templateUrl: "./basic.component.html",
  styleUrls: ["./basic.component.css"]
})
export class BasicComponent implements OnInit {
  pagename = this.route.snapshot.paramMap.get("page");
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/landing-page-builder";
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
    this.doc.body.classList.add("plan-landing-page");
  }

  checkout(evt, pack) {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem("package", evt);
    }
    if (isPlatformBrowser(this._platformId)) {
      this.isLoggedIn = this.authservice.getToken();
    }

    if (evt == environment.freePackage) {
      localStorage.setItem("reUrl", "pages/landing-page-builder");
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

  handleChange(evt) {
    var target = evt.target;

    if (target.checked) {
      console.log(evt.target.dataset.value);
      this._prevSelected = target;
      this.namepack = evt.target.getAttribute("name");

      if (this.namepack == "basic") {
        if (evt.target.dataset.value == "month") {
          this.pack1 = "";
        }
        if (evt.target.dataset.value != "month") {
          this.pack1 = "true";
        }
      }
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
    link.setAttribute("href", this.seopath + "/plans/landing-page-builder");
  }
  /* SEO SETTINGS Close*/
}
