import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, WINDOW } from "@ng-toolkit/universal";

@Component({
  selector: "app-commission",
  templateUrl: "./commission.component.html",
  styleUrls: ["./commission.component.css"]
})
export class CommissionComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/agent-earned-commission";
  seometa: any;

  Auth_Token = this.window.localStorage.getItem("token");
  logeduser = this.window.localStorage.getItem("logedUser");

  commurl =
    environment.apiUrl + "agent/" + this.logeduser + "/commission-earnings";
  commdetails: any;

  prequest =
    environment.apiUrl + "agent/" + this.logeduser + "/payment-request";

  reqsucc: any;
  reqfail: any;
  load: any;

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private meta: Meta,
    private title: Title,
    private router: Router,
    private http: HttpClient
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
    this.http
      .get(this.commurl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.commdetails = res.data;
          console.log(this.commdetails);
        },
        msg => {
          console.log(msg);
        }
      );
  }

  requestadmin(event) {
    let referral_id = event.target.getAttribute("referral-id");
    let order_id = event.target.getAttribute("data-orderid");
    let amount = event.target.getAttribute("data-amount");

    /* this.load = "t"; */
    this.http
      .post(
        this.prequest,
        {
          referral_id: this.logeduser,
          order_id: order_id,
          amount: "",
          message: ""
        },
        {
          headers: new HttpHeaders().set("Authorization", this.Auth_Token)
        }
      )
      .subscribe(
        (res: any) => {
          this.load = "";
          this.reqsucc = res.message;
          this.reqfail = "";
        },
        msg => {
          this.load = "";
          this.reqsucc = "";
          this.reqfail = "t";
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
