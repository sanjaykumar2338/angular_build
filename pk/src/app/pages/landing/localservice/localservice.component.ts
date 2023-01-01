import {
  Component,
  OnInit,
  Inject,
  Injectable,
  PLATFORM_ID
} from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import { environment } from "../../../../../src/environments/environment.prod";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-localservice",
  templateUrl: "./localservice.component.html",
  styleUrls: ["./localservice.component.css"]
})
export class LocalserviceComponent implements OnInit {
  seourl =
    environment.apiUrl + "pages/" + this.activatedRoute.snapshot.url[1].path;
  seometa: any;
  seopath = environment.sitepath;
  seocont: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc,
    private activatedRoute: ActivatedRoute
  ) {
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {
    this.http.get(this.seourl).subscribe(
      (res: any) => {
        this.seometa = res;
        this.seocont = res;
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
    link.setAttribute("href", "https://walldirectory.com" + this.router.url);
  }

  /* SEO SETTINGS */
  setSeo() {}
  /* SEO SETTINGS Close*/

  scroll(id) {
    console.log("scrolling to" + id);
    let el = document.getElementById(id);
    el.scrollIntoView();
    window.scrollBy(0, -50);
  }
}
