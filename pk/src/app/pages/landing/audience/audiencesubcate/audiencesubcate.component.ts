import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import { environment } from "../../../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-audiencesubcate",
  templateUrl: "./audiencesubcate.component.html",
  styleUrls: ["./audiencesubcate.component.css"]
})
export class AudiencesubcateComponent implements OnInit {
  catename = this.route.snapshot.paramMap.get("cate");
  subcatename = this.route.snapshot.paramMap.get("subcate");
  siteUrl = environment.siteUrl;

  seopath = environment.sitepath;
  seourl = environment.apiUrl + "listings/categories/slug/" + this.subcatename;
  seometa: any;
  catname: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private meta: Meta,
    private title: Title,
    public sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private doc
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {}

  scroll(id) {
    console.log("scrolling to" + id);
    let el = document.getElementById(id);
    el.scrollIntoView();
    window.scrollBy(0, -50);
  }

  /* SEO SETTINGS */
  setSeo() {
    this.http.get(this.seourl).subscribe(
      (res: any) => {
        this.seometa = res.data[0];
        this.catname = res.data[0].parentCat.name;

        if (this.seometa.meta.title) {
          this.title.setTitle(this.seometa.meta.title);
          this.meta.updateTag({
            name: "twitter:title",
            content: this.seometa.meta.title
          });
          this.meta.updateTag({
            name: "og:title",
            content: this.seometa.meta.title
          });
        }

        this.meta.addTag({
          property: "og:url",
          content: this.seopath + "" + this.router.url
        });

        if (this.seometa.meta.description) {
          this.meta.updateTag({
            name: "description",
            content: this.seometa.meta.description
          });
          this.meta.addTag({
            property: "og:description",
            content: this.seometa.meta.description
          });
          this.meta.updateTag({
            name: "twitter:description",
            content: this.seometa.meta.description
          });
        }
        if (this.seometa.metas.keywords) {
          this.meta.updateTag({
            name: "keywords",
            content: this.seometa.meta.keywords
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
