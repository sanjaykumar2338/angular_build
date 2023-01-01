import { Component, OnInit, Inject } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../src/environments/environment.prod";
import { DOCUMENT } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-terms",
  templateUrl: "./terms.component.html",
  styleUrls: ["./terms.component.css"]
})
export class TermsComponent implements OnInit {
  contentUrl = environment.apiUrl + "pages/terms-and-conditions";
  pagecontent: any;

  seopath = environment.sitepath;
  seourl = this.contentUrl;
  seometa: any;

  constructor(
    private router: Router,
    private meta: Meta,
    private title: Title,
    private http: HttpClient,
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
    this.http.get(this.contentUrl).subscribe(
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
    link.setAttribute("href", this.seopath + "/terms-and-conditions");
  }
  /* SEO SETTINGS Close*/
}
