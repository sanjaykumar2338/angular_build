import { Component, OnInit, Injector, Inject } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
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
import { PageservService } from "../../../../src/app/services/pageserv.service";
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { AuthService } from "../../auth/auth.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-promo",
  templateUrl: "./promo.component.html",
  styleUrls: ["./promo.component.css"]
})
export class PromoComponent implements OnInit {
  cateSlug = this.route.snapshot.url[0]["path"];

  //parentSlug = this.route.snapshot.paramMap.get("slug");
  logeduser: any;
  logToken: any;

  enqsucc: any;
  enqerr: any;
  enqloader: any;
  seopath = environment.sitepath;

  seourl = environment.apiUrl + "pages/" + this.cateSlug;
  seometa: any;
  siteUrl = environment.siteUrl;
  pagecontent: any;

  cateName: any;
  listingUrl = environment.apiUrl + "listings/search";
  imgPath = environment.imgPath;
  listData: any;
  lscount: boolean = false;
  lscounts: any;
  listingRegion: any;
  listsPost: any;
  listSubcate: any;
  public allItems: any[];
  pager: any = {};
  pagedItems: any[];

  locatadd: any;
  getloc: object;
  latlong: any;
  latitude: any;
  longitude: any;

  mapUrl: any;
  results: any;
  errormsg: any;

  cateformUrl = environment.apiUrl + "listings/categories/id/";
  crating: any;
  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  phonereg = /^-?(0|[1-9]\d*)?$/;
  cateloader: any;
  cateSuccess: any;
  cateError: any;

  regchk: boolean = false;
  catechk: boolean = false;
  dischk: boolean = false;
  ratechk: boolean = false;
  viewchk: boolean = false;
  choosecate: any;
  searchUrl: any;

  distances = [
    { km: "0 to 10km", val: "10" },
    { km: "11 to 50km", val: "50" },
    { km: "51 to 100km", val: "100" },
    { km: "101 to 500km", val: "500" },
    { km: "1000km Max", val: "1000" }
  ];
  rating = [
    { rate: "5.0" },
    { rate: "4.0" },
    { rate: "3.0" },
    { rate: "2.0" },
    { rate: "1.0" },
    { rate: "0" }
  ];
  mostviews = [
    { text: "Most Populars", subtext: "Views Below  4000", value: "4000" },
    { text: "Most Views", subtext: "Views Below  1500", value: "1500" },
    { text: "Interested", subtext: "Views Below  1000", value: "1000" },
    { text: "Populars", subtext: "Views Below  500", value: "500" },
    { text: "Lowest", subtext: "Viewed Below  100", value: "100" }
  ];

  twfeed: any;

  config: any;
  collection = [];
  tot: any;
  p: number = 1;

  constructor(
    private meta: Meta,
    private title: Title,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private pagerService: PageservService,
    private authservice: AuthService,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.setSeo();

    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.logeduser = this.authservice.getUser();
      this.logToken = this.authservice.getToken();
    }
    this.getListing(this.cateSlug);
    this.twitterfeeds();
  }

  cateForm = this.fb.group({
    fname: ["", Validators.required],
    lname: ["", Validators.required],
    mobile: ["", Validators.required],
    cateid: [""],
    email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    ],
    msg: ["", Validators.required]
  });

  onSubmitcate() {
    if (this.cateForm.valid) {
      this.cateloader = "true";
      var form = this.cateForm.value;
      this.http
        .post(this.cateformUrl + form.cateid + "/enquiry", {
          category_id: form.cateid,
          first_name: form.fname,
          last_name: form.lname,
          mobile: form.mobile,
          email: form.email,
          message: form.msg
        })
        .subscribe(
          (res: any) => {
            this.cateloader = "";
            this.cateSuccess = "true";
            this.cateError = "";
            this.cateForm.reset();
            setTimeout(function() {
              this.cateSuccess = "";
            }, 3000);
          },
          (msg: any) => {
            console.log("msg");
            this.cateloader = "";
            this.cateSuccess = "";
            this.cateError = "true";
            setTimeout(function() {
              this.cateError = "";
            }, 3000);
          }
        );
    } else {
      this.validateAllFormFields(this.cateForm);
    }
  }

  getListing(slug) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
    };
    this.http
      .get(this.listingUrl + "/?search_type=" + slug)
      .subscribe((res: any) => {
        this.lscounts = res.count;

        this.lscounts = res.count;
        this.collection = res.data;
        this.tot = res.count;

        this.cateName = res.category;

        this.listingRegion = res.regions;
        this.listSubcate = res.categories;
        this.cateForm.patchValue({ cateid: this.cateName.id });
      });
  }

  /* setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page, 10);
    // get current page of items
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    var contentid = document.getElementById("searchresult_li");
    if (
      this.regchk == true ||
      this.catechk == true ||
      this.dischk == true ||
      this.ratechk == true ||
      this.viewchk == true
    ) {
      contentid.scrollIntoView({
        behavior: "smooth",
        inline: "nearest"
      });
    } else {
      window.scrollTo(0, 0);
    }
  } */

  pageChange(newPage: number) {
    this.p = newPage; //page index change.

    var checkedcate = null;
    var cates = "filter_cate";
    var checkedregion = null;
    var regions = "filter_region";
    var distance = "filter_km";
    var checked_km = null;
    var rate = "ratings";
    var checkedrate = null;
    var mviews = "mview";
    var mviewed = null;

    for (var j = 0; j < this.listingRegion.length; j++) {
      const input = document.getElementsByClassName("filter_region")[
        j
      ] as HTMLInputElement;
      if (input.checked) {
        checkedregion = input.value;
      }
    }

    for (var i = 0; i < this.listSubcate.length; i++) {
      const input1 = document.getElementsByClassName("filter_cate")[
        i
      ] as HTMLInputElement;
      if (input1.checked) {
        checkedcate = input1.value;
      }
    }

    for (var km = 0; km < this.distances.length; km++) {
      const input = document.getElementsByClassName("filter_km")[
        km
      ] as HTMLInputElement;
      if (input.checked) {
        checked_km = input.value;
      }
    }

    for (var d = 0; d < this.rating.length; d++) {
      const input = document.getElementsByClassName("ratess")[
        d
      ] as HTMLInputElement;
      if (input.checked) {
        checkedrate = input.value;
      }
    }

    for (var i = 0; i < this.mostviews.length; i++) {
      const input = document.getElementsByClassName("mview")[
        i
      ] as HTMLInputElement;
      if (input.checked) {
        mviewed = input.value;
      }
    }

    if (checkedcate === null) {
      checkedcate = "";
      this.catechk = false;
    } else {
      this.catechk = true;
    }

    if (checkedregion == null) {
      checkedregion = "";
      this.regchk = false;
    } else {
      this.regchk = true;
    }

    if (checked_km == null) {
      checked_km = "";
      this.dischk = false;
    } else {
      this.dischk = true;
    }

    if (checkedrate == null) {
      checkedrate = "";
      this.ratechk = false;
    } else {
      this.ratechk = true;
    }

    if (mviewed == null) {
      mviewed = "";
      this.viewchk = false;
    } else {
      this.viewchk = true;
    }

    const address = document.getElementsByClassName(
      "searchadd"
    )[0] as HTMLInputElement;

    if (address.value) {
      this.searchUrl =
        environment.apiUrl +
        "listings/search?search_type=" +
        this.cateSlug +
        "&search_category=" +
        checkedcate +
        "&search_region=" +
        checkedregion +
        "&search_lat=" +
        this.latitude +
        "&search_lng=" +
        this.longitude +
        "&search_radius=" +
        checked_km +
        "&search_rating=" +
        checkedrate +
        "&search_view=" +
        mviewed +
        "&page=" +
        newPage;
      console.log("ifif" + address.value);
    } else {
      this.searchUrl =
        environment.apiUrl +
        "listings/search?search_type=" +
        this.cateSlug +
        "&search_category=" +
        checkedcate +
        "&search_region=" +
        checkedregion +
        "&search_radius=" +
        checked_km +
        "&search_rating=" +
        checkedrate +
        "&search_view=" +
        mviewed +
        "&page=" +
        newPage;
      console.log("elseelse" + address.value);
    }

    this.http.get(this.searchUrl).subscribe(
      (res: any) => {
        this.lscounts = res.count;
        this.collection = res.data;
        this.tot = res.count;
        this.cateName = res.category;
        window.scrollTo(0, 0);
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }

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
    listingid: [""],
    enq_cont: ["", [Validators.required]]
  });

  pathcid(id) {
    this.listingEnq.patchValue({
      listingid: id
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

  onSearch() {
    // console.log('test');
    var checkedcate = null;
    var cates = "filter_cate";
    var checkedregion = null;
    var regions = "filter_region";
    var distance = "filter_km";
    var checked_km = null;
    var rate = "ratings";
    var checkedrate = null;
    var mviews = "mview";
    var mviewed = null;

    for (var j = 0; j < this.listingRegion.length; j++) {
      const input = document.getElementsByClassName("filter_region")[
        j
      ] as HTMLInputElement;
      if (input.checked) {
        checkedregion = input.value;
      }
    }

    for (var i = 0; i < this.listSubcate.length; i++) {
      const input1 = document.getElementsByClassName("filter_cate")[
        i
      ] as HTMLInputElement;
      if (input1.checked) {
        checkedcate = input1.value;
      }
    }

    for (var km = 0; km < this.distances.length; km++) {
      const input = document.getElementsByClassName("filter_km")[
        km
      ] as HTMLInputElement;
      if (input.checked) {
        checked_km = input.value;
      }
    }

    for (var d = 0; d < this.rating.length; d++) {
      const input = document.getElementsByClassName("ratess")[
        d
      ] as HTMLInputElement;
      if (input.checked) {
        checkedrate = input.value;
      }
    }

    for (var i = 0; i < this.mostviews.length; i++) {
      const input = document.getElementsByClassName("mview")[
        i
      ] as HTMLInputElement;
      if (input.checked) {
        mviewed = input.value;
      }
    }

    if (checkedcate === null) {
      checkedcate = "";
      this.catechk = false;
    } else {
      this.catechk = true;
    }

    if (checkedregion == null) {
      checkedregion = "";
      this.regchk = false;
    } else {
      this.regchk = true;
    }

    if (checked_km == null) {
      checked_km = "";
      this.dischk = false;
    } else {
      this.dischk = true;
    }

    if (checkedrate == null) {
      checkedrate = "";
      this.ratechk = false;
    } else {
      this.ratechk = true;
    }

    if (mviewed == null) {
      mviewed = "";
      this.viewchk = false;
    } else {
      this.viewchk = true;
    }

    const address = document.getElementsByClassName(
      "searchadd"
    )[0] as HTMLInputElement;

    if (address.value) {
      this.searchUrl =
        environment.apiUrl +
        "listings/search?search_type=" +
        this.cateSlug +
        "&search_category=" +
        checkedcate +
        "&search_region=" +
        checkedregion +
        "&search_lat=" +
        this.latitude +
        "&search_lng=" +
        this.longitude +
        "&search_radius=" +
        checked_km +
        "&search_rating=" +
        checkedrate +
        "&search_view=" +
        mviewed;
      console.log("ifif" + address.value);
    } else {
      this.searchUrl =
        environment.apiUrl +
        "listings/search?search_type=" +
        this.cateSlug +
        "&search_category=" +
        checkedcate +
        "&search_region=" +
        checkedregion +
        "&search_radius=" +
        checked_km +
        "&search_rating=" +
        checkedrate +
        "&search_view=" +
        mviewed;
      console.log("elseelse" + address.value);
    }

    this.p = 1;
    this.http.get(this.searchUrl).subscribe(
      (res: any) => {
        this.lscounts = res.count;
        this.collection = res.data;
        this.tot = res.count;
        this.cateName = res.category;

        document.getElementById("searchresult_li").scrollIntoView({
          behavior: "smooth"
        });
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }

  onKey(event: any) {
    this.locatadd = "";
    this.locatadd += event.target.value + " ";
    this.mapUrl =
      "https://dev.virtualearth.net/REST/v1/Locations/?key=AuaSnZtByiBVUQmxQWRpp5jYHU3do7fAQWIiLyhCkf41jeB68-oEvZdvNoqKSr48&query=" +
      event.target.value +
      "&userLocation=38.9852063,-108.9824852,400";

    this.http.get(this.mapUrl).subscribe(
      (data: any) => {
        this.locatadd = data.resourceSets[0].resources;
      },
      msg => {
        this.results = msg;
        this.results = msg.error;
        this.errormsg = msg["error"].error;
      }
    );
  }

  locatclick = "";
  getlocAdd(event: any) {
    this.locatclick = "";
    this.locatclick += event.target.innerText + "";
    this.selectedLoc = event.target.getAttribute("data-latlan");
    this.locatadd = "";
    this.selectedLoc = event.target.getAttribute("data-latlan");
    this.latlong = this.selectedLoc.split(",");
    this.latitude = this.latlong[0];
    this.longitude = this.latlong[1];
  }

  selectedLoc = "";
  setlocAdd(event: any) {
    this.selectedLoc = "";
    this.selectedLoc = event.target.getAttribute("data-latlan");
    this.latlong = this.selectedLoc.split(",");
    this.latitude = this.latlong[0];
    this.longitude = this.latlong[1];
    this.locatadd = "";
  }

  resetregion() {
    for (var j = 0; j < this.listingRegion.length; j++) {
      (<HTMLInputElement>(
        document.getElementsByClassName("filter_region")[j]
      )).checked = false;
    }
    this.onSearch();
  }

  resetcate() {
    for (var i = 0; i < this.listSubcate.length; i++) {
      (<HTMLInputElement>(
        document.getElementsByClassName("filter_cate")[i]
      )).checked = false;
    }
    this.onSearch();
  }

  resetloc() {
    (<HTMLInputElement>document.getElementById("from_loc")).value = "";
    for (var km = 0; km < this.distances.length; km++) {
      (<HTMLInputElement>(
        document.getElementsByClassName("filter_km")[km]
      )).checked = false;
    }
    this.onSearch();
  }

  resetrating() {
    for (var d = 0; d < this.rating.length; d++) {
      (<HTMLInputElement>(
        document.getElementsByClassName("ratess")[d]
      )).checked = false;
    }
    this.onSearch();
  }

  resetview() {
    for (var i = 0; i < this.mostviews.length; i++) {
      (<HTMLInputElement>(
        document.getElementsByClassName("mview")[i]
      )).checked = false;
    }
    this.onSearch();
  }

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
          console.log(res.data.message);
        },
        (msg: any) => {
          console.log(msg.error.error);
        }
      );

    if (this.logeduser && this.logToken) {
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
            //console.log(res.data.message);
          },
          (msg: any) => {
            console.log(msg.error.error);
          }
        );
    }
  }

  twitterfeeds() {
    const tid = environment.twitterfeed + "walldirectory";
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
    this.http.get(this.seourl).subscribe(
      (res: any) => {
        this.seometa = res;
        this.pagecontent = res.content;
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
    link.setAttribute("href", this.seopath + "/" + this.cateSlug);
  }
  /* SEO SETTINGS Close*/

  truncateHTML(text: string): string {
    let charlimit = 220;
    if (!text || text.length <= charlimit) {
      return text;
    }

    let without_html = text.replace(/<(?:.|\n)*?>/gm, "");
    let shortened = without_html.substring(0, charlimit);
    return shortened + "...";
  }
}
