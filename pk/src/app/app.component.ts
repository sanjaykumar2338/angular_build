import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Meta, Title } from "@angular/platform-browser";
import { environment } from "../../src/environments/environment.prod";
import { AdsenseModule } from "ng2-adsense";
import { Router, NavigationEnd } from "@angular/router";
import { SeoService } from "./services/seo.service";
import { WINDOW } from "@ng-toolkit/universal";

declare var jQuery: any;
declare var $: any;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  contentUrl = environment.apiUrl + "pages/home-page";
  pagecontent: any;
  siteurl = "http://localhost:4200/";

  /*  constructor(
    private meta: Meta,
    private title: Title,
    private seo: SeoService
  ) {
    this.seo.getseo;
    // this.title.setTitle("testsasrt");
  } */

  title = "wall-promo-landing";
  constructor(@Inject(WINDOW) private window: Window, private router: Router) {
    this.router.events.subscribe(event => {
      //console.log("--" + event);
    });
  }

  ngOnInit() {
    //localStorage.setItem('token','test');
    //localStorage.clear();
    console.log('Walldirectory Live');
  }

  /* setSeo() {
    this.http.get(this.contentUrl).subscribe(
      (res: any) => {
        this.pagecontent = res;
        this.title.setTitle(this.pagecontent.metas.title);
        this.meta.updateTag({
          name: "description",
          content: this.pagecontent.metas.description
        });
        this.meta.updateTag({
          name: "keywords",
          content: this.pagecontent.metas.keywords
        });
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  } */
}
