import { Component, OnInit, Injector, Inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";
import { PageservService } from "../../../../src/app/services/pageserv.service";
import { Meta, Title } from "@angular/platform-browser";
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, isPlatformServer, DOCUMENT } from "@angular/common";
import { AuthService } from "../../auth/auth.service";
import { jsonpFactory } from "@angular/http/src/http_module";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  private sub: any;
  locip = environment.apiUrl + "auth/country-zone";
  cateSlug = this.route.snapshot.paramMap.get("slug");
  cateName: any;

  logeduser: any;
  logToken: any;

  enqsucc: any;
  enqerr: any;
  enqloader: any;
  joinloader: any;

  seopath = environment.sitepath;
  seourl = environment.apiUrl + "listings/categories/slug/" + this.cateSlug;
  seometa: any;
  siteUrl = environment.sitepath;

  listingUrl = environment.apiUrl + "listings/search";
  imgPath = environment.imgPath;
  listData: any;
  lscount: boolean = false;
  listingRegion: any;
  listsPost: any;
  listSubcate: any;
  public allItems: any[];
  pager: any = {};
  pagedItems: any[];
  lscounts: any;
  locatadd: any;
  getloc: object;
  latlong: any;
  latitude: any;
  longitude: any;

  mapUrl: any;
  results: any;
  errormsg: any;
  listlocat: any;
  preloader = "";
  cateformUrl = environment.apiUrl + "listings/search/subscribe/";
  form_getaddress: any;
  crating: any;
  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  phonereg = /^[0-9][0-9]*([.][0-9]{2}|)$/;
  cateloader: any;
  cateSuccess: any;
  cateError: any;
  addfetched = "";

  listCates: any;
  listSubcates: any;
  listRegs: any;

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

  tap1: boolean = false;
  tap2: boolean = false;
  tap3: boolean = false;
  tap4: boolean = false;
  tap5: boolean = false;
  tap6: boolean = false;

  errcate = "";
  errscate = "";
  errloc = "";
  close_wiz: boolean = false;
  errdetail = "";

  twfeed: any;

  config: any;
  collection = [];
  tot: any;
  p: number = 1;

  ipAddress: any;
  reurlcheck: any;

  constructor(
    private meta: Meta,
    private title: Title,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private pagerService: PageservService,
    private authservice: AuthService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    @Inject(DOCUMENT) private doc
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }



  ngOnInit() {
    setTimeout(function () {
      document.getElementById("preloader").style.display = "none";
    }, 1200);

    if (isPlatformBrowser(this._platformId)) {
      this.logeduser = this.authservice.getUser();
      this.logToken = this.authservice.getToken();
      this.reurlcheck = sessionStorage.getItem("re_cate");
      var funnelformdata = sessionStorage.getItem("funnelform");
    }
    /* this.logeduser = this.authservice.getUser();
    this.logToken = this.authservice.getToken(); */
    console.log(this.reurlcheck);

    if (this.reurlcheck && funnelformdata && this.logToken) {
      this.tap5 = true;
      console.log("iff");

      var funneldata = JSON.parse(funnelformdata);
      console.log(funneldata);
      this.cateForm.patchValue({
        buss_cate: funneldata.buss_cate,
        buss_scate: funneldata.buss_scate,
        buss_loc: funneldata.buss_loc,
        buss_add: funneldata.buss_add,

        phone: funneldata.phone,
        cateid: funneldata.cateid,

        msg: funneldata.msg
      });
      var form = this.cateForm.value;
      this.http
        .post(this.cateformUrl, {
          mobile: form.phone,
          message: form.msg,
          parent_category_id: form.buss_cate,
          sub_category_id: form.buss_scate,
          location: form.buss_loc,
          address: form.buss_add,
          user_id: this.logeduser
        })
        .subscribe(
          (res: any) => {
            this.cateloader = "";
            this.cateSuccess = "true";
            this.cateError = "";
            this.tap5 = true;
            this.tap1 = false;
            this.tap2 = false;
            this.tap3 = false;
            this.tap4 = false;
            this.tap6 = false;
            sessionStorage.removeItem("re_cate");
            sessionStorage.removeItem("funnelform");
            localStorage.setItem("utype", "customer");
          },
          (msg: any) => {
            this.cateloader = "";
            this.cateSuccess = "";
            this.cateError = "true";
            this.tap5 = true;
            this.tap1 = false;
            this.tap2 = false;
            this.tap3 = false;
            this.tap4 = false;
            this.tap6 = false;
            sessionStorage.removeItem("re_cate");
            sessionStorage.removeItem("funnelform");
          }
        );
    } else {
      console.log("else");
      this.tap1 = true;
      this.step1();
    }

    this.getListing(this.cateSlug);
    this.getcate();
    this.getRegion();

    this.twitterfeeds();
  }

  addfill() {
    this.http
      .get("https://walldirectory.com/v2/api/auth/country-zone-data")
      .subscribe((res: any) => {
        this.addfetched = res.region_code + ", " + res.country_code;
        console.log("address" + this.addfetched);

        this.cateForm.patchValue({ buss_loc: res.region_code });
      });
  }

  step1() {
    this.tap1 = true;
    this.tap2 = false;
    this.tap3 = false;
    this.tap4 = false;
    this.tap5 = false;
    this.tap6 = false;
  }

  step2() {
    var servselect = this.cateForm.get("buss_scate").value;
    this.cateForm.get("buss_add").setValue("");
    if (servselect) {
      this.tap2 = true;
      this.tap1 = false;
      this.tap3 = false;
      this.tap4 = false;
      this.tap5 = false;
      this.tap6 = false;
      this.errscate = "";
    } else {
      this.errscate = "t";
    }
  }

  step3() {
    var selectedloc = this.cateForm.get("buss_add").value;
    console.log(this.cateForm.get("buss_add").value);
    if (selectedloc) {
      this.tap3 = true;
      this.tap1 = false;
      this.tap2 = false;
      this.tap4 = false;
      this.tap5 = false;
      this.tap6 = false;
      this.errloc = "";
    } else {
      this.errloc = "t";
    }
  }

  step4() {
    this.tap4 = true;

    this.tap1 = false;
    this.tap2 = false;
    this.tap3 = false;
    this.tap5 = false;
    this.tap6 = false;
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  cateForm = this.fb.group({
    buss_cate: ["", Validators.required],
    buss_scate: ["", Validators.required],
    buss_loc: ["", Validators.required],
    buss_add: ["", Validators.required],
    phone: ["", [Validators.required, Validators.pattern(this.phonereg)]],
    cateid: [""],
    msg: ["", Validators.required]
  });

  /*  onSubmitcate() {
    if (this.cateForm.valid) {
      this.cateloader = "true";
      var form = this.cateForm.value;
      console.log(form);
      this.http
        .post(this.cateformUrl, {
          message: form.msg,
          first_name: form.fname,
          last_name: form.lname,
          email: form.email,
          mobile: form.mobile,
          parent_category_id: form.buss_cate,
          sub_category_id: form.buss_scate,
          region_id: form.buss_loc
        })
        .subscribe(
          (res: any) => {
            this.cateloader = "";
            this.cateSuccess = "true";
            this.cateError = "";
            //this.cateForm.reset();

            this.cateForm.get("buss_cate").setValue("");
            this.cateForm.get("buss_scate").setValue("");
            this.cateForm.get("buss_loc").setValue("");
            this.cateForm.get("fname").setValue("");
            this.cateForm.get("lname").setValue("");
            this.cateForm.get("email").setValue("");
            this.cateForm.get("mobile").setValue("");
            this.cateForm.get("msg").setValue("");

            setTimeout(() => {
              this.cateSuccess = "";
              this.step1();
            }, 2000);
          },
          (msg: any) => {
            console.log("msg");
            this.cateloader = "";
            this.cateSuccess = "";
            this.cateError = "true";
            setTimeout(() => {
              this.cateError = "";
            }, 2000);
          }
        );
    } else {
      this.validateAllFormFields(this.cateForm);
    }
  } */

  getListing(slug) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 12
    };
    this.http
      .get(this.listingUrl + "/?search_category=" + slug)
      .subscribe((res: any) => {
        this.lscounts = res.count;
        this.collection = res.data;

        this.tot = res.count;

        this.cateName = res.category;
        this.listingRegion = res.regions;
        this.listSubcate = res.categories;

        this.cateForm.patchValue({ buss_cate: res.category.id });
        this.cateForm.patchValue({ cateid: this.cateName.id });

        this.subcate(this.cateName.id);
      });
  }

  pageChange(newPage: number) {
    this.p = newPage; //page index change.

    /*Filter any checked*/
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
      if (
        (<HTMLInputElement>document.getElementsByClassName("filter_region")[j])
          .checked == true
      ) {
        checkedregion = (<HTMLInputElement>(
          document.getElementsByClassName("filter_region")[j]
        )).value;
      }
    }

    for (var i = 0; i < this.listSubcate.length; i++) {
      if (
        (<HTMLInputElement>document.getElementsByClassName("filter_cate")[i])
          .checked == true
      ) {
        checkedcate = (<HTMLInputElement>(
          document.getElementsByClassName("filter_cate")[i]
        )).value;
      }
    }

    for (var km = 0; km < this.distances.length; km++) {
      if (
        (<HTMLInputElement>document.getElementsByClassName("filter_km")[km])
          .checked == true
      ) {
        checked_km = (<HTMLInputElement>(
          document.getElementsByClassName("filter_km")[km]
        )).value;
      }
    }

    for (var d = 0; d < this.rating.length; d++) {
      if (
        (<HTMLInputElement>document.getElementsByClassName("ratess")[d])
          .checked == true
      ) {
        checkedrate = (<HTMLInputElement>(
          document.getElementsByClassName("ratess")[d]
        )).value;
      }
    }

    for (var i = 0; i < this.mostviews.length; i++) {
      if (
        (<HTMLInputElement>document.getElementsByClassName("mview")[i])
          .checked == true
      ) {
        mviewed = (<HTMLInputElement>(
          document.getElementsByClassName("mview")[i]
        )).value;
      }
    }

    if (checkedcate === null) {
      checkedcate = this.cateSlug;
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
        "listings/search?search_category=" +
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
        "listings/search?search_category=" +
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

    document.getElementById("preloader").style.display = "block";
    this.http.get(this.searchUrl).subscribe(
      (res: any) => {
        this.lscounts = res.count;
        this.collection = res.data;
        this.tot = res.count;

        //this.cateName = res.category;
        // this.listingRegion=res.regions;
        //this.listSubcate=res.categories;

        this.lscounts = res.count;
        this.collection = res.data;

        this.tot = res.count;
        this.cateForm.patchValue({ cateid: this.cateName.id });
        window.scrollTo(0, 0);
        document.getElementById("preloader").style.display = "none";
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
    /* console.log(id); */
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
    this.p = 1;
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
      if (
        (<HTMLInputElement>document.getElementsByClassName("filter_region")[j])
          .checked == true
      ) {
        checkedregion = (<HTMLInputElement>(
          document.getElementsByClassName("filter_region")[j]
        )).value;
      }
    }

    for (var i = 0; i < this.listSubcate.length; i++) {
      if (
        (<HTMLInputElement>document.getElementsByClassName("filter_cate")[i])
          .checked == true
      ) {
        checkedcate = (<HTMLInputElement>(
          document.getElementsByClassName("filter_cate")[i]
        )).value;
      }
    }

    for (var km = 0; km < this.distances.length; km++) {
      if (
        (<HTMLInputElement>document.getElementsByClassName("filter_km")[km])
          .checked == true
      ) {
        checked_km = (<HTMLInputElement>(
          document.getElementsByClassName("filter_km")[km]
        )).value;
      }
    }

    for (var d = 0; d < this.rating.length; d++) {
      if (
        (<HTMLInputElement>document.getElementsByClassName("ratess")[d])
          .checked == true
      ) {
        checkedrate = (<HTMLInputElement>(
          document.getElementsByClassName("ratess")[d]
        )).value;
      }
    }

    for (var i = 0; i < this.mostviews.length; i++) {
      if (
        (<HTMLInputElement>document.getElementsByClassName("mview")[i])
          .checked == true
      ) {
        mviewed = (<HTMLInputElement>(
          document.getElementsByClassName("mview")[i]
        )).value;
      }
    }

    if (checkedcate === null) {
      checkedcate = this.cateSlug;
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

    //console.log(this.latitude + "-latitude");
    //console.log(this.longitude + "-longitude");

    const address = document.getElementsByClassName(
      "searchadd"
    )[0] as HTMLInputElement;

    if (address.value) {
      this.searchUrl =
        environment.apiUrl +
        "listings/search?search_category=" +
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
        "listings/search?search_category=" +
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

    document.getElementById("preloader").style.display = "block";
    this.http.get(this.searchUrl).subscribe(
      (res: any) => {
        this.lscounts = res.count;
        this.collection = res.data;
        this.tot = res.count;

        document.getElementById("searchresult_li").scrollIntoView({
          behavior: "smooth"
        });

        document.getElementById("preloader").style.display = "none";
        //this.cateName = res.category;
        // this.listingRegion=res.regions;
        //this.listSubcate=res.categories;
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }

  //https://www.ebia.at/angular2-ngfor-only-supports-binding-to-iterables-such-as-arrays/
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

  /* get_tw(slug) {
    const gettwid = this.twitterfeed.find(twid => twid.cate === slug);
    if (gettwid) {
      this.twfeed = "loop";
    } else {
      this.twfeed = "";
    }
  } */

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
    this.addfetched = event.target.getAttribute("data-state");
    //console.log(this.longitude+"--longitude");
    //console.log(this.latitude+"--latitude");
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

  getcate() {
    const cateurl = environment.apiUrl + "listings/categories/";
    this.http.get(cateurl).subscribe((res: any) => {
      this.listCates = res.data;
    });
  }

  /* subcate(cate: string) {
    this.cateForm.get("buss_scate").setValue("");
    const cateurl =
      environment.apiUrl + "listings/categories/subcategories/" + cate;
    this.http.get(cateurl).subscribe((res: any) => {
      this.listSubcates = res.data;
    });
  } */
  subcate(cate: string) {
    const cateurl =
      environment.apiUrl + "listings/categories/subcategories/" + cate;
    this.http.get(cateurl).subscribe((res: any) => {
      this.listSubcates = res.data;
    });
  }

  getRegion() {
    const regurl = environment.apiUrl + "listings/regions";
    this.http.get(regurl).subscribe((res: any) => {
      this.listRegs = res.data;
    });
  }

  /*wiz*/
  closewiz() {
    var overlay = document.querySelector("body");
    overlay.classList.toggle("hide-overlay");
    this.close_wiz = true;
  }
  close_form() {
    var overlay = document.querySelector("body");
    overlay.classList.remove("hide-overlay");
    this.close_wiz = false;
    this.step1();
  }
  cont_step() {
    var overlay = document.querySelector("body");
    overlay.classList.remove("hide-overlay");

    this.close_wiz = false;
  }

  send() {
    var frm_phone = this.cateForm.get("phone").valid;
    var frm_msg = this.cateForm.get("msg").valid;
    if (frm_phone == true && frm_msg == true) {
      this.tap3 = true;
      this.tap1 = false;
      this.tap2 = false;
      this.errdetail = "";
      var form = this.cateForm.value;
      console.log(JSON.stringify(form));

      /*Check loged user*/
      if (this.logeduser) {
        console.log("loged");

        this.http
          .post(this.cateformUrl, {
            first_name: "",
            last_name: "",
            email: "",
            message: form.msg,
            mobile: form.phone,
            parent_category_id: form.buss_cate,
            sub_category_id: form.buss_scate,
            location: form.buss_loc,
            address: form.buss_add,
            user_id: this.logeduser
          })
          .subscribe(
            (res: any) => {
              this.cateloader = "";
              this.cateSuccess = "true";
              this.cateError = "";
              this.tap5 = true;

              this.tap1 = false;
              this.tap2 = false;
              this.tap3 = false;
              this.tap4 = false;
              this.tap6 = false;
            },
            (msg: any) => {
              this.cateloader = "";
              this.cateSuccess = "";
              this.cateError = "true";
              this.tap5 = true;
              this.tap1 = false;
              this.tap2 = false;
              this.tap3 = false;
              this.tap4 = false;
              this.tap6 = false;
            }
          );
      } else {
        this.tap4 = true;
        this.step4();

        sessionStorage.setItem("funnelform", JSON.stringify(form));
        sessionStorage.setItem("re_cate", "listing-category/" + this.cateSlug);

        localStorage.setItem("reUrl", "listing-category/" + this.cateSlug);
      }
    } else {
      this.errdetail = "t";
    }

    /* var frm_phone = this.cateForm.get("phone").valid;
    var frm_msg = this.cateForm.get("msg").valid;

    if (frm_phone == true && frm_msg == true) {
      this.tap3 = true;
      this.tap1 = false;
      this.tap2 = false;
      this.errdetail = "";
      var form = this.cateForm.value;

      console.log(JSON.stringify(form));

      this.cateloader = "t";

      if (this.logeduser && this.logToken) {
        this.http
          .post(this.cateformUrl, {
            message: form.msg,
            mobile: form.phone,
            parent_category_id: form.buss_cate,
            sub_category_id: form.buss_scate,
            location: form.buss_loc,
            address: form.buss_add,
            user_id: this.logeduser
          })
          .subscribe(
            (res: any) => {
              this.cateloader = "";
              this.cateSuccess = "true";
              this.cateError = "";
              this.tap4 = true;
              this.tap2 = false;
              this.tap3 = false;
              this.tap1 = false;
            },
            (msg: any) => {
              this.cateloader = "";
              this.cateSuccess = "";
              this.cateError = "true";
              this.tap4 = true;
              this.tap2 = false;
              this.tap3 = false;
              this.tap1 = false;
            }
          );
        console.log("save");
      } else {
        sessionStorage.setItem("funnelform", JSON.stringify(form));
        sessionStorage.setItem("re_cate", "listing-category/" + this.cateSlug);

        localStorage.setItem("reUrl", "listing-category/" + this.cateSlug);
        window.location.href = "/login";
      }

    
    } else {
      this.errdetail = "t";
    } */
  }

  step5() {
    this.tap1 = false;
    this.tap2 = false;
    this.tap3 = false;
    this.tap4 = false;
    this.tap5 = false;
    this.tap6 = true;
  }

  closeall() {
    this.step5();
    //  this.cateForm.get("buss_cate").setValue("");
    this.cateForm.get("buss_scate").setValue("");

    this.cateForm.get("buss_add").setValue("");
    this.cateForm.get("fname").setValue("");
    this.cateForm.get("lname").setValue("");
    this.cateForm.get("email").setValue("");
    this.cateForm.get("phone").setValue("");
    this.cateForm.get("msg").setValue("");
  }

  forceclose() {
    this.step1();
    document.getElementById("searchresult_li").scrollIntoView({
      behavior: "smooth"
    });
  }
  /*close wiz*/

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
    const tid = environment.twitterfeed + this.cateSlug;
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
        this.seometa = res.data[0];

        //this.getcate(this.seometa.id);

        if (this.seometa.meta.title) {
          this.title.setTitle(this.seometa.meta.title);
          this.meta.updateTag({
            name: "twitter:title",
            content: this.seometa.meta.title
          });
          this.meta.updateTag({
            name: "og:title",
            content: this.seometa.meta.title
          });
        }

        this.meta.addTag({
          property: "og:url",
          content: this.seopath + "" + this.router.url
        });

        if (this.seometa.meta.description) {
          this.meta.updateTag({
            name: "description",
            content: this.seometa.meta.description
          });
          this.meta.addTag({
            property: "og:description",
            content: this.seometa.meta.description
          });
          this.meta.updateTag({
            name: "twitter:description",
            content: this.seometa.meta.description
          });
        }
        if (this.seometa.meta.keywords) {
          this.meta.updateTag({
            name: "keywords",
            content: this.seometa.meta.keywords
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
    link.setAttribute(
      "href",
      this.seopath + "/listing-category/" + this.cateSlug
    );
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

  onKeyform(event: any) {
    this.listlocat = "";
    this.listlocat += event.target.value + " ";
    this.mapUrl =
      "https://dev.virtualearth.net/REST/v1/Locations/?key=AuaSnZtByiBVUQmxQWRpp5jYHU3do7fAQWIiLyhCkf41jeB68-oEvZdvNoqKSr48&query=" +
      event.target.value +
      "&userLocation=38.9852063,-108.9824852,400";

    this.http.get(this.mapUrl).subscribe(
      (data: any) => {
        this.listlocat = data.resourceSets[0].resources;
      },
      msg => {
        this.results = msg;
        this.results = msg.error;
        this.errormsg = msg["error"].error;
      }
    );
  }

  getlocAdd2(event: any) {
    console.log("addfetched" + this.addfetched);
    this.cateForm.patchValue({
      buss_add: event.target.innerText,
      buss_loc: event.target.getAttribute("data-state")
    });
    //console.log(event.target.innerText + "---");
    this.listlocat = "";
  }
}