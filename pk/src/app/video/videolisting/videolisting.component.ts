import { Component, OnInit, Injectable, Inject } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { environment } from "../../../environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { PLATFORM_ID } from "@angular/core";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import * as moment from "moment";

@Component({
  selector: 'app-videolisting',
  templateUrl: './videolisting.component.html',
  styleUrls: ['./videolisting.component.css']
})
export class VideolistingComponent implements OnInit {

  videocate_url = environment.apiUrl + "videos";
  contents = '';

  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/videos";
  seometa: any;

  videocate = [133, 164, 191, 221, 252, 299, 329, 381, 451, 504, 542, 575, 609, 655, 101];
  public allItems: any[];
  pager: any = {};
  pagedItems: any[];
  lscounts: any;
  config: any;
  collection = [];
  tot: any;
  next = 1;
  prev = 0;
  p: number = 1;
  currentpage = 1;

  wall_channel = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDswCVXfW8YNGIbnMqMBywuY0bg3nvTvCw&channelId=UC7yI1_30JukkT4YT-6tG22Q&part=snippet,id&order=date&maxResults=10';
  wall_videos: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private _platformId: Object,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.setSeo();
    this.wallvideos();
    this.http.get(this.videocate_url + '?page=1').subscribe(
      (res: any) => {
        this.lscounts = res.count;
        this.collection = res.list;
        /*   console.log(this.collection); */
        this.tot = res.pages;
      });
  }


  wallvideos() {
    this.http.get(this.wall_channel).subscribe(
      (res: any) => {
        this.wall_videos = res.items;

      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }

  prevContent(event) {
    var c_page = event.target.getAttribute("data-cpage");
    console.log('c_page');
    this.next = parseInt(c_page);
    this.prev = c_page - 1;

    if (c_page == 1) {
      var pv = document.querySelector(".btn-prev");
      pv.setAttribute("data-cpage", "0");

      var b = document.querySelector(".btn-next");
      b.setAttribute("data-cpage", "1");
      this.getVideos(1);
      setTimeout(function () {
        document.getElementById("videowrapper").scrollIntoView({ behavior: "smooth" });
      }, 2000);

    } else {
      console.log("else this.next" + this.next + "__this.prev_" + this.prev);
      this.getVideos(c_page);
      var p = document.querySelector(".btn-prev");
      p.setAttribute("data-cpage", "" + this.prev);
      console.log('--' + this.next);
      var b = document.querySelector(".btn-next");
      b.setAttribute("data-cpage", "" + this.next);
      setTimeout(function () {
        document.getElementById("videowrapper").scrollIntoView({ behavior: "smooth" });
      }, 2000);
    }

  }

  nextContent(event) {
    var c_page = event.target.getAttribute("data-cpage");
    var newcpage = parseInt(c_page);
    this.next = newcpage + 1;
    this.prev = this.next - 1;

    if (this.next == 1) {
      var b = document.querySelector(".btn-next");
      b.setAttribute("data-cpage", "1");
      var p = document.querySelector(".btn-prev");
      p.setAttribute("data-cpage", "0");
      this.getVideos(1);
      setTimeout(function () {
        document.getElementById("videowrapper").scrollIntoView({ behavior: "smooth" });
      }, 2000);
    } else {
      if (this.tot == newcpage) {
        console.log("next if");
        var b = document.querySelector(".btn-next");
        b.classList.toggle("disable");
        console.log('no more post');
      } else {
        var b = document.querySelector(".btn-next");
        b.setAttribute("data-cpage", "" + this.next);
        var p = document.querySelector(".btn-prev");
        p.setAttribute("data-cpage", "" + this.prev);
        this.getVideos(this.next);
        setTimeout(function () {
          document.getElementById("videowrapper").scrollIntoView({ behavior: "smooth" });
        }, 2000);
      }
    }
  }

  /* loadMore(event) {
    var c_page = event.target.getAttribute("data-cpage");
    var next = parseInt(c_page) + 1;
    console.log("next-" + next);
    console.log("c_page-" + c_page);
    if (this.tot < next) {
      console.log('no more post');
    }
    else {
      var b = document.querySelector(".btn-loadmore");
      b.setAttribute("data-cpage", "" + next);

      this.http.get(this.videocate_url + '?page=' + next).subscribe(
        (res: any) => {
          this.lscounts = res.count;
          this.collection.push = res.list;
          this.tot = res.pages;
        });
    }

  } */

  getVideos(p) {
    this.http.get(this.videocate_url + '?page=' + p).subscribe(
      (res: any) => {
        this.lscounts = res.count;
        this.collection = res.list;
        this.tot = res.pages;
      });
    var pv = document.querySelector(".btn-prev");
    this.currentpage = p;
    if (p == 1) {
      pv.classList.toggle("disable");
    } else {
      pv.classList.remove("disable");
    }
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
    link.setAttribute("href", this.seopath + "/videos");
  }
  /* SEO SETTINGS Close*/
  /* https://medium.com/angular-in-depth/the-new-angular-youtube-player-component-9ce52ecf3dee */
}
