import { Component, OnInit, Injectable, Inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";

import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Observer } from "rxjs";
import { environment } from "../../../environments/environment.prod";
import { DOCUMENT } from "@angular/common";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-newletterunsub",
  templateUrl: "./newletterunsub.component.html",
  styleUrls: ["./newletterunsub.component.css"]
})
export class NewletterunsubComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/newsletter-unsubscribe";
  seometa: any;

  vaildtoken: any;
  errormsg: any;
  success: any;

  //userid = this.route.snapshot.paramMap.get("id");
  userid: string;
  unsubUrl = environment.apiUrl + "/listings/listings/email/unsubscribe/";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private meta: Meta,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private doc
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "noindex"
    });
    this.meta.updateTag({
      name: "googlebot",
      content: "noindex"
    });
  }

  ngOnInit() {
    //console.log(this.userid + "*--");

    this.route.queryParams.subscribe(params => {
      this.userid = params["email"];
    });

    this.http.post(this.unsubUrl, { email: this.userid }).subscribe(
      (res: any) => {
        this.success = "t";
        this.errormsg = "";
        console.log(res);
      },
      (msg: any) => {
        this.success = "";
        this.errormsg = "t";
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

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute("href", this.seopath + "/newsletter-unsubscribe");
  }
  /* SEO SETTINGS Close*/
}
