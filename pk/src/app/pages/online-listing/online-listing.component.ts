import { Component, OnInit, Inject } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../src/environments/environment.prod";
import { DOCUMENT } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-online-listing",
  templateUrl: "./online-listing.component.html",
  styleUrls: ["./online-listing.component.css"]
})
export class OnlineListingComponent implements OnInit {
  contentUrl =
    environment.apiUrl + "pages/online-listing-and-link-building-services";
  pagecontent: any;

  seopath = environment.sitepath;
  seourl = this.contentUrl;
  seometa: any;

  constructor(
    private meta: Meta,
    private title: Title,
    private http: HttpClient,
    private router: Router,
    @Inject(DOCUMENT) private doc
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  getContent() {
    this.http.get(this.contentUrl).subscribe(
      (res: any) => {
        this.pagecontent = res;
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }

  ngOnInit() {
    this.getContent();
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
    link.setAttribute(
      "href",
      this.seopath + "/online-listing-and-link-building-services"
    );
  }
  /* SEO SETTINGS Close*/
}
