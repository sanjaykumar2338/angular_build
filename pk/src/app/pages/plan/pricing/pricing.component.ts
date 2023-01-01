import { Component, OnInit, Inject } from "@angular/core";
import { AuthService } from "../../../../../src/app/auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-pricing",
  templateUrl: "./pricing.component.html",
  styleUrls: ["./pricing.component.css"]
})
export class PricingComponent implements OnInit {

  pack: Object;
  constructor(
    private router: Router,
    private authservice: AuthService,
    private http: HttpClient,
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

  getPackages() {
    this.packPath = environment.apiUrl + "/plans/plans";
    this.http.get(this.packPath).subscribe(res => {
      this.pack = res;
      console.log(this.pack);
    });
  }

  isLoggedIn = "";
  locip = "";
  freeopts: any;

  adminId: any;
  auth_Token: any;
  logeduser: any;
  ifRefferral = "null";

  ipAddress: any;
  packcountry = "";
  packPath = "";
  freepack: boolean = false;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/plans";
  seometa: any;
  theHtmlString: string;
  errormsg: any;
  successmsg: any;
  loader: any;
  tab: any;

  billinglist: any;
  exitfree: boolean = false;

  ngOnInit() {
    this.tab = 1;
    this.adminId = this.authservice.getUser();
    this.auth_Token = this.authservice.getToken();
    this.logeduser = this.authservice.getUser();
    if (this.logeduser) {
      this.ifRefferral = this.authservice.getUserReferral();
      console.log(this.ifRefferral + "if");

      this.http
        .get(environment.apiUrl + "auth/profile/" + this.logeduser + "/userorders", {
          headers: new HttpHeaders().set("Authorization", this.auth_Token)
        }).subscribe(
          (res: any) => {
            this.billinglist = res.data;
            for (var index = 0; index < res.data.length; ++index) {
              var pids = res.data[index];
              if (pids.plan_id == "766") {
                this.exitfree = true;
                return false;
              }
            }
          });

    } else {
      this.ifRefferral = "null";
      console.log(this.ifRefferral + "else");
    }

    //this.getIploc();

    this.getPackages();
    // this.getIP();

    this.http
      .get(environment.apiUrl + "auth/country-zone")
      .subscribe((data: any) => {
        this.ipAddress = data.free;
        /* console.log(this.logeduser + "---" + data); */
        if (this.ipAddress == 0) {
          this.packcountry = "usa";
          this.freepack = false;
          console.log("Free Disabled All country - Exclude of Us");
        } else {
          console.log("Free Enabled - All country");
          this.packcountry = "";
          this.freepack = true;
        }
      });
  }



  tabshow($event) {
    this.tab = $event;
  }

  checkout(evt) {
    console.log(evt);
    if (isPlatformBrowser(this._platformId)) {
      this.isLoggedIn = this.authservice.getToken();
    }

    if (evt == environment.freePackage) {
      localStorage.setItem("reUrl", "plans");
    } else {
      localStorage.setItem("reUrl", "checkout");
    }

    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem("package", evt);
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
              /*starteractive - is free page to show message in top of the dashboard */
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
        if (this.seometa.metas.title) {
          this.title.setTitle(
            "Add Business to Directory Submission SEO Services"
          );
          this.meta.updateTag({
            name: "twitter:title",
            content: "Add Business to Directory Submission SEO Services"
          });
          this.meta.updateTag({
            name: "og:title",
            content: this.seometa.metas.title
          });
        }

        this.meta.addTag({
          property: "og:url",
          content: this.seopath + "/plans"
        });

        if (this.seometa.metas.description) {
          this.meta.updateTag({
            name: "description",
            content:
              "Submit website to business directory now. Start a backlink submission strategy to improve on your online ranking. Add business details manually for best directory submission."
          });
          this.meta.addTag({
            property: "og:description",
            content:
              "Submit website to business directory now. Start a backlink submission strategy to improve on your online ranking. Add business details manually for best directory submission."
          });
          this.meta.updateTag({
            name: "twitter:description",
            content:
              "Submit website to business directory now. Start a backlink submission strategy to improve on your online ranking. Add business details manually for best directory submission."
          });
        }
        if (this.seometa.metas.keywords) {
          this.meta.updateTag({
            name: "keywords",
            content:
              "backlink submission, website submission, local seo Services, directory submission "
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
    link.setAttribute("href", this.seopath + "/plans");
  }
  /* SEO SETTINGS Close*/

}
