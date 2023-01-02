import { Component, OnInit, Injectable, Inject } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { environment } from "../../../environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { PLATFORM_ID } from "@angular/core";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import * as moment from "moment";
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-videocate',
  templateUrl: './videocate.component.html',
  styleUrls: ['./videocate.component.css']
})
export class VideocateComponent implements OnInit {

  cate_url = this.route.snapshot.paramMap.get("slug");
  category_url = environment.apiUrl + 'listings/categories/slug/' + this.cate_url;

  seopath = environment.sitepath;
  seourl = environment.apiUrl + "listings/categories/slug/" + this.cate_url;
  seometa: any;

  apiCateUrl = environment.apiUrl + "/videos/related/category/";

  /*  https://walldirectory.com/v2/api/videos/related/category/134 */
  /* videocate_url = environment.apiUrl + "videos"; */
  imgPath: any;
  lscounts: any;
  config: any;
  collection: any;
  tot: any;
  next = 1;
  prev = 0;
  p: number = 1;
  currentpage = 1;
  wall_channel = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDswCVXfW8YNGIbnMqMBywuY0bg3nvTvCw&channelId=UC7yI1_30JukkT4YT-6tG22Q&part=snippet,id&order=date&maxResults=10';
  wall_videos: any;
  public catename: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc,
    private _sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private _platformId: Object,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.setSeo();

    this.http.get(this.category_url).subscribe(cate => {
      this.catename = cate['data'][0].name;
      if (cate['data'][0].id) {
        this.http.get(this.apiCateUrl + cate['data'][0].id).subscribe(res => {
          this.collection = res['list'];
          /* console.log(this.collection); */
        });
      }
    });
    this.wallvideos();

  }

  wallvideos() {
    this.http.get(this.wall_channel).subscribe(
      (res: any) => {
        this.wall_videos = res.items;
        /* console.log(this.wall_videos); */
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }


  /* SEO SETTINGS */
  setSeo() {
    console.log(this.catename + " : ");
    this.http.get(this.seourl).subscribe(
      (res: any) => {
        /* console.log(this.catename +" : " +); */
        this.seometa = res.data;
        /*  console.log(this.seometa[0].meta.title); */
        if (this.seometa[0].meta.title) {
          this.title.setTitle("Video :" + this.seometa[0].meta.title);
          this.meta.updateTag({
            name: "twitter:title",
            content: this.catename + " : " + this.seometa[0].meta.title
          });
          this.meta.updateTag({
            name: "og:title",
            content: this.catename + " : " + this.seometa[0].meta.title
          });
        }

        this.meta.addTag({
          property: "og:url",
          content: this.seopath + "" + this.router.url
        });

        if (this.seometa[0].meta.description) {
          this.meta.updateTag({
            name: "description",
            content: this.seometa[0].meta.description
          });
          this.meta.addTag({
            property: "og:description",
            content: this.seometa[0].meta.description
          });
          this.meta.updateTag({
            name: "twitter:description",
            content: this.seometa[0].meta.description
          });
        }
        if (this.seometa[0].meta.keywords) {
          this.meta.updateTag({
            name: "keywords",
            content: this.seometa[0].meta.keywords
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
    link.setAttribute("href", this.seopath + "/video-category/" + this.cate_url);
  }

}
