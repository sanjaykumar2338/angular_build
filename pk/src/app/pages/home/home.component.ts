import { Component, OnInit, Injectable, Inject } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { HomeserviceService } from "../home/services/homeservice.service";
import { environment } from "../../../../src/environments/environment.prod";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { PLATFORM_ID } from "@angular/core";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";

@Injectable()
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  enqsucc: any;
  enqerr: any;
  enqloader: any;
  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  siteUrl2 = environment.sitepath;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/home-page";
  seometa: any;

  searchbanner: FormGroup;
  wiz1Form: FormGroup;
  submitted = false;
  isLoggedIn = "";
  logeduser: any;
  logedname: any;
  imgPath: any;
  siteUrl = environment.siteUrl;
  phonereg = /^-?(0|[1-9]\d*)?$/;
  wizUrl = environment.apiUrl + "home/subscribe-wizard";

  listCates: any;
  selectedCate: any;
  subCates: any;
  scateloader = "";
  suberr1: any;
  suberr2: any;
  suberr3: any;
  suberr4: any;
  wizsucc: any;
  wizerr: any;
  wizsubed: any;

  isUsertype: any;
  videocate_url = environment.apiUrl + "videos/latest?limit=8";
  vcollection: any;

  public mySentences: Array<Object> = [
    { id: 1, text: "Sentence 1" },
    { id: 2, text: "Sentence 2" },
    { id: 3, text: "Sentence 3" },
    { id: 4, text: "Sentenc4 " },
  ];


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    public homeserv: HomeserviceService,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow",
    });
  }
  ngAfterViewInit() {
    /*Start of Tawk.to Script*/
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/59a806d04854b82732fed9ed/default";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
    /*End of Tawk.to Script*/


    this.http.get(this.videocate_url).subscribe(
      (res: any) => {
        this.vcollection = res.list;
      });

  }

  async ngOnInit() {
    console.log('live 1');
    this.imgPath = environment.imgPath;

    this.homeserv.findService().subscribe((res) => {
      this.homeserv.cateCont = res;
    });

    this.homeserv.stateService().subscribe((res) => {
      this.homeserv.stateCont = res;
    });

    this.homeserv.newBusiness().subscribe((res) => {
      this.homeserv.bussCont = res;
    });

    this.homeserv.newReviews().subscribe((res) => {
      this.homeserv.newreviewCont = res;
    });

    this.homeserv.exploreSec().subscribe((res) => {
      this.homeserv.exploreCont = res;
    });

    this.homeserv.enagageSec().subscribe((res) => {
      this.homeserv.engageCont = res;
    });

    this.homeserv.shopSec().subscribe((res) => {
      this.homeserv.shopCont = res;
    });

    this.homeserv.reviewSec().subscribe((res) => {
      this.homeserv.reviewCont = res;
    });

    this.homeserv.listCate().subscribe((res: any) => {
      this.homeserv.listcateCont = res.data;
      // console.log('---'+res.data);
    });

    this.homeserv.listRegion().subscribe((res: any) => {
      this.homeserv.listregionCont = res.data;
      //console.log('---'+res.data);
    });

    /*menu dropdown name show used*/
    /*  this.logeduser = localStorage.getItem("logeduser");
    this.logedname = localStorage.getItem("logedname"); */

    if (isPlatformBrowser(this._platformId)) {
      this.logeduser = this.authService.getUser();
      this.logedname = this.authService.getUsername();
      this.isLoggedIn = this.authService.getToken();
      this.isUsertype = this.authService.getUserType();
    }

    this.searchbanner = this.formBuilder.group({
      keyword: ["", Validators.required],
      loc: ["", Validators.required],
      cate: ["", Validators.required],
    });

    this.wiz1Form = this.formBuilder.group({
      interest: ["", Validators.required],
      step1: ["", Validators.required],
      cate: ["", Validators.required],
      subcate: ["", Validators.required],
      subname: ["", Validators.required],
      sublname: ["", Validators.required],
      subemail: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      subphone: ["", [Validators.required, Validators.pattern(this.phonereg)]],
      enqs: [""],
    });

    if (this.isLoggedIn) {
      this.isLoggedIn = this.isLoggedIn;
    } else {
      this.isLoggedIn = "";
    }

    this.getcate();

  }




  onaddBuss() {
    if (isPlatformBrowser(this._platformId)) {
      window.localStorage.setItem("reUrl", "/add-business");
    }
    this.router.navigate(["/add-business"]);
  }

  onHomeSearch($event) {
    var form = this.searchbanner.value;
    var searchUrl =
      'search_keyword="' +
      form.keyword +
      '"&search_region="' +
      form.loc +
      '"&category="' +
      form.cate +
      '"';
    this.router.navigate(["/listings"], {
      queryParams: {
        search_keyword: form.keyword,
        search_region: form.loc,
        search_category: form.cate,
      },
    });
    //console.log(form);
  }

  getcate() {
    const cateurl = environment.apiUrl + "listings/categories";
    this.http.get(cateurl).subscribe((res: any) => {
      this.listCates = res.data;
    });
  }

  onSelect(pcate: string) {
    this.scateloader = "true";
    this.selectedCate = null;
    //console.log("changed." + pcate);
    const scateurl =
      environment.apiUrl + "listings/categories/subcategories/" + pcate;
    this.http.get(scateurl).subscribe((res: any) => {
      this.subCates = res.data;
      this.scateloader = "";
    });
  }

  onSub() {
    var fname = this.wiz1Form.get("subname").valid;
    var lname = this.wiz1Form.get("sublname").valid;
    var email = this.wiz1Form.get("subemail").valid;
    var phone = this.wiz1Form.get("subphone").valid;
    if (!fname) {
      this.suberr1 = "t";
    } else {
      this.suberr1 = "";
    }
    if (!lname) {
      this.suberr2 = "t";
    } else {
      this.suberr2 = "";
    }
    if (!email) {
      this.suberr3 = "t";
    } else {
      this.suberr3 = "";
    }
    if (!phone) {
      this.suberr4 = "t";
    } else {
      this.suberr4 = "";
    }

    var servselect = this.wiz1Form.get("step1").value;
    var selectcate = this.wiz1Form.get("cate").value;
    var selectsubcate = this.wiz1Form.get("subcate").value;
    var enq = this.wiz1Form.get("enqs").value;

    if (fname == true && lname == true && email == true && phone == true) {
      this.wizsubed = "t";
      this.http
        .post(this.wizUrl, {
          service_name: servselect,
          category_id: selectcate,
          sub_category_id: selectsubcate,
          first_name: this.wiz1Form.get("subname").value,
          last_name: this.wiz1Form.get("sublname").value,
          email: this.wiz1Form.get("subemail").value,
          mobile: this.wiz1Form.get("subphone").value,
          message: enq,
        })
        .subscribe(
          (res: any) => {
            this.wizsucc = "true";
            this.wizerr = "";
            this.wizsubed = "";
            this.step1 = false;
            this.step2 = false;
            this.step3 = false;
          },
          (msg: any) => {
            //console.log(msg);
            this.wizsucc = "";
            this.wizerr = "true";
            this.wizsubed = "";
          }
        );
    }
  }

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  step1err = "";
  step2err = "";
  step3err = "";
  wizcate = "";
  wizscate = "";

  step(index) {
    //alert(index);
    if (index == 1) {
      this.step1 = true;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      this.step1err = "";
      var chk = this.wiz1Form.get("step1").valid;
      if (chk == true) {
        this.step(index);
        this.step1err = "";
      } else {
        this.step1err = "true";
      }
    }

    if (index == 2) {
      this.step2 = true;
      this.step1 = false;
      this.step3 = false;
      this.step4 = false;

      var cateval = this.wiz1Form.get("cate").valid;
      var subcateval = this.wiz1Form.get("subcate").valid;
      /*  if (cateval == false) {
        this.wizcate = "t";
      } else {
        this.wizcate = "";
      }
      if (subcateval == false) {
        this.wizscate = "t";
      } else {
        this.wizscate = "";
      } */
    }

    if (index == 3) {
      this.step3 = true;
      this.step1 = false;
      this.step2 = false;
      this.step4 = false;
      this.step1err = "";
    }
  }

  cont(index) {
    // console.log("index" + index);
    if (index == 2) {
      var chk = this.wiz1Form.get("step1").valid;
      if (chk == true) {
        this.step(index);
        this.step1err = "";
      } else {
        this.step1err = "true";
      }
    }
    if (index == 3) {
      var cateval = this.wiz1Form.get("cate").valid;
      var subcateval = this.wiz1Form.get("subcate").valid;

      if (cateval == false) {
        this.wizcate = "t";
      } else {
        this.wizcate = "";
      }
      if (subcateval == false) {
        this.wizscate = "t";
      } else {
        this.wizcate = "";
      }

      if (cateval == true && subcateval == true) {
        this.step(index);
        this.wizcate = "";
        this.wizscate = "";
      }
    }
  }

  listingEnq = this.formBuilder.group({
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
    listingid: [""],
    enq_cont: ["", [Validators.required]],
  });

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

  webclicked(id) {
    /* var loged_user = this.authService.getUser();
    var logToken = this.authService.getToken(); */

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

  urlchange(url) {
    var ur = url.replace(/\s/g, "%20");
    return ur;
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
            content: this.seometa.metas.title,
          });
          this.meta.updateTag({
            name: "og:title",
            content: this.seometa.metas.title,
          });
          this.meta.updateTag({
            name: "og:image",
            content: 'https://walldirectory.com/assets/images/share.jpg',
          });
          this.meta.updateTag({
            name: "og:image:secure_url",
            content: 'https://walldirectory.com/assets/images/share.jpg',
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
        }
        if (this.seometa.metas.keywords) {
          this.meta.updateTag({
            name: "keywords",
            content: this.seometa.metas.keywords,
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
    link.setAttribute("href", "https://walldirectory.com");
  }
  /* SEO SETTINGS Close*/


}
