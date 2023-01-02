import {
  Component,
  OnInit,
  Injectable,
  Attribute,
  Inject,
  PLATFORM_ID
} from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../src/environments/environment.prod";
import { CoreEnvironment } from "@angular/core/src/render3/jit/compiler_facade_interface";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { elementAttribute } from "@angular/core/src/render3";
import { FacebookService } from "@greg-md/ng-facebook";
import { Meta, Title } from "@angular/platform-browser";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";
import { AuthService } from "../../auth/auth.service";

@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-listing",
  templateUrl: "./listing.component.html",
  styleUrls: ["./listing.component.css"],
  host: { class: "single-listing-page" }
})
export class ListingComponent implements OnInit {
  pslug = this.route.snapshot.paramMap.get("slug");
  pageid: any;
  getListingUrl = environment.apiUrl + "listings/listings/";
  freelist = environment.freePackage;
  logeduser: any;
  logToken: any;

  curpage = environment.siteUrl + "listing/" + this.pslug;

  seopath = environment.sitepath;
  //seourl = environment.apiUrl + "pages/" + this.cateSlug;
  seometa: any;
  preloader = "";

  reviewlistUrl = environment.apiUrl + "listings/reviews/list/parent/";
  reviewArray: any;
  relatedUrl = environment.apiUrl + "listings/listings/id/";
  relatedArray: any;
  temval: any;
  selected: any;
  notfree: any;
  pcontents: any;
  postStatus: boolean = false;
  imgPath = environment.imgPath;
  logpath = "https://walldirectory.com/v2/api";
  siteUrl = environment.siteUrl;
  cimg: any;
  listlogo: any;
  socialmedia: any;
  avatar: any;
  mapurl: any;
  source: string = "";
  pageUrl = environment.siteUrl + "/listing/" + this.pslug;
  urlSafe: SafeResourceUrl;
  urlMap: SafeResourceUrl;
  locmap: any;
  reviewsucc: any;
  reviewerr: any;
  enqsucc: any;
  enqerr: any;
  enqloader: any;
  joinloader: any;
  joinsucc: any;
  joinerr: any;

  crating: any;
  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  phonereg = /^-?(0|[1-9]\d*)?$/;

  fb_rating: any;
  tw_follower: any;
  fb_images: any;

  tab1_show: boolean = true;
  tab2_show: boolean = false;
  tab3_show: boolean = false;

  twfeed: any;
  public twitterfeed = [
    { cate: "auto", id: "AutoWallDirect" },
    { cate: "education", id: "eduWallDirect" },
    { cate: "entertainment", id: "EntertainLocal" },
    { cate: "family", id: "FamilyCareWall" },
    { cate: "fashion", id: "StyleWallDirect" },
    { cate: "financial", id: "FinanceWall" },
    { cate: "food-drink", id: "FoodWallDirect" },
    { cate: "health-beauty", id: "HealthWallDirec" },
    { cate: "home-garden", id: "HomeWallDirect" },
    { cate: "insurance", id: "InsureWall" },
    { cate: "legal", id: "LegalWall" },
    { cate: "medical", id: "MedicalWall" },
    { cate: "technology", id: "TechWallDirect" },
    { cate: "travel", id: "TourWall" }
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public sanitizer: DomSanitizer,
    public facebook: FacebookService,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  async ngOnInit() {
    if (!isPlatformBrowser(this._platformId)) {
      this.logeduser = this.authService.getUser();
      this.logToken = this.authService.getToken();
    }

    this.pslug = this.route.snapshot.paramMap.get("slug");

    setTimeout(function() {
      document.getElementById("preloader").style.display = "none";
    }, 1200);

    //Redirect listing page after login.
    /* localStorage.setItem("reUrl", "/listing/" + this.pslug + "/"); */

    //fb feeds
    this.facebook.init().subscribe();

    //Get Listing Contents.
    this.http
      .get(this.getListingUrl + "" + this.pslug)
      .subscribe((res: any) => {
        if (res.data.featuredImage) {
          this.cimg =
            this.imgPath +
            "" +
            res.data.featuredImage.original.replace(/\s/g, "%20");
        } else if (res.data.galleries.length > 0) {
          this.cimg =
            this.imgPath +
            res.data.galleries[0].attachment.original.replace(/\s/g, "%20");
        } else {
          this.cimg = "assets/images/sectionbg.jpg";
        }

        if (res.data.listinglogo) {
          this.listlogo = this.logpath + "/" + res.data.listinglogo.small;
        } else {
          this.listlogo = "assets/images/noimage.png";
        }

        this.notfree = res.data.plan_id;
        this.reviewForm.patchValue({
          listingid: res.data.id
        });

        this.listingEnq.patchValue({
          listingid: res.data.id
        });

        this.join_frm.patchValue({
          listingid: res.data.id
        });

        //Twitter Feeds
        this.twitterfeeds(res.data.currentcategory.category.parentCat.slug);

        //Get Reviews
        this.getReviewlist(res.data.id);

        //Get Related
        this.getRelated(res.data.id);

        //SetViews
        this.setView(res.data.id);

        //get Social Rating
        this.socialRating(res.data.id);

        if (res.data.user.userimage) {
          this.avatar =
            this.imgPath + "" + this.urlchange(res.data.user.userimage.small);
        } else {
          this.avatar = "assets/images/icon/profile.jpg";
        }

        console.log(this.avatar + "---");

        if (
          res.data.facebook_url ||
          res.data.twitter_url ||
          res.data.instagram_url ||
          res.data.linkedin_url ||
          res.data.pintrest_url ||
          res.data.youtube_url
        ) {
          this.socialmedia = true;
        }

        this.mapurl = res.data.mapview_url;
        if (this.mapurl) {
          let src = this.mapurl.split("src=")[1].split(/[ >]/)[0];
          let src1 = src.split('"')[1].split(/[ >]/)[0];
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(src1);
        }

        if (res.data.lat && res.data.lng) {
          // const localmapurl='https://maps.google.com/maps?q='+res.data.lat+','+res.data.lng+'&hl=es;z=14&amp;output=embed';
          const localmapurl =
            "https://maps.google.com/maps?q=" +
            res.data.lat +
            "," +
            res.data.lng +
            "&z=15&output=embed";
          this.urlMap = this.sanitizer.bypassSecurityTrustResourceUrl(
            localmapurl
          );
        } else {
          const localmapurl =
            "http://maps.google.com/maps?q=" +
            res.data.listingregions[0].region.lat +
            "," +
            res.data.listingregions[0].region.lng +
            "&z=15&output=embed";
          this.urlMap = this.sanitizer.bypassSecurityTrustResourceUrl(
            localmapurl
          );
        }

        if (res.reviews) {
          this.crating = Math.round(res.reviews.ratingAvg * 10) / 10;
        } else {
          this.crating = 0.0;
        }

        if (res.data.status == "publish") {
          this.pcontents = res.data;
        } else {
          this.pcontents = res.data;
        }
      });
  }

  urlformat(url) {
    var pattern = /^((http|https|ftp):\/\/)/;
    if (!pattern.test(url)) {
      return (url = "http://" + url);
    } else {
      return url;
    }
  }

  reviewForm = this.fb.group({
    rating: ["", Validators.required],
    re_name: ["", Validators.required],
    re_mail: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    ],
    re_msg: ["", [Validators.required, Validators.minLength(50)]],
    listingid: [""]
  });

  listingEnq = this.fb.group({
    enq_fname: ["", Validators.required],
    enq_lname: ["", Validators.required],
    enq_email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    ],
    enq_phone: [
      "",
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(this.mobilereg)
      ]
    ],
    enq_cont: ["", [Validators.required, Validators.minLength(50)]],
    listingid: [""]
  });

  join_frm = this.fb.group({
    join_fname: ["", Validators.required],
    join_email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    ],
    listingid: [""]
  });

  //Review list
  getReviewlist(id) {
    //console.log('pid'+id);
    this.http.get(this.reviewlistUrl + id).subscribe(
      (res: any) => {
        this.reviewArray = res;
      },
      (msg: any) => {}
    );
  }

  //Related posts
  getRelated(id) {
    this.http.get(this.relatedUrl + id + "/related").subscribe(
      (res: any) => {
        this.relatedArray = res;
      },
      (msg: any) => {}
    );
  }

  //View Count
  setView(id) {
    this.http
      .post(environment.apiUrl + "listings/listings/" + id + "/viewscount", {})
      .subscribe(
        (res: any) => {
          // console.log(res.data.message);
        },
        (msg: any) => {
          console.log(msg.error.error);
        }
      );

    if (this.logToken) {
      this.http
        .post(
          environment.apiUrl + "listings/listings/" + id + "/visitcount",
          {},
          {
            headers: new HttpHeaders().set("Authorization", this.logToken)
          }
        )
        .subscribe(
          (res: any) => {
            //console.log(res.data.message);
          },
          (msg: any) => {
            console.log(msg.error.error);
          }
        );
    }
  }

  urlchange(url) {
    var ur = url.replace(/\s/g, "%20");
    return ur;
  }

  shortenNumber(num, decimalPlaces) {
    var str,
      suffix = "";

    decimalPlaces = decimalPlaces || 0;
    num = +num;

    var factor = Math.pow(10, decimalPlaces);

    //99999 -> 99.9K

    if (num < 1000) {
      str = num;
    } else if (num < 1000000) {
      str = Math.floor(num / (1000 / factor)) / factor;
      suffix = "K";
    } else if (num < 1000000000) {
      str = Math.floor(num / (1000000 / factor)) / factor;
      suffix = "M";
    } else if (num < 1000000000000) {
      str = Math.floor(num / (1000000000 / factor)) / factor;
      suffix = "B";
    } else if (num < 1000000000000000) {
      str = Math.floor(num / (1000000000000 / factor)) / factor;
      suffix = "T";
    }
    return str + suffix;
  }

  onSubmitReview() {
    if (this.reviewForm.valid) {
      var form = this.reviewForm.value;
      //console.log(form);

      const postEnqUrl = environment.apiUrl + "listings/reviews";
      this.http
        .post(postEnqUrl, {
          name: form.re_name,
          email: form.re_mail,
          rating: form.rating,
          content: form.re_msg,
          user_id: this.logeduser,
          parent_id: form.listingid
        })
        .subscribe(
          (res: any) => {
            this.reviewsucc = res;
            this.reviewForm.reset();
          },
          (msg: any) => {
            this.reviewerr = msg["error"].error;
          }
        );
    } else {
      this.validateAllFormFields(this.reviewForm);
    }
  }

  onSubmitEnq() {
    if (this.listingEnq.valid) {
      this.enqloader = true;
      var form = this.listingEnq.value;
      //console.log(form);
      const postEnqUrl =
        environment.apiUrl + "listings/listings/" + form.listingid + "/enquiry";
      this.http
        .post(postEnqUrl, {
          listing_id: form.listingid,
          first_name: form.enq_fname,
          last_name: form.enq_lname,
          email: form.enq_email,
          phone: form.enq_phone,
          message: form.enq_cont
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            this.enqsucc = res;
            this.enqerr = "";
            this.enqloader = "";
            this.listingEnq.reset();
            setTimeout(() => {
              this.enqsucc = "";
            }, 3000);
          },
          (msg: any) => {
            console.log(msg);
            this.enqsucc = "";
            this.enqerr = msg;
            this.enqloader = "";
            setTimeout(() => {
              this.enqerr = "";
            }, 3000);
          }
        );
    } else {
      this.validateAllFormFields(this.listingEnq);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  showshare(event) {
    //console.log("tested" + event.target.data.selected.Attribute);
    event.target.setAttribute("data-selected", "true");
  }

  scroll(id) {
    console.log("scrolling to" + id);
    let el = document.getElementById(id);
    el.scrollIntoView();
    window.scrollBy(0, -50);
  }

  socialRating(id) {
    this.http
      .get(environment.apiUrl + "listings/listings/id/" + id + "/facebook")
      .subscribe(
        (res: any) => {
          this.fb_rating = res.result.overall_star_rating
            ? res.result.overall_star_rating
            : 0.0;
          //this.fb_images = res.result.photos.data[0].images;
          this.fb_images = res.photos.data[0].photos.data;
          // console.log(this.fb_images);
        },
        (msg: any) => {
          this.fb_images = 0;
        }
      );

    this.http
      .get(environment.apiUrl + "listings/listings/id/" + id + "/twitter")
      .subscribe(
        (res: any) => {
          this.tw_follower = res[0].followers_count
            ? res[0].followers_count
            : 0;
        },
        (msg: any) => {
          this.tw_follower = 0;
        }
      );
  }

  //Joiner / Following
  onFollow() {
    if (this.join_frm.valid) {
      this.joinloader = true;
      var form = this.join_frm.value;

      var userid = this.logeduser;
      this.http
        .post(
          environment.apiUrl + "listings/joiners",
          {
            listing_id: form.listingid,
            user_id: userid,
            name: form.join_fname,
            email: form.join_email
          },
          {
            headers: new HttpHeaders().set("Authorization", this.logToken)
          }
        )
        .subscribe(
          (res: any) => {
            this.joinloader = "";
            this.joinsucc = "t";
            this.joinerr = "";
            setTimeout(() => {
              this.joinsucc = "";
              this.join_frm.reset();
            }, 3000);
          },
          (msg: any) => {
            this.joinloader = "";
            this.joinsucc = "";
            this.joinerr = "t";
            console.log(msg);
          }
        );
    } else {
      this.validateAllFormFields(this.join_frm);
    }
  }

  /*  get_tw(slug) {
    const gettwid = this.twitterfeed.find(twid => twid.cate === slug);
    if (gettwid) {
      this.twfeed = "loop";
    } else {
      this.twfeed = "";
    }
  } */

  webclicked(id) {
    this.http
      .post(
        environment.apiUrl +
          "listings/listings/id/" +
          id +
          "/track/action/view_website",
        {}
      )
      .subscribe(
        (res: any) => {
          // console.log(res.data.message);
        },
        (msg: any) => {
          console.log(msg.error.error);
        }
      );

    console.log(this.logToken + "---");

    if (this.logToken) {
      this.http
        .post(
          environment.apiUrl +
            "listings/listings/id/" +
            id +
            "/track/action/visitor_view_website",
          {},
          {
            headers: new HttpHeaders().set("Authorization", this.logToken)
          }
        )
        .subscribe(
          (res: any) => {
            console.log(res.data.message);
          },
          (msg: any) => {
            console.log(msg.error.error);
          }
        );
    }
  }

  addclicked(id) {
    this.http
      .post(
        environment.apiUrl +
          "listings/listings/id/" +
          id +
          "/track/action/get_direction",
        {}
      )
      .subscribe(
        (res: any) => {
          // console.log(res.data.message);
        },
        (msg: any) => {
          console.log(msg.error.error);
        }
      );

    if (this.logToken) {
      this.http
        .post(
          environment.apiUrl +
            "listings/listings/id/" +
            id +
            "/track/action/visitor_get_direction",
          {},
          {
            headers: new HttpHeaders().set("Authorization", this.logToken)
          }
        )
        .subscribe(
          (res: any) => {
            console.log(res.data.message);
          },
          (msg: any) => {
            console.log(msg.error.error);
          }
        );
    }
  }

  twitterfeeds(cate) {
    const tid = environment.twitterfeed + cate;
    this.http.get(tid).subscribe(
      (res: any) => {
        this.twfeed = res.data;
      },
      msg => {
        console.log(msg["error"].error);
      }
    );
  }

  /* SEO SETTINGS */
  setSeo() {
    this.http.get(this.getListingUrl + "" + this.pslug).subscribe(
      (res: any) => {
        this.seometa = res.data;
        var regname = res.data.listingregions[0];

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

        if (this.seometa.listinglogo.original) {
          this.meta.updateTag({
            name: "og:image",
            content:
              this.seopath + "/v2/api/" + this.seometa.listinglogo.original
          });
        } else {
          this.meta.updateTag({
            name: "og:image",
            content: "https://walldirectory.com/assets/images/walldirectory.png"
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
        } else {
          this.meta.updateTag({
            name: "keywords",
            content: this.seometa.title + " | " + regname.region.name
          });
        }

        this.meta.updateTag({
          name: "geo.region",
          content: regname.region.name
        });

        this.meta.updateTag({
          name: "geo.position",
          content: regname.region.lat + ", " + regname.region.lng
        });

        this.meta.updateTag({
          name: "ICBM",
          content: regname.region.lat + ", " + regname.region.lng
        });
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

/**https://stackoverflow.com/questions/17290256/get-google-map-link-with-latitude-longitude */
