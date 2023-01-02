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
import { Router, ActivatedRoute } from "@angular/router";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-editpromo",
  templateUrl: "./editpromo.component.html",
  styleUrls: ["./editpromo.component.css"]
})
export class EditpromoComponent implements OnInit {
  editId = this.route.snapshot.paramMap.get("id");
  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  getData = environment.apiUrl + "listings/listings/id/" + this.editId;
  imgPath = environment.imgPath;
  loading: any;

  cateloader: any;
  label_list: any;
  sitepath = environment.sitepath;

  // urlreg = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
  urlreg =
    "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";

  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  phonereg = /^[0-9][0-9]*([.][0-9]{2}|)$/;
  listCates: any;
  selectedCate: any;
  subCates: any;
  listRegs: any;

  mobCodes: any;
  results: any;
  errormsg: any;
  successmsg: any;
  warningmsg: any;
  typelist: any;

  title: any;
  content: any;
  location: any;
  address: any;
  email: any;
  website: any;
  promo_badge_id: any;
  phone: any;
  mobile: any;
  mobileprefix: any;
  facebook_url: any;
  twitter_url: any;
  instagram_url: any;
  linkedin_url: any;
  pintrest_url: any;
  youtube_url: any;
  video_url: any;
  post_logo: any;
  post_cover: any;
  post_gall: any;
  cate: any;
  scate: any;
  region: any;
  ptype: any;
  status: any;
  post_map: any;
  plan_id: any;

  curtype: any;
  logo: any;
  fimg: any;
  cimg: any;
  cthumb: any;
  gallery: any;
  galleryid = [];
  galleryurls: any = [];
  promo_url: any;
  mapUrl = "";
  latlong: any;
  latitude: any;
  longitude: any;
  editpromo: FormGroup;

  stateloc: any;
  statelocsub: any;

  getpromoType(id) {
    const url = environment.apiUrl + "listings/type/promotions/" + id;
    this.http.get(url).subscribe((res: any) => {
      this.typelist = res.data;
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
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.getcate();
    this.getRegion();
    this.getValid();
    this.getPromoValue();
    this.getlabels();
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
      this.label_list = res;
    });
  }

  /*   getMobcode() {
    const url = environment.apiUrl + "listings/mobileprefix";
    this.http.get(url).subscribe(res => {
      this.mobCodes = res;
    });
  } */

  onLoc(selectloc: string) {
    var listingusedplan = this.editpromo.get("plan_id").value;
    /* console.log(listingusedplan + "-" + selectloc); */
    if (selectloc == "992" && listingusedplan == 766) {
      this.stateloc = selectloc;
      setTimeout(() => {
        this.stateloc = "";
      }, 3000);
    } else {
      this.stateloc = "";
      console.log("true paid plan");
    }
  }

  onSelectload(pcate: string) {
    this.selectedCate = null;
    const url =
      environment.apiUrl + "listings/categories/subcategories/" + pcate;
    this.http.get(url).subscribe((res: any) => {
      this.subCates = res.data;
      this.cateloader = "";
    });
  }

  onSelect(pcate: string) {
    this.cateloader = "t";
    this.selectedCate = null;
    const url =
      environment.apiUrl + "listings/categories/subcategories/" + pcate;
    this.http.get(url).subscribe((res: any) => {
      this.subCates = res.data;
      this.editpromo.get("promo_scate").setValue("");
      this.cateloader = "";
    });
    this.editpromo.get("promo_scate").setValue("");
  }

  /* mobilecode(addpromo: FormGroup, error: string) {
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
  } */

  logoUpload(event) {
    const imgUrl = environment.apiUrl + "upload/single";
    var form = this.editpromo.value;
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
    var form = this.editpromo.value;
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

  getValid() {
    this.editpromo = this.fb.group({
      promo_name: ["", Validators.required],
      promo_type: ["", Validators.required],
      promo_cate: ["", Validators.required],
      promo_scate: ["", Validators.required],
      promo_loc: ["", Validators.required],
      promo_adds: ["", Validators.required],
      promo_add_selected: [""],
      promo_desc: ["", Validators.required],
      promo_url: ["", [Validators.required, Validators.pattern(this.urlreg)]],
      promo_email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      promo_phone: [
        "",
        [Validators.required, Validators.pattern(this.phonereg)]
      ],
      promo_mobile: [
        "",
        [
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(this.mobilereg)
        ]
      ],

      promo_web: ["", [Validators.required, Validators.pattern(this.urlreg)]],
      promolabel: ["", Validators.required],
      video_url: ["", Validators.pattern(this.urlreg)],
      promo_fb: ["", Validators.pattern(this.urlreg)],
      promo_yt: ["", Validators.pattern(this.urlreg)],
      promo_tw: ["", Validators.pattern(this.urlreg)],
      promo_inst: ["", Validators.pattern(this.urlreg)],
      promo_linked: ["", Validators.pattern(this.urlreg)],
      promo_pint: ["", Validators.pattern(this.urlreg)],
      promo_logo: [""],
      promo_cimg: [""],
      promo_gall: [""],
      map: [""],
      plan_id: [""]
    });
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

  getPromoValue() {
    this.http.get(this.getData).subscribe((res: any) => {
      this.results = res.data;
      this.title = this.results.title;
      this.content = this.results.content;
      this.address = this.results.location;
      this.locatclick = this.results.location;
      this.locatclick = this.results.location;
      this.email = this.results.contact_email;
      this.website = this.results.website;
      this.phone = this.results.phone;
      this.mobile = this.results.mobile;
      this.promo_url = this.results.promotion_url;
      this.mobileprefix = this.results.mobileprefix;
      this.facebook_url = this.results.facebook_url;
      this.twitter_url = this.results.twitter_url;
      this.instagram_url = this.results.instagram_url;
      this.linkedin_url = this.results.linkedin_url;
      this.pintrest_url = this.results.pintrest_url;
      this.youtube_url = this.results.youtube_url;
      this.video_url = this.results.video_url;
      this.post_logo = this.results.listinglogo;
      this.post_cover = this.results.featuredImage;
      this.post_gall = this.results.galleries;
      this.cate = this.results.currentcategory.category.parent;
      this.scate = this.results.currentcategory.category_id;
      this.region = this.results.listingregions[0].region_id;
      this.ptype = this.results.type.parent;
      this.status = this.results.status;
      this.post_map = this.results.mapview_url;
      this.plan_id = this.results.plan_id;
      this.promo_badge_id = this.results.promo_badge
        ? this.results.promo_badge.id
        : "";

      /*Disable direct edit listing id from url access */
      if (this.results.status == "publish") {
        this.curtype = "t";
        console.log("1");
      } else {
        this.curtype = "";
        console.log("0");
      }

      /* Promo Type */
      this.getpromoType(this.ptype);

      /*Active tab*/
      if (this.ptype == 1312) {
        this.flag1 = true;
        this.flag2 = false;
        this.flag3 = false;
        this.flag4 = false;
      }
      if (this.ptype == 1313) {
        this.flag2 = true;
        this.flag1 = false;
        this.flag3 = false;
        this.flag4 = false;
      }
      if (this.ptype == 1314) {
        this.flag3 = true;
        this.flag1 = false;
        this.flag2 = false;
        this.flag4 = false;
      }
      if (this.ptype == 1315) {
        this.flag4 = true;
        this.flag1 = false;
        this.flag2 = false;
        this.flag3 = false;
      }

      /* Sub Category */
      this.onSelectload(this.cate);

      this.editpromo.patchValue({
        promo_name: this.title,
        promo_type: this.results.type.id,
        promo_cate: this.cate,
        promo_scate: this.scate,
        promo_loc: this.region,
        promo_desc: this.content,
        promo_email: this.email,
        promo_phone: this.phone,
        promo_mobile: this.mobile,
        promo_adds: this.address,
        promo_url: this.promo_url,
        promo_web: this.website,
        promolabel: this.promo_badge_id,
        promo_fb: this.facebook_url,
        promo_yt: this.youtube_url,
        promo_tw: this.twitter_url,
        promo_inst: this.instagram_url,
        promo_linked: this.linkedin_url,
        promo_pint: this.pintrest_url,
        video_url: this.video_url,
        map: this.post_map,
        plan_id: this.plan_id,
        promo_logo: this.post_logo,
        promo_cimg: this.post_cover,
        promo_gall: this.post_gall
      });
    });
  }

  onSubmit() {
    var form = this.editpromo.value;

    var listingusedplan = form.plan_id;
    var selectState = form.promo_loc;

    //console.log(listingusedplan + "-" + selectState);
    if (selectState == "992" && listingusedplan == "766") {
      this.statelocsub = "1";
    } else {
      this.statelocsub = "";

      if (this.editpromo.invalid) {
        this.warningmsg = true;
      }

      if (this.editpromo.valid) {
        this.successmsg = false;
        this.errormsg = false;
        this.warningmsg = false;

        this.loading = "t";

        //console.log("submitted");
        const url = environment.apiUrl + "listings/promotions/" + this.editId;
        console.log(this.galleryid + "galids");

        this.http
          .post(
            url,
            {
              title: form.promo_name,
              content: form.promo_desc,
              contact_email: form.promo_email,
              location: this.locatclick,
              lat: this.latitude,
              lng: this.longitude,
              website: form.promo_web,
              promo_badge_id: form.promolabel,
              video_url: form.video_url,
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
              pintrest_url: form.promo_pint,
              mapview_url: form.map,
              category_id: form.promo_cate,
              subcate_id: form.promo_scate,
              region_id: form.promo_loc
            },
            {
              headers: new HttpHeaders().set("Authorization", this.Auth_Token)
            }
          )
          .subscribe(
            (res: any) => {
              console.log(res);
              this.successmsg = res.data;
              setTimeout(() => {
                this.successmsg = "";
                this.loading = "";
                window.location.href = this.sitepath + "/all-business";
              }, 1500);
              this.editpromo.reset();
            },
            msg => {
              console.log(msg);
              this.results = msg;
              this.results = msg.error;
              this.errormsg = msg["error"].error;
            }
          );
      } else {
        this.validateAllFormFields(this.editpromo);
      }
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
}
