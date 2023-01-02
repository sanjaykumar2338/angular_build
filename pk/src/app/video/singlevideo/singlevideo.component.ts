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
  selector: 'app-singlevideo',
  templateUrl: './singlevideo.component.html',
  styleUrls: ['./singlevideo.component.css']
})
export class SinglevideoComponent implements OnInit {
  getListingUrl = environment.apiUrl + "listings/listings/";
  listingslug = this.route.snapshot.paramMap.get("slug");
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/videos";
  seometa: any;
  curpage = environment.siteUrl + "video/" + this.listingslug;
  imgPath: any;
  videolisting = environment.apiUrl + "videos/listing/" + this.listingslug;
  relatedurl = environment.apiUrl + "videos/related/category/";
  related_content: any;
  relatedcate: any;
  recent_url = environment.apiUrl + "videos/latest?limit=6";
  recent_content: any;

  wall_channel = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDswCVXfW8YNGIbnMqMBywuY0bg3nvTvCw&channelId=UC7yI1_30JukkT4YT-6tG22Q&part=snippet,id&order=date&maxResults=10';
  wall_videos: any;
  catename: any;
  videoerror: boolean;
  videoUrl = 'https://www.youtube.com/embed/';
  safeURL: any;
  content: any;
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
    this.imgPath = environment.imgPath;
    console.log(this.videolisting);
    this.http.get(this.videolisting).subscribe(
      (res: any) => {
        this.content = res;
        this.videoerror = true;
        console.log(this.content);
        this.videoUrl = res.yt.id;
        if (!this.videoUrl) {
          this.videoerror = false;
        }

        const thumbvideo = "https://www.youtube.com/embed/" + this.videoUrl + "?autoplay=1";
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(thumbvideo);

        var cid = res.listing.currentcategory.category_id;
        this.related(cid);
        this.relatedcate = res.listing.currentcategory.category.parentCat.slug;
      },
      (msg: any) => {
        console.log(msg);
        this.videoerror = false;
        // window.location.href = '/video/';
      }
    );
    this.setSeo();
    this.recent();
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

  related(cid) {
    this.http.get(this.relatedurl + cid + "").subscribe(
      (res: any) => {
        this.related_content = res.list;
        /*  console.log(this.related_content); */
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }

  recent() {
    this.http.get(this.recent_url).subscribe(
      (res: any) => {
        this.recent_content = res.list;
        /* console.log(this.recent_content); */
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }


  /* SEO SETTINGS */
  setSeo() {

    this.http.get(this.videolisting).subscribe(
      (res: any) => {
        this.seometa = res.yt.snippet;
        //var regname = res.data.listingregions[0];

        if (this.seometa.title) {
          this.title.setTitle("Video - " + this.seometa.title);
          this.meta.updateTag({
            name: "twitter:title",
            content: this.seometa.title,
          });
          this.meta.updateTag({
            name: "og:title",
            content: this.seometa.title,
          });
        }

        if (this.seometa.thumbnails.default) {
          this.meta.updateTag({
            name: "og:image",
            content:
              this.seometa.thumbnails.default,
          });
        } else {
          this.meta.updateTag({
            name: "og:image",
            content:
              "https://walldirectory.com/assets/images/walldirectory.png",
          });
        }

        this.meta.addTag({
          property: "og:url",
          content: this.seopath + "" + this.router.url,
        });


        if (this.seometa.description) {
          this.meta.updateTag({
            name: "description",
            content: this.seometa.description,
          });
          this.meta.addTag({
            property: "og:description",
            content: this.seometa.description,
          });
          this.meta.updateTag({
            name: "twitter:description",
            content: this.seometa.description,
          });
        } else {
          console.log('description');
        }

        if (this.seometa.metas.keywords) {
          this.meta.updateTag({
            name: "keywords",
            content: this.seometa.title,
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
    link.setAttribute("href", this.curpage);
  }
  /* SEO SETTINGS Close*/

}
