import { Component, OnInit, Inject } from "@angular/core";
import { AuthService } from "../../../../src/app/auth/auth.service";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-package",
  templateUrl: "./package.component.html",
  styleUrls: ["./package.component.css"]
})
export class PackageComponent implements OnInit {
  isLoggedIn = "";
  locip = "";
  freeopts: any;

  adminId: any;
  auth_Token: any;
  logeduser: any;

  ipAddress: any;
  packcountry = "";
  packPath = "";
  pack1 = "";
  pack2 = "";
  pack3 = "";
  pack4 = "";
  pack: Object;

  selected: string;
  doSelected: any;
  namepack = "";
  freepack: boolean = false;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/plans";
  seometa: any;
  theHtmlString: string;

  errormsg: any;
  successmsg: any;
  loader: any;

  private _prevSelected: any;

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
    });
  }

  getIP() {
    this.http.get<{ ip: string }>("https://jsonip.com").subscribe(data => {
      this.ipAddress = data.ip;
    });
  }

  getIploc() {
    //Ip Address
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
      });
  }

  ngOnInit() {
    this.adminId = this.authservice.getUser();
    this.auth_Token = this.authservice.getToken();
    this.logeduser = this.authservice.getUser();

    //this.getIploc();

    this.getPackages();
    // this.getIP();

    this.http
      .get(environment.apiUrl + "auth/country-zone")
      .subscribe((data: any) => {
        this.ipAddress = data.free;
        console.log(this.logeduser + "---");
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

  checkout(evt) {
    if (isPlatformBrowser(this._platformId)) {
      this.isLoggedIn = this.authservice.getToken();
    }
    this.namepack = evt;

    if (evt == environment.freePackage) {
      localStorage.setItem("reUrl", "plans");
    } else {
      localStorage.setItem("reUrl", "checkout");
    }

    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem("package", evt);
    }

    //console.log(this.namepack);

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
              }, 5000);
            }
          );
      } else {
        this.router.navigate(["/checkout"]);
      }
    } else {
      this.router.navigate(["/login"]);
    }
  }

  handleChange(evt) {
    var target = evt.target;

    if (target.checked) {
      console.log(evt.target.dataset.value);
      this._prevSelected = target;
      this.namepack = evt.target.getAttribute("name");

      console.log(this.namepack);

      if (this.namepack == "basic") {
        if (evt.target.dataset.value == "month") {
          this.pack1 = "";
        }
        if (evt.target.dataset.value != "month") {
          this.pack1 = "true";
        }
      }

      if (this.namepack == "prof") {
        if (evt.target.dataset.value == "month") {
          this.pack2 = "";
        }
        if (evt.target.dataset.value != "month") {
          this.pack2 = "true";
        }
      }

      if (this.namepack == "enterp") {
        if (evt.target.dataset.value == "month") {
          this.pack3 = "";
        }
        if (evt.target.dataset.value != "month") {
          this.pack3 = "true";
        }
      }

      if (this.namepack == "starter") {
      }
    } else {
      //console.log(this._prevSelected)
    }
  }

  /* SEO SETTINGS */
  setSeo() {
    this.http.get(this.seourl).subscribe(
      (res: any) => {
        this.seometa = res;
        if (this.seometa.metas.title) {
          this.title.setTitle(
            "Free & Paid Directory Submission for Business & Local Listing Site USA"
          );
          this.meta.updateTag({
            name: "twitter:title",
            content:
              "Free & Paid Directory Submission for Business & Local Listing Site USA"
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
              "The Best business listing site USA. To develop your business by local listing site USA using Free Directory Submission sites - Wall directory"
          });
          this.meta.addTag({
            property: "og:description",
            content:
              "The Best business listing site USA. To develop your business by local listing site USA using Free Directory Submission sites - Wall directory"
          });
          this.meta.updateTag({
            name: "twitter:description",
            content:
              "The Best business listing site USA. To develop your business by local listing site USA using Free Directory Submission sites - Wall directory"
          });
        }
        if (this.seometa.metas.keywords) {
          this.meta.updateTag({
            name: "keywords",
            content:
              "Free directory submission sites in USA | Business listing sites USA | Local listing sites USA "
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
