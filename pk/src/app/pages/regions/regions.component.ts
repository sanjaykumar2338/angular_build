import { Component, OnInit, Injector, Inject } from "@angular/core";
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
import { Meta, Title } from "@angular/platform-browser";
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { AuthService } from "../../auth/auth.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-regions",
  templateUrl: "./regions.component.html",
  styleUrls: ["./regions.component.css"]
})
export class RegionsComponent implements OnInit {
  cateSlug = this.route.snapshot.paramMap.get("slug");

  logeduser: any;
  logToken: any;

  enqsucc: any;
  enqerr: any;
  enqloader: any;
  seopath = environment.sitepath;
  //seourl = environment.apiUrl + "pages/" + this.cateSlug;
  seometa: any[];
  siteUrl = environment.sitepath;

  /*  cateformUrl = environment.apiUrl + "listings/regions/id/"; */
  cateformUrl = environment.apiUrl + "listings/search/subscribe/";
  cateloader: any;
  cateSuccess: any;
  cateError: any;

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

  crating: any;
  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  phonereg = /^-?(0|[1-9]\d*)?$/;
  regdesc: any;
  locaname: any;
  locatadd: any;
  getloc: object;
  latlong: any;
  latitude: any;
  longitude: any;
  mapUrl: any;
  results: any;
  errormsg: any;
  reglat: any;
  reglng: any;

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
    { km: "500km Max", val: "5000" }
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
  rimg: any;

  listCates: any;
  listSubcates: any;
  listRegs: any;
  tap1: boolean = false;
  tap2: boolean = false;
  tap3: boolean = false;
  tap4: boolean = false;
  tap5: boolean = false;
  tap6: boolean = false;
  tap7: boolean = false;

  errcate = "";
  errscate = "";
  errloc = "";
  errdetail = "";

  close_wiz: any;
  reurlcheck: any;
  preloader = "";

  step1() {
    this.tap1 = true;
    this.tap2 = false;
    this.tap3 = false;
    this.tap4 = false;
    this.tap5 = false;
    this.tap6 = false;
    this.cateForm.get("buss_loc").setValue("");
  }

  step2() {
    var form = this.cateForm.value;
    this.cateForm.get("buss_cate").setValue("");
    var loc = form.buss_loc;
    if (loc) {
      this.tap2 = true;
      this.tap1 = false;
      this.tap3 = false;
      this.tap4 = false;
      this.tap5 = false;
      this.tap6 = false;
      this.errloc = "";
    } else {
      this.errloc = "t";
    }
  }

  step3() {
    this.cateForm.get("buss_scate").setValue("");
    var form = this.cateForm.value;
    var cate = this.cateForm.get("buss_cate").value;

    var val = true;

    if (cate == "") {
      var val = false;
      this.errcate = "t";
    } else {
      this.errcate = "";
    }

    if (val == true) {
      this.tap3 = true;
      this.tap1 = false;
      this.tap2 = false;
      this.tap4 = false;
      this.tap5 = false;
      this.tap6 = false;
      this.errcate = "";
    }
  }

  step4() {
    var form = this.cateForm.value;
    var scate = this.cateForm.get("buss_scate").value;
    var val = true;

    if (scate == "") {
      var val = false;
      this.errscate = "t";
    } else {
      this.errscate = "";
    }

    if (val == true) {
      this.tap4 = true;
      this.tap1 = false;
      this.tap2 = false;
      this.tap3 = false;
      this.tap5 = false;
      this.tap6 = false;
    }
  }

  step6() {
    this.tap1 = false;
    this.tap2 = false;
    this.tap3 = false;
    this.tap4 = false;
    this.tap5 = false;
    this.tap6 = true;
  }

  step5() {
    this.tap1 = false;
    this.tap2 = false;
    this.tap3 = false;
    this.tap4 = false;
    this.tap5 = true;
    this.tap6 = false;
  }

  step7() {
    this.tap1 = false;
    this.tap2 = false;
    this.tap3 = false;
    this.tap4 = false;
    this.tap5 = false;
    this.tap6 = false;
    this.tap7 = true;
  }

  send() {
    var form = this.cateForm.value;

    var frm_phone = this.cateForm.get("mobile").valid;
    var frm_msg = this.cateForm.get("msg").valid;

    if (frm_phone == true && frm_msg == true) {
      this.errdetail = "";
      /*Check loged user*/
      if (this.logeduser) {
        console.log("loged-" + this.logeduser);

        this.http
          .post(this.cateformUrl, {
            message: form.msg,
            mobile: form.mobile,
            parent_category_id: form.buss_cate,
            sub_category_id: form.buss_scate,
            location: form.buss_loc,
            address: "",
            user_id: this.logeduser
          })
          .subscribe(
            (res: any) => {
              this.cateloader = "";
              this.cateSuccess = "true";
              this.cateError = "";

              this.cateForm.get("buss_cate").setValue("");
              this.cateForm.get("buss_scate").setValue("");
              this.cateForm.get("mobile").setValue("");
              this.cateForm.get("msg").setValue("");

              this.cateloader = "";
              this.cateSuccess = "true";
              this.cateError = "";
              this.tap6 = true;
              this.tap1 = false;
              this.tap2 = false;
              this.tap3 = false;
              this.tap4 = false;
              this.tap5 = false;
              this.tap7 = false;
            },
            (msg: any) => {
              console.log("msg");
              this.cateloader = "";
              this.cateSuccess = "";
              this.cateError = "true";

              this.tap6 = true;
              this.tap1 = false;
              this.tap2 = false;
              this.tap3 = false;
              this.tap4 = false;
              this.tap5 = false;
              this.tap6 = false;
            }
          );
      } else {
        console.log("note loged");

        this.tap5 = true;
        this.step5();

        sessionStorage.setItem("funnelform", JSON.stringify(form));
        sessionStorage.setItem("re_cate", "listing-region/" + this.cateSlug);
        localStorage.setItem("reUrl", "listing-region/" + this.cateSlug);
      }
    } else {
      this.errdetail = "t";
    }
    console.log(form);
  }

  closeall() {
    this.step7();
    this.cateForm.get("buss_cate").setValue("");
    this.cateForm.get("buss_scate").setValue("");
    this.cateForm.get("buss_add").setValue("");
    /* this.cateForm.get("fname").setValue("");
    this.cateForm.get("lname").setValue("");
    this.cateForm.get("email").setValue(""); */
    this.cateForm.get("phone").setValue("");
    this.cateForm.get("msg").setValue("");
  }

  forceclose() {
    this.step2();
    document.getElementById("searchresult_li").scrollIntoView({
      behavior: "smooth"
    });
  }

  /*wiz start*/
  closewiz() {
    var overlay = document.querySelector("body");
    overlay.classList.toggle("hide-overlay");
    this.close_wiz = true;
  }
  close_form() {
    var overlay = document.querySelector("body");
    overlay.classList.remove("hide-overlay");
    this.close_wiz = false;
    this.step2();
  }
  cont_step() {
    var overlay = document.querySelector("body");
    overlay.classList.remove("hide-overlay");
    this.close_wiz = false;
  }
  /*wiz close*/

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

  async ngOnInit() {

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
        mobile: funneldata.mobile,
        cateid: funneldata.cateid,
        msg: funneldata.msg
      });
      var form = this.cateForm.value;
      this.http
        .post(this.cateformUrl, {
          mobile: form.mobile,
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
            this.tap6 = true;
            this.tap1 = false;
            this.tap2 = false;
            this.tap3 = false;
            this.tap4 = false;
            this.tap5 = false;
            this.tap7 = false;
            sessionStorage.removeItem("re_cate");
            sessionStorage.removeItem("funnelform");
            localStorage.setItem("utype", "customer");
          },
          (msg: any) => {
            this.cateloader = "";
            this.cateSuccess = "";
            this.cateError = "true";
            this.tap6 = true;
            this.tap1 = false;
            this.tap2 = false;
            this.tap3 = false;
            this.tap4 = false;
            this.tap5 = false;
            this.tap7 = false;
            sessionStorage.removeItem("re_cate");
            sessionStorage.removeItem("funnelform");
          }
        );
    } else {
      console.log("else");
      this.tap2 = true;
      this.step2();
    }

    this.getListing(this.cateSlug);
    this.twitterfeeds();

    this.getcate();
    this.getRegion();
  }

  getcate() {
    const cateurl = environment.apiUrl + "listings/categories/";
    this.http.get(cateurl).subscribe((res: any) => {
      this.listCates = res.data;
    });
  }

  subcate(cate: string) {
    console.log(cate);
    this.cateForm.get("buss_scate").setValue("");
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

  cateForm = this.fb.group({
    buss_cate: ["", Validators.required],
    buss_scate: ["", Validators.required],
    buss_loc: ["", Validators.required],
    mobile: ["", [Validators.required, Validators.pattern(this.phonereg)]],
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
          location: form.buss_loc,
          address: ""
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
      itemsPerPage: 10
    };
    this.http
      .get(this.listingUrl + "/?search_region=" + slug)
      .subscribe((res: any) => {
        this.collection = res.data;
        this.tot = res.count;

        this.cateName = res.category;
        this.rimg = res.region.region_image
          ? this.imgPath + res.region.region_image
          : this.seopath + "/assets/images/business-region.jpg";
        this.lscounts = res.count;
        this.listingRegion = res.regions;
        this.listSubcate = res.categories;
        this.regdesc = res.region.description;
        this.locaname = res.region.name;
        this.reglat = res.region.lat ? res.region.lat : "";
        this.reglng = res.region.lng ? res.region.lng : "";

        this.seometa = res.meta;

        this.cateForm.patchValue({
          cateid: res.region.id
        });

        this.cateForm.patchValue({
          buss_loc: res.region.name
        });
      });
  }

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

    /* for (var j = 0; j < this.listingRegion.length; j++) {
      const input = document.getElementsByClassName("filter_region")[
        j
      ] as HTMLInputElement;
      if (input.checked) {
        checkedregion = input.value;
      }
    } */

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

    //console.log(this.latitude+"-latitude");
    //console.log(this.longitude+"-longitude");

    //const address = document.getElementsByClassName("searchadd")[0] as HTMLInputElement;
    console.log("+++" + checked_km);
    if (this.reglat && this.reglng && checked_km) {
      this.searchUrl =
        environment.apiUrl +
        "listings/search?search_category=" +
        checkedcate +
        "&search_lat=" +
        this.reglat +
        "&search_lng=" +
        this.reglng +
        "&search_radius=" +
        checked_km +
        "&search_rating=" +
        checkedrate +
        "&search_view=" +
        mviewed +
        "&page=" +
        newPage;
      console.log("ifif" + this.reglat);
    } else {
      this.searchUrl =
        environment.apiUrl +
        "listings/search?search_category=" +
        checkedcate +
        "&search_region=" +
        this.cateSlug +
        "&search_radius=" +
        checked_km +
        "&search_rating=" +
        checkedrate +
        "&search_view=" +
        mviewed +
        "&page=" +
        newPage;
    }


    document.getElementById("preloader").style.display = "block";

    this.http.get(this.searchUrl).subscribe(
      (res: any) => {
        this.collection = res.data;
        this.tot = res.count;

        this.cateName = res.category;
        this.lscounts = res.count;

        document.getElementById("preloader").style.display = "none";
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

    /* for (var j = 0; j < this.listingRegion.length; j++) {
      const input = document.getElementsByClassName("filter_region")[
        j
      ] as HTMLInputElement;
      if (input.checked) {
        checkedregion = input.value;
      }
    } */

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

    //console.log(this.latitude+"-latitude");
    //console.log(this.longitude+"-longitude");

    //const address = document.getElementsByClassName("searchadd")[0] as HTMLInputElement;
    console.log("+++" + checked_km);
    if (this.reglat && this.reglng && checked_km) {
      this.searchUrl =
        environment.apiUrl +
        "listings/search?search_category=" +
        checkedcate +
        "&search_lat=" +
        this.reglat +
        "&search_lng=" +
        this.reglng +
        "&search_radius=" +
        checked_km +
        "&search_rating=" +
        checkedrate +
        "&search_view=" +
        mviewed;
      console.log("ifif" + this.reglat);
    } else {
      this.searchUrl =
        environment.apiUrl +
        "listings/search?search_category=" +
        checkedcate +
        "&search_region=" +
        this.cateSlug +
        "&search_radius=" +
        checked_km +
        "&search_rating=" +
        checkedrate +
        "&search_view=" +
        mviewed;
    }

    document.getElementById("preloader").style.display = "block";

    this.p = 1;
    this.http.get(this.searchUrl).subscribe(
      (res: any) => {
        //console.log(res);
        this.collection = res.data;
        this.tot = res.count;
        this.cateName = res.category;
        this.lscounts = res.count;

        document.getElementById("preloader").style.display = "none";

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

  resetcate() {
    for (var i = 0; i < this.listSubcate.length; i++) {
      (<HTMLInputElement>(
        document.getElementsByClassName("filter_cate")[i]
      )).checked = false;
    }
    this.onSearch();
  }

  resetloc() {
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
          // console.log(res.data.message);
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
    this.http
      .get(this.listingUrl + "/?search_region=" + this.cateSlug)
      .subscribe(
        (res: any) => {
          this.seometa = res.meta;
          if (this.seometa["title"]) {
            this.title.setTitle(this.seometa["title"]);
            this.meta.updateTag({
              name: "twitter:title",
              content: this.seometa["title"]
            });
            this.meta.updateTag({
              name: "og:title",
              content: this.seometa["title"]
            });
          }
          this.meta.addTag({
            property: "og:url",
            content: this.seopath + "" + this.router.url
          });
          if (this.seometa["description"]) {
            this.meta.updateTag({
              name: "description",
              content: this.seometa["description"]
            });
            this.meta.addTag({
              property: "og:description",
              content: this.seometa["description"]
            });
            this.meta.updateTag({
              name: "twitter:description",
              content: this.seometa["description"]
            });
          }
          if (this.seometa["keywords"]) {
            this.meta.updateTag({
              name: "keywords",
              content: this.seometa["keywords"]
            });
          }
        },
        (msg: any) => {
          console.log(msg);
        }
      );

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute(
      "href",
      this.seopath + "/listing-region/" + this.cateSlug
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
}
