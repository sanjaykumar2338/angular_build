import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import { Meta, Title, DOCUMENT } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component({
  selector: "app-reqenquiry",
  templateUrl: "./reqenquiry.component.html",
  styleUrls: ["./reqenquiry.component.css"]
})
export class ReqenquiryComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/customer-enquiry";
  seometa: any;

  auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  enqlist: any;
  getlist = environment.apiUrl + "auth/" + this.logeduser + "/enquires";
  cusertype = localStorage.getItem("utype");
  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private http: HttpClient,
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
    if (this.cusertype == "owner") {
      /* window.location.href = "/myaccount"; */
    }

    this.http
      .get(this.getlist, {
        headers: new HttpHeaders().set("Authorization", this.auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.enqlist = res.data;
          console.log(res);
        },
        msg => {
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

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute("href", this.seopath + "/customer-enquiry");
  }
  /* SEO SETTINGS Close*/
}
