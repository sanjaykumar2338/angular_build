import { Component, OnInit, Inject } from "@angular/core";
import { environment } from "../../../../../src/environments/environment.prod";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-target",
  templateUrl: "./target.component.html",
  styleUrls: ["./target.component.css"]
})
export class TargetComponent implements OnInit {
  states: any;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/target-audience";
  seometa: any;

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
      content: "index, follow"
    });
  }

  ngOnInit() {
    this.getRegion();
  }

  getRegion() {
    const url = environment.apiUrl + "listings/regions/";
    this.http.get(url).subscribe((res: any) => {
      this.states = res.data;
    });
  }

  /* SEO SETTINGS */
  setSeo() {
    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute("href", "https://walldirectory.com/target-audience");

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
