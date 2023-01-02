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
import { audience_services } from "../../audience/audiencecontents";

@Component({
  selector: "app-audienceserv",
  templateUrl: "./audienceserv.component.html",
  styleUrls: ["./audienceserv.component.css"]
})
export class AudienceservComponent implements OnInit {
  catename = this.route.snapshot.paramMap.get("cate");
  sericename = this.activatedRoute.snapshot.url[1].path;
  siteUrl = environment.siteUrl;

  content = audience_services[this.sericename];

  seopath = environment.sitepath;
  /* seourl = environment.apiUrl + "listings/categories/slug/" + this.catename; */
  seourl =
    environment.apiUrl + "pages/" + this.activatedRoute.snapshot.url[1].path;
  seometa: any;
  catname: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {
    console.log(this.seourl);
  }

  scroll(id) {
    //console.log("scrolling to" + id);
    let el = document.getElementById(id);
    el.scrollIntoView();
    window.scrollBy(0, -50);
  }

  /* SEO SETTINGS */
  setSeo() {
    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute(
      "href",
      "https://walldirectory.com/audience-interest/" + this.sericename
    );

    //console.log(this.seourl);
    this.http.get(this.seourl).subscribe(
      (res: any) => {
        console.log(res);
        this.seometa = res.metas;

        if (this.seometa.title) {
          this.title.setTitle(this.seometa.title);
          this.meta.updateTag({
            name: "twitter:title",
            content: this.seometa.title
          });
          this.meta.updateTag({
            name: "og:title",
            content: this.seometa.title
          });
        }

        this.meta.addTag({
          property: "og:url",
          content: this.seopath + "" + this.router.url
        });

        if (this.seometa.description) {
          this.meta.updateTag({
            name: "description",
            content: this.seometa.description
          });
          this.meta.addTag({
            property: "og:description",
            content: this.seometa.description
          });
          this.meta.updateTag({
            name: "twitter:description",
            content: this.seometa.description
          });
        }
        if (this.seometa.keywords) {
          this.meta.updateTag({
            name: "keywords",
            content: this.seometa.keywords
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
