import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import { environment } from "../../../../environments/environment.prod";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-addpromo",
  templateUrl: "./addpromo.component.html",
  styleUrls: ["./addpromo.component.css"]
})
export class AddpromoComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/add-promotion";
  seometa: any;
  loading: any;
  sitepath = environment.sitepath;

  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  planurl =
    environment.apiUrl + "auth/profile/" + this.logeduser + "/RemainingListing";

  // urlreg = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
  urlreg =
    "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";

  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  phonereg = /^[0-9][0-9]*([.][0-9]{2}|)$/;
  promo_url: any;
  listCates: any;
  selectedCate: any;
  subCates: any;
  listRegs: any;

  mobCodes: any;
  results: any;
  errormsg: any;
  successmsg: any;
  typelist: any;

  logo: any;
  fimg: any;
  cimg: any;
  cthumb: any;
  gallery: any;
  galleryid = [];
  galleryurls: any = [];

  userplan: any;
  allPromo: boolean = false;
  nullplan: any;
  planexp: boolean = false;
  nolisting: any;
  noPromo: boolean = false;

  mapUrl = "";
  latlong: any;
  latitude: any;
  longitude: any;

  stateloc: any;
  statelocsub: any;

  cateloader: any;
  promolabels: any;

  /*editor*/
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    width: "100%",
    minHeight: "5rem",
    placeholder: " Business Description. *",
    translate: "no",
    showToolbar: false,
    customClasses: [
      {
        name: "quote",
        class: "quote"
      },
      {
        name: "redText",
        class: "redText"
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1"
      }
    ]
  };
  /*------- */

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.setSeo();

    this.meta.updateTag({
      name: "robots",
      content: "noindex,noarchive"
    });
    this.meta.updateTag({
      name: "googlebot",
      content: "noindex"
    });
  }

  getpromoType(id) {
    const url = environment.apiUrl + "listings/type/promotions/" + id;
    this.http.get(url).subscribe((res: any) => {
      this.typelist = res.data;
    });
    document.getElementById("form-promo").scrollIntoView({
      behavior: "smooth"
    });
  }

  flag1: boolean = true;
  flag2: boolean = false;
  flag3: boolean = false;
  flag4: boolean = false;

  type1(event) {
    this.flag1 = true;
    this.flag2 = false;
    this.flag3 = false;
    this.flag4 = false;

    var cateid = event.target.getAttribute("data-promo");
    this.getpromoType(cateid);
  }

  type2(event) {
    this.flag2 = true;
    this.flag1 = false;
    this.flag3 = false;
    this.flag4 = false;
    var cateid = event.target.getAttribute("data-promo");
    this.getpromoType(cateid);
  }

  type3(event) {
    this.flag3 = true;
    this.flag1 = false;
    this.flag2 = false;
    this.flag4 = false;
    var cateid = event.target.getAttribute("data-promo");
    this.getpromoType(cateid);
  }

  type4(event) {
    this.flag4 = true;
    this.flag1 = false;
    this.flag2 = false;
    this.flag3 = false;
    var cateid = event.target.getAttribute("data-promo");
    this.getpromoType(cateid);
  }

  getcate() {
    const url = environment.apiUrl + "listings/categories";
    this.http.get(url).subscribe((res: any) => {
      this.listCates = res.data;
    });
  }

  getRegion() {
    const url = environment.apiUrl + "listings/regions";
    this.http.get(url).subscribe((res: any) => {
      this.listRegs = res.data;
    });
  }

  getlabels() {
    const tagurl = environment.apiUrl + "listings/promobadges/all";
    this.http.get(tagurl).subscribe((res: any) => {
      this.promolabels = res;
    });
  }

  getMobcode() {
    const url = environment.apiUrl + "listings/mobileprefix";
    this.http.get(url).subscribe(res => {
      this.mobCodes = res;
    });
  }

  onLoc(selectloc: string) {
    var currentplan = this.userplan.plan.plan_id;
    if (selectloc == "992" && currentplan == 766) {
      this.stateloc = selectloc;
      setTimeout(() => {
        this.stateloc = "";
      }, 3000);
    } else {
      this.stateloc = "";
      console.log("true paid plan");
    }
  }

  onSelect(pcate: string) {
    this.cateloader = "t";
    this.selectedCate = null;
    const url =
      environment.apiUrl + "listings/categories/subcategories/" + pcate;
    this.http.get(url).subscribe((res: any) => {
      this.subCates = res.data;
      this.addpromo.get("promo_scate").setValue("");
      this.cateloader = "";
    });
    this.addpromo.get("promo_scate").setValue("");
  }

  mobilecode(addpromo: FormGroup, error: string) {
    const mob = addpromo.controls.promo_mobile.value;
    const mobcode = addpromo.controls.promo_mob_cd.value;
    if (mob.value != "" && mobcode.value == "") {
      addpromo.controls.promo_mob_cd.untouched;
    }
    if (mob.value == "" && mobcode.value == "") {
      return true;
    } else {
      return true;
    }
  }

  locatadd = "";
  onKey(event: any) {
    this.locatadd = "";
    this.locatadd += event.target.value + " ";
    this.mapUrl =
      "https://dev.virtualearth.net/REST/v1/Locations/?key=AuaSnZtByiBVUQmxQWRpp5jYHU3do7fAQWIiLyhCkf41jeB68-oEvZdvNoqKSr48&query=" +
      event.target.value +
      "&userLocation=40.81209182739258,-74.1246566772461,%20400";
    this.http.get(this.mapUrl).subscribe(
      data => {
        this.locatadd = data["resourceSets"][0]["resources"];
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

  addpromo = this.fb.group({
    promo_name: ["", Validators.required],
    promo_type: ["", Validators.required],
    promo_cate: ["", Validators.required],
    promo_scate: ["", Validators.required],
    promo_loc: ["", Validators.required],
    promo_desc: ["", Validators.required],
    promo_add: ["", Validators.required],
    promo_url: ["", [Validators.required, Validators.pattern(this.urlreg)]],
    promolabel: ["", Validators.required],
    promo_email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    ],
    promo_phone: ["", [Validators.required, Validators.pattern(this.phonereg)]],
    promo_mobile: [
      "",
      [
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(this.mobilereg)
      ]
    ],

    promo_mob_cd: [""],
    promo_vurl: ["", Validators.pattern(this.urlreg)],
    promo_web: ["", [Validators.required, Validators.pattern(this.urlreg)]],
    promo_fb: ["", Validators.pattern(this.urlreg)],
    promo_yt: ["", Validators.pattern(this.urlreg)],
    promo_tw: ["", Validators.pattern(this.urlreg)],
    promo_inst: ["", Validators.pattern(this.urlreg)],
    promo_linked: ["", Validators.pattern(this.urlreg)],
    promo_pint: ["", Validators.pattern(this.urlreg)],
    promo_logo: ["", Validators.required],
    promo_cimg: [""],
    promo_gall: [""],
    map: [""],
    term: ["", Validators.required],
    plan_id: [""],
    billing_id: [""]
  });

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

  ngOnInit() {
    this.getcate();
    this.getMobcode();
    this.getpromoType(1312);
    this.getRegion();
    this.getlabels();
    this.user_plan();
  }

  logoUpload(event) {
    const imgUrl = environment.apiUrl + "upload/single";
    var form = this.addpromo.value;
    const file = event.target.files[0];
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", file);
      this.http.post(imgUrl, formData).subscribe(
        res => {
          this.logo = res["id"];
          if (this.logo) {
            this.fimg = res["id"]["small"];
          }
        },
        msg => {
          console.log(msg);
        }
      );
    }
  }

  coverUpload(event) {
    const coverimgUrl = environment.apiUrl + "upload/single";
    var form = this.addpromo.value;
    const file = event.target.files[0];
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", file);
      this.http.post(coverimgUrl, formData).subscribe(
        res => {
          this.cimg = res["id"];
          if (this.cimg) {
            this.cthumb = res["id"]["small"];
          }
        },
        msg => {
          console.log(msg);
        }
      );
    }
  }

  galleryUpload(event) {
    const coverimgUrl = environment.apiUrl + "upload/multiple";
    const formData: any = new FormData();
    const files: Array<File> = <Array<File>>event.target.files;
    var array = "";
    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i], files[i]["name"]);
    }
    this.http.post(coverimgUrl, formData).subscribe(
      res => {
        this.results = JSON.stringify(res);
        JSON.parse(this.results, (key, value) => {
          if (key === "id") {
            this.galleryid.push(value);
          }
        });
        console.log("ary-" + this.galleryid);
      },
      msg => {
        console.log(msg);
      }
    );
  }

  user_plan() {
    this.http
      .get(this.planurl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.userplan = res.data;

          this.addpromo.patchValue({
            plan_id: this.userplan.plan.plan_id,
            billing_id: this.userplan.plan.billing_id
          });

          if (this.userplan.plan.planstatus == "Active") {
            if (this.userplan.plan.TotalPromotion == -1) {
              this.allPromo = true;
              console.log("infinity promo");
            } else {
              if (
                this.userplan.promotion[0].PromotionCount <
                this.userplan.plan.TotalPromotion
              ) {
                this.allPromo = true;
                console.log("allow promo");
              } else {
                this.noPromo = true;
                console.log("no promo count");
              }
            }
          } else if (this.userplan.plan.planstatus == "Expired") {
            this.planexp = true;
            console.log("plan expired");
          }

          console.log("--" + this.allPromo);
        },
        (msg: any) => {
          const myObjStr = msg;
          this.nullplan = true;
          console.log(myObjStr["error"].error["message"]);
        }
      );
  }

  onSubmit() {
    var form = this.addpromo.value;
    if (form.promo_loc == "992" && form.plan_id == 766) {
      this.statelocsub = "1";
    } else {
      this.statelocsub = "";
      if (this.addpromo.valid) {
        if (this.selectedLoc == "" && this.locatclick == "") {
          alert("Location Not added. Try again");
          return false;
        } else {
          this.loading = "t";
          const addpromourl = environment.apiUrl + "listings/promotions";
          sessionStorage.setItem("addedEmail", form.promo_email);
          this.http
            .post(
              addpromourl,
              {
                user_id: this.logeduser,
                title: form.promo_name,
                content: form.promo_desc,
                region_id: form.promo_loc,
                location: this.locatclick,
                lat: this.latitude,
                lng: this.longitude,
                contact_email: form.promo_email,
                website: form.promo_web,
                promo_badge_id: form.promolabel,
                video_url: form.promo_vurl,
                phone: form.promo_phone,
                mobile: form.promo_mobile,
                mobileprefix: form.promo_mob_cd,
                logo: this.logo,
                featured_image_id: this.cimg,
                galleries: this.galleryid,
                type: form.promo_type,
                promotion_url: form.promo_url,
                facebook_url: form.promo_fb,
                twitter_url: form.promo_tw,
                youtube_url: form.promo_yt,
                instagram_url: form.promo_inst,
                linkedin_url: form.promo_linked,
                pinterest_url: form.promo_pint,
                mapview_url: form.map,
                category_id: form.promo_cate,
                subcate_id: form.promo_scate,
                plan_id: form.plan_id,
                billing_id: form.billing_id
              },
              {
                headers: new HttpHeaders().set("Authorization", this.Auth_Token)
              }
            )
            .subscribe(
              (res: any) => {
                console.log(res);
                this.successmsg = res.message;
                this.loading = "";

                this.addpromo.reset();
                window.location.href = this.sitepath + "/thankyou/" + res.data;
              },
              msg => {
                this.results = msg;
                this.results = msg.error;
                this.errormsg = msg["error"].error;
              }
            );
        }
      } else {
        this.validateAllFormFields(this.addpromo);
      }
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
  }
  /* SEO SETTINGS Close*/
}
