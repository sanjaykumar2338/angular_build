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

import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";

@Injectable()
@Component({
  selector: "app-cityservlanding",
  templateUrl: "./cityservlanding.component.html",
  styleUrls: ["./cityservlanding.component.css"]
})
export class CityservlandingComponent implements OnInit {
  servicename = this.route.snapshot.paramMap.get("service");
  statename = this.route.snapshot.paramMap.get("state");
  seocont: any;

  seourl = environment.apiUrl + "pages/" + this.servicename;

  /* contentUrl =
    environment.apiUrl +
    "local-marketing/region/" +
    this.statename +
    "/city/" +
    this.cityname; */

  contentUrl = environment.apiUrl + "local-marketing/region/" + this.statename;
  pagecontent: any;
  testBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.testBrowser = isPlatformBrowser(platformId);
    if (!this.testBrowser) {
      this.http.get(this.contentUrl).subscribe(
        (res: any) => {
          this.pagecontent = res;
        },
        (msg: any) => {
          console.log(msg);
        }
      );
    }
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  async ngOnInit() {
    this.http.get(this.contentUrl).subscribe(
      (res: any) => {
        this.pagecontent = res;
      },
      (msg: any) => {
        console.log(msg);
      }
    );

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute("href", "https://walldirectory.com");
  }

  setSeo() {
    this.http.get(this.seourl).subscribe(
      (res: any) => {
        this.seocont = res.metas;

        this.title.setTitle(this.seocont.title);
        this.meta.updateTag({
          name: "description",
          content: this.seocont.description
        });
        this.meta.updateTag({
          name: "keywords",
          content: this.seocont.keywords
        });

        this.meta.addTag({
          property: "og:description",
          content: this.seocont.description
        });
        this.meta.addTag({ property: "og:url", content: this.router.url });

        this.meta.updateTag({
          name: "twitter:title",
          content: this.seocont.description
        });
        this.meta.updateTag({
          name: "twitter:description",
          content: this.seocont.keywords
        });
      },
      (msg: any) => {}
    );
  }

  scroll(id) {
    console.log("scrolling to" + id);
    let el = document.getElementById(id);
    el.scrollIntoView();
    window.scrollBy(0, -50);
  }
}
