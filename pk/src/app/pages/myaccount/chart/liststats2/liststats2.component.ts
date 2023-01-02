import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-liststats2",
  templateUrl: "./liststats2.component.html",
  styleUrls: ["./liststats2.component.css"]
})
export class Liststats2Component implements OnInit {
  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  url = environment.apiUrl + "auth/profile/" + this.logeduser + "/listings";
  listDetails: any;
  results: any;
  errormsg: any;
  successmsg: any;
  freepackid = environment.freePackage;
  upgradeSuccess = "";
  upgradeSuccess1 = "";
  upgradeSuccess2 = "";
  upgradeError = "";

  verifyUrl = environment.apiUrl + "listings/listings/send/verifyemail";
  sendmail = "";
  vmailsend = "";
  vmailfail = "";

  siteUrl = environment.siteUrl;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/my-business";
  seometa: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc
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
    this.getListing();
  }

  deleteList(id) {
    if (id) {
      const durl = environment.apiUrl + "listings/listings/" + id;
      this.http
        .delete(durl, {
          headers: new HttpHeaders().set("Authorization", this.Auth_Token)
        })
        .subscribe(
          (delmsg: any) => {
            this.successmsg = delmsg;
            this.errormsg = "";
            //console.log('success'+delmsg);
            setTimeout(() => {
              this.successmsg = "";
              window.location.href = this.siteUrl + "all-business";
            }, 2000);
          },
          err => {
            console.log("err");
            this.successmsg = "";
            this.errormsg = err.error.message;
          }
        );
    }
  }

  onupgarde(pid) {
    var ugrade = environment.apiUrl + "listings/listings/" + pid + "/upgrade";
    this.http
      .post(
        ugrade,
        {
          status: 1
        },
        {
          headers: new HttpHeaders().set("Authorization", this.Auth_Token)
        }
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.success == 1) {
            this.upgradeSuccess1 = "t";
            this.upgradeSuccess = res.message;
          } else {
            this.upgradeSuccess2 = "t";
            this.upgradeSuccess = res.message;
          }

          window.scrollTo(0, 0);
        },
        msg => {
          console.log(msg);
          this.upgradeError = msg.error.error;
          window.scrollTo(0, 0);
        }
      );
  }

  getListing() {
    this.http
      .get(this.url, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (lists: any) => {
          this.listDetails = lists.data;
          //console.log(lists.data);
        },
        msg => {
          console.log(msg);
        }
      );
  }

  verifyemail(id) {
    console.log(id);
    this.sendmail = "t";
    this.vmailsend = "";
    this.vmailfail = "";
    this.http.post(this.verifyUrl, { listing_id: id }).subscribe(
      (res: any) => {
        console.log(res);
        this.vmailsend = res.message;
        this.vmailfail = "";
        setTimeout(() => {
          this.vmailsend = "";
        }, 3000);
      },
      (msg: any) => {
        console.log(msg);
        this.vmailsend = "";
        this.vmailfail = msg;
        setTimeout(() => {
          this.vmailfail = "";
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
