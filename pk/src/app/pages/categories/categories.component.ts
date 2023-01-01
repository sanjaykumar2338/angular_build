import { Component, OnInit, Inject } from "@angular/core";
import { environment } from "../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  catelistUrl = environment.apiUrl + "listings/categories/list/counts";
  cateList: any;
  imgPath = environment.imgPath;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/categories";
  seometa: any;

  public show: boolean = false;
  public buttonName: any = "Show";

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

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.http.get(this.catelistUrl).subscribe(
      (res: any) => {
        this.cateList = res;
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) this.buttonName.addClass = "Hide";
    else this.buttonName = "Show";
  }

  shows($event) {
    var id = event.target as HTMLInputElement;
    var cl = "showmores_" + id.id;
    //  var elements = document.getElementsByClassName(cl);
    var el = document.getElementsByClassName(cl);

    //console.log(id.id);
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
    link.setAttribute("href", this.seopath + "/categories");
  }
  /* SEO SETTINGS Close*/
}
