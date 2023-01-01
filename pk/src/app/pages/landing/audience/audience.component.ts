import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-audience",
  templateUrl: "./audience.component.html",
  styleUrls: ["./audience.component.css"]
})
export class AudienceComponent implements OnInit {
  catename = this.route.snapshot.paramMap.get("state");
  cateUrl = environment.apiUrl + "";
  landingimgpath = environment.apiUrl;
  pagecontent: any;
  contentUrl = "";
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/audience-interest";
  seometa: any;

  constructor(
    private router: Router,
    private meta: Meta,
    private title: Title,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {}

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
