import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { LOCAL_STORAGE } from "@ng-toolkit/universal";
@Component({
  selector: "app-agents",
  templateUrl: "./agents.component.html",
  styleUrls: ["./agents.component.css"]
})
export class AgentsComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/agent-dashboard";
  seometa: any;

  Auth_Token = this.localStorage.getItem("token");
  logeduser = this.localStorage.getItem("logedUser");

  customerurl = environment.apiUrl + "agent/" + this.logeduser + "/customers";
  earned =
    environment.apiUrl + "agent/" + this.logeduser + "/count/earned-customers";
  totearn: any;

  procomplete: any;
  profDetails: any;
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private meta: Meta,
    private title: Title,
    private router: Router,
    private http: HttpClient
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "noindex"
    });
  }

  ngOnInit() {
    this.http
      .get(this.customerurl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.profDetails = res.data;
          console.log(this.profDetails);
        },
        msg => {
          console.log(msg);
        }
      );

    this.http
      .get(this.earned, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.totearn = res;
          console.log(this.totearn);
        },
        msg => {
          console.log(msg);
        }
      );
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
  }
  /* SEO SETTINGS Close*/
}
