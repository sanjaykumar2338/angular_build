import { Component, OnInit, Injectable, Inject } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { HomeserviceService } from "../pages/home/services/homeservice.service";
import { environment } from "../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { PLATFORM_ID } from "@angular/core";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ListservService } from "./listserv.service";

@Injectable()
@Component({
  selector: "app-listingdetail",
  templateUrl: "./listingdetail.component.html",
  styleUrls: ["./listingdetail.component.css"],
  host: { class: "single-listing-page" },
})
export class ListingdetailComponent implements OnInit {
  enqsucc: any;
  enqerr: any;
  enqloader: any;
  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

  preloader = "";

  getListingUrl = environment.apiUrl + "listings/listings/";
  pslug = this.route.snapshot.paramMap.get("slug");

  seopath = environment.sitepath;
  seourl = environment.apiUrl + "listings/listings/" + this.pslug;
  seometa: any;
  curpage = environment.siteUrl + "listing/" + this.pslug;
  nofoundlisting = "";

  pcontents: any;
  crating: any;
  cimg: any;
  listlogo: any;
  socialmedia: any;
  profshow: any;
  reviewshow: any;
  logpath = "https://walldirectory.com/v2/api";
  avatar: any;
  mapurl: any;
  source: string = "";
  pageUrl = environment.siteUrl + "/listing/" + this.pslug;
  urlSafe: SafeResourceUrl;
  urlMap: SafeResourceUrl;
  locmap: any;
  notfree: any;
  freelist = environment.freePackage;
  reviewlistUrl = environment.apiUrl + "listings/reviews/list/parent/";
  reviewArray: any;
  relatedUrl = environment.apiUrl + "listings/listings/id/";
  relatedArray: any;
  reviewsucc: any;
  reviewerr: any;
  joinloader: any;
  joinsucc: any;
  joinerr: any;

  fb_rating: any;
  tw_follower: any;
  fb_images: any;

  isLoggedIn = "";
  logeduser: any;
  logedname: any;
  imgPath: any;
  siteUrl = environment.siteUrl;
  twfeed: any;
  twfeedlisting: any;
  profupdate: boolean;
  vcategory_url: any;
  vcollection: any;
  vid: any;

  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public homeserv: HomeserviceService,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private _platformId: Object,
    public sanitizer: DomSanitizer,
    public api: ListservService
  ) {
    this.setSeo();
  }

  async ngOnInit() {
    this.imgPath = environment.imgPath;
    setTimeout(function () {
      document.getElementById("preloader").style.display = "none";
    }, 1200);

    if (isPlatformBrowser(this._platformId)) {
      this.logeduser = this.authService.getUser();
      this.logedname = this.authService.getUsername();
      this.isLoggedIn = this.authService.getToken();
    }

    this.twitterfeeds();
    this.listingtwitterfeeds();
    this.getcontent();
  }

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView();
    window.scrollBy(0, -50);
  }

  reviewForm = this.fb.group({
    rating: ["", Validators.required],
    re_name: ["", Validators.required],
    re_mail: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ],
    ],
    re_msg: ["", [Validators.required]],
    listingid: [""],
  });

  join_frm = this.fb.group({
    join_fname: ["", Validators.required],
    join_email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ],
    ],
    listingid: [""],
  });

  listingEnq = this.fb.group({
    enq_fname: ["", Validators.required],
    enq_lname: ["", Validators.required],
    enq_email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ],
    ],
    enq_phone: [
      "",
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(this.mobilereg),
      ],
    ],
    enq_cont: ["", [Validators.required]],
    listingid: [""],
  });

  getcontent() {
    //Get Listing Contents.
    this.http.get(this.getListingUrl + "" + this.pslug).subscribe(
      (res: any) => {
        this.vid = res.video;
        this.vcategory_url = environment.apiUrl + "/videos/related/category/" + res.data.currentcategory.category.parent;
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
          this.listlogo = this.logpath + "/" + res.data.listinglogo.medium;
        } else {
          this.listlogo = "assets/images/noimage.png";
        }

        this.notfree = res.data.plan_id;

        this.reviewForm.patchValue({
          listingid: res.data.id,
        });

        this.listingEnq.patchValue({
          listingid: res.data.id,
        });

        this.join_frm.patchValue({
          listingid: res.data.id,
        });

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

        if (res.usersetting["_settingupdate"]) {
          this.profupdate = true;
        } else {
          this.profupdate = false;
        }

        if (this.profupdate) {
          if (res.usersetting["_listingreview"] == 1) {
            this.reviewshow = "true";
          }
          if (res.usersetting["_showcontactinfo"] == 1) {
            this.profshow = "true";
          }
        } else {
          this.reviewshow = "true";
          this.profshow = "true";
        }

        if (
          res.usersetting["_settingupdate"] == 1 &&
          res.usersetting["_showsocialmedia"] == 0
        ) {
          this.socialmedia = false;
        } else {
          console.log("else");
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
        }

        /* if (
          res.usersetting["_settingupdate"] == 1 &&
          res.usersetting["_showcontactinfo"] == 1
        ) {
          this.profshow = "true";
        } */
        /* if (
          res.usersetting["_settingupdate"] == 1 &&
          res.usersetting["_listingreview"] == 1
        ) {
          this.reviewshow = "true";
        } */

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
        /*  console.log("this.vcategory_url" + this.vcategory_url); */
        this.http.get(this.vcategory_url + '/?limit=6').subscribe(res => {
          this.vcollection = res['list'];
        });
      },
      (msg: any) => {
        this.nofoundlisting = "t";
        this.meta.updateTag({
          name: "robots",
          content: "noindex"
        });
        this.meta.updateTag({
          name: "googlebot",
          content: "noindex"
        });
        console.log(msg.error.error.message);
      }
    );
  }

  //Related posts
  getRelated(id) {
    this.http.get(this.relatedUrl + id + "/related").subscribe(
      (res: any) => {
        this.relatedArray = res;
      },
      (msg: any) => { }
    );
  }

  //Review list
  getReviewlist(id) {
    //console.log('pid'+id);
    this.http.get(this.reviewlistUrl + id).subscribe(
      (res: any) => {
        this.reviewArray = res;
      },
      (msg: any) => { }
    );
  }

  socialRating(id) {
    console.log(id);
    /* this.http
      .get("https://blog.walldirectory.com/wp-json/wp/v2/facebook/" + id)
      .subscribe(
        (res: any) => {
          this.fb_rating = res.rating;
          console.log("--" + res.rating);
           if (res.result.overall_star_rating) {
            this.fb_rating = res.result.overall_star_rating;
          } else {
            this.fb_rating = 0.0;
          }  if (res.photos.data[0]) {
            this.fb_images = res.photos.data[0].photos.data;
          } 
        },
        (msg: any) => {
          this.fb_images = 0;
        }  );*/

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

  pathcid(id) {
    this.listingEnq.patchValue({
      listingid: id,
    });
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
          message: form.enq_cont,
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

  onFollow() {
    if (isPlatformBrowser(this._platformId)) {
      this.logeduser = this.authService.getUser();
      this.isLoggedIn = this.authService.getToken();
    }

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
            email: form.join_email,
          },
          {
            headers: new HttpHeaders().set("Authorization", this.isLoggedIn),
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

  onSubmitReview() {
    if (isPlatformBrowser(this._platformId)) {
      this.logeduser = this.authService.getUser();
      this.isLoggedIn = this.authService.getToken();
    }
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
          parent_id: form.listingid,
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

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  //View Count
  setView(id) {
    if (isPlatformBrowser(this._platformId)) {
      this.logeduser = this.authService.getUser();
      this.isLoggedIn = this.authService.getToken();
    }
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

    if (this.isLoggedIn) {
      this.http
        .post(
          environment.apiUrl + "listings/listings/" + id + "/visitcount",
          {},
          {
            headers: new HttpHeaders().set("Authorization", this.isLoggedIn),
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

      /*page view send email with userid */
      this.http
        .post(
          environment.apiUrl +
          "listings/listings/" +
          id +
          "/views_visite_email",
          {
            user_id: this.logeduser,
          },
          {
            headers: new HttpHeaders().set("Authorization", this.isLoggedIn),
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
    } else {
      /*page view send email without userid */
      this.http
        .post(
          environment.apiUrl +
          "listings/listings/" +
          id +
          "/views_visite_email",
          {
            user_id: "",
          },
          {
            headers: new HttpHeaders().set("Authorization", this.isLoggedIn),
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

  webclicked(id) {
    /* var loged_user = this.authService.getUser();
    var logToken = this.authService.getToken(); */
    if (isPlatformBrowser(this._platformId)) {
      this.logeduser = this.authService.getUser();
      this.isLoggedIn = this.authService.getToken();
    }

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

    if (this.logeduser && this.isLoggedIn) {
      this.http
        .post(
          environment.apiUrl +
          "listings/listings/id/" +
          id +
          "/track/action/visitor_view_website",
          {},
          {
            headers: new HttpHeaders().set("Authorization", this.isLoggedIn),
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

  addclicked(id) {
    if (isPlatformBrowser(this._platformId)) {
      this.logeduser = this.authService.getUser();
      this.isLoggedIn = this.authService.getToken();
    }
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

    if (this.isLoggedIn) {
      this.http
        .post(
          environment.apiUrl +
          "listings/listings/id/" +
          id +
          "/track/action/visitor_get_direction",
          {},
          {
            headers: new HttpHeaders().set("Authorization", this.isLoggedIn),
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

  urlformat(url) {
    var pattern = /^((http|https|ftp):\/\/)/;
    if (!pattern.test(url)) {
      /* console.log("if"); */
      return (url = "http://" + url);
    } else {
      return url;
      console.log("ifelse");
    }
  }

  twitterfeeds() {
    this.http.get(this.seourl).subscribe((res: any) => {
      const tid =
        environment.twitterfeed +
        res.data.currentcategory.category.parentCat.slug;
      this.http.get(tid).subscribe(
        (res: any) => {
          this.twfeed = res.data;
        },
        (msg) => {
          console.log(msg["error"].error);
        }
      );
    });
  }

  listingtwitterfeeds() {
    this.http.get(this.seourl).subscribe((res: any) => {
      var tname = res.data.twitter_url;
      var t1 = tname.split(".com/");
      var t2 = t1[1].split("/");
      if (t2) {
        const tid = environment.listingfeed + t2[0];
        this.http.get(tid).subscribe(
          (res: any) => {
            this.twfeedlisting = res.data;
          },
          (msg) => {
            console.log(msg["error"].error);
          }
        );
      }
    });
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

  /* SEO SETTINGS */
  setSeo() {

    this.http.get(this.getListingUrl + "" + this.pslug).subscribe(
      (res: any) => {
        this.seometa = res.data;
        var regname = res.data.listingregions[0];
        console.log(this.seometa.metas);
        if (this.seometa.metas.title) {
          this.title.setTitle(this.seometa.metas.title);
          this.meta.updateTag({
            name: "twitter:title",
            content: this.seometa.metas.title,
          });
          this.meta.updateTag({
            name: "og:title",
            content: this.seometa.metas.title,
          });
        }

        if (this.seometa.listinglogo.original) {
          this.meta.updateTag({
            name: "og:image",
            content:
              this.seopath + "/v2/api/" + this.seometa.listinglogo.original,
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


        if (this.seometa.metas.description) {
          this.meta.updateTag({
            name: "description",
            content: this.seometa.metas.description,
          });
          this.meta.addTag({
            property: "og:description",
            content: this.seometa.metas.description,
          });
          this.meta.updateTag({
            name: "twitter:description",
            content: this.seometa.metas.description,
          });
        } else {
          console.log('description');
        }

        if (this.seometa.metas.keywords) {
          this.meta.updateTag({
            name: "keywords",
            content: this.seometa.metas.keywords,
          });
        } else {
          this.meta.updateTag({
            name: "keywords",
            content: this.seometa.title + " | " + regname.region.name,
          });
        }

        this.meta.updateTag({
          name: "geo.region",
          content: regname.region.name,
        });

        this.meta.updateTag({
          name: "geo.position",
          content: regname.region.lat + ", " + regname.region.lng,
        });

        this.meta.updateTag({
          name: "ICBM",
          content: regname.region.lat + ", " + regname.region.lng,
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
