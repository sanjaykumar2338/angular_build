import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/list-of-messages";
  seometa: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private meta: Meta,
    private title: Title
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "noindex"
    });
  }

  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  msgid = this.route.snapshot.paramMap.get("id");
  singlemsg = environment.apiUrl + "auth/" + this.msgid + "/list";
  markasRead =
    environment.apiUrl +
    "auth/" +
    this.logeduser +
    "/notifications/" +
    this.msgid +
    "/read";
  content: any;

  ngOnInit() {
    console.log("---" + this.msgid);
    this.http
      .get(this.singlemsg, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.content = res.data;
        },
        (msg: any) => {
          console.log(msg);
        }
      );

    this.http
      .post(
        this.markasRead,
        {},
        {
          headers: new HttpHeaders().set("Authorization", this.Auth_Token)
        }
      )
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (msg: any) => {
          console.log(msg);
        }
      );
  }

  removemsg(id) {
    console.log(id);
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
