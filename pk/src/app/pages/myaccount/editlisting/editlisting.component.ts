import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-editlisting",
  templateUrl: "./editlisting.component.html",
  styleUrls: ["./editlisting.component.css"]
})
export class EditlistingComponent implements OnInit {
  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  editId = this.route.snapshot.paramMap.get("id");
  getUrl = environment.apiUrl + "listings/listings/id/" + this.editId;
  imgPath = environment.imgPath;
  loading: any;
  sitepath = environment.sitepath;

  cateloader: any;
  editlist: FormGroup;
  listCates: any;
  selectedCate: any;
  subCates: any;
  listRegs: any;
  mobCodes: any;
  logo: any;
  fimg: any;
  cimg: any;
  cthumb: any;
  gallery: any;
  galleryurls: any = [];
  results: any;
  errormsg: any;
  successmsg: any;
  warningmsg: any;
  mapUrl = "";
  getloc: object;
  latlong: any;
  latitude: any;
  longitude: any;
  galluploaded: boolean;

  // urlreg = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
  urlreg =
    "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";

  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  phonereg = /^[0-9][0-9]*([.][0-9]{2}|)$/;

  post_name: any;
  post_cate: any;
  post_scate: any;
  post_loc: any;
  post_add: any;
  post_desc: any;
  post_email: any;
  post_phone: any;
  post_mob_cd: any;
  post_mobile: any;
  post_web: any;
  post_fb: any;
  post_yt: any;
  post_tw: any;
  post_inst: any;
  post_linked: any;
  post_pint: any;
  post_logo: any;
  post_cover: any;
  post_gall: any;
  post_vurl: any;
  post_map: any;
  curtype: boolean = false;
  plan_id: any;

  galleryid = [];

  stateloc: any;
  statelocsub: any;
  title_valid: any;
  title_valid2 = "";
  titlechecker: any;
  web_valid: any;
  web_valid2 = "";
  websitechecker: any;

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
  ) { }

  getcate() {
    const url = environment.apiUrl + "listings/categories";
    this.http.get(url).subscribe((res: any) => {
      this.listCates = res.data;
    });
  }

  getsubcate(sid) {
    if (this.post_scate) {
      const url =
        environment.apiUrl +
        "listings/categories/subcategories/" +
        this.post_scate;
      this.http.get(url).subscribe((res: any) => {
        this.subCates = res.data;
      });
    }
  }

  getRegion() {
    const url = environment.apiUrl + "listings/regions";
    this.http.get(url).subscribe((res: any) => {
      this.listRegs = res.data;
    });
  }

  onSelectload(pcate: string) {
    this.cateloader = "t";
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
      this.editlist.get("buss_scate").setValue("");
      this.cateloader = "";
    });
    this.editlist.get("buss_scate").setValue("");
  }

  /* getMobcode() {
    const url = environment.apiUrl + "listings/mobileprefix";
    this.http.get(url).subscribe((res: any) => {
      this.mobCodes = res;
    });
  } */

  mobilecode(addlist: FormGroup, error: string) {
    const mob = addlist.controls.buss_mobile.value;
    const mobcode = addlist.controls.buss_mob_cd.value;
    if (mob.value != "" && mobcode.value == "") {
      addlist.controls.buss_mob_cd.untouched;
    }
    if (mob.value == "" && mobcode.value == "") {
      return true;
    } else {
      return true;
    }
  }

  /* Title duplicate check only for listing not for promotions*/
  OnTitle(event) {
    this.titlechecker = "t";
    var listingname = this.editlist.get("buss_name").value;
    var typename = event.value;
    //console.log(listingname + "---");
    this.http
      .post(environment.apiUrl + "listings/listings/title/exist", {
        title: listingname.trim()
      })
      .subscribe(
        (res: any) => {
          //console.log(res);
          this.title_valid = "";
          this.title_valid2 = "";
          this.titlechecker = "";
        },
        (msg: any) => {
          if (listingname != "") {
            this.titlechecker = "";
            this.title_valid = "t";
            this.title_valid2 = "t";
          }
          console.log(msg.error.message);
        }
      );
  }

  OnWebsite(event) {
    this.websitechecker = "t";
    var websitelink = this.editlist.get("buss_web").value;
    var typename = event.value;
    this.http
      .post(environment.apiUrl + "listings/listings/website/exist", {
        website: websitelink
      })
      .subscribe(
        (res: any) => {
          //console.log(res);
          this.web_valid = "";
          this.web_valid2 = "";
          this.websitechecker = "";
        },
        (msg: any) => {
          if (websitelink != "") {
            this.websitechecker = "";
            this.web_valid = "t";
            this.web_valid2 = "t";
          }
          console.log(msg.error.message);
        }
      );
  }

  onLoc(selectloc: string) {
    var listingusedplan = this.editlist.get("plan_id").value;
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

  locatadd = "";
  onKey(event: any) {
    this.locatadd = "";
    this.locatadd += event.target.value + " ";
    this.mapUrl =
      "https://dev.virtualearth.net/REST/v1/Locations/?key=AuaSnZtByiBVUQmxQWRpp5jYHU3do7fAQWIiLyhCkf41jeB68-oEvZdvNoqKSr48&query=" +
      event.target.value +
      "&userLocation=40.81209182739258,-74.1246566772461,%20400";
    this.http.get(this.mapUrl).subscribe(
      (res: any) => {
        this.locatadd = res["resourceSets"][0]["resources"];
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

  logoUpload(event) {
    const imgUrl = environment.apiUrl + "upload/single";
    var form = this.editlist.value;
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
    var form = this.editlist.value;
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

  getValidat() {
    this.editlist = this.fb.group({
      buss_name: ["", Validators.required],
      buss_cate: ["", Validators.required],
      buss_scate: ["", Validators.required],
      buss_desc: ["", Validators.required],
      buss_loc: ["", Validators.required],
      buss_add: ["", Validators.required],

      buss_email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      buss_phone: [
        "",
        [Validators.required, Validators.pattern(this.phonereg)]
      ],
      buss_mobile: [
        "",
        [
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(this.mobilereg)
        ]
      ],
      buss_mob_cd: [""],
      buss_web: ["", [Validators.required, Validators.pattern(this.urlreg)]],
      map: [""],
      buss_add_selected: [""],
      buss_fb: ["", Validators.pattern(this.urlreg)],
      buss_yt: ["", Validators.pattern(this.urlreg)],
      buss_tw: ["", Validators.pattern(this.urlreg)],
      buss_inst: ["", Validators.pattern(this.urlreg)],
      buss_linked: ["", Validators.pattern(this.urlreg)],
      buss_pint: ["", Validators.pattern(this.urlreg)],
      buss_vurl: ["", Validators.pattern(this.urlreg)],
      buss_logo: [""],
      buss_cimg: [""],
      buss_gall: [""],
      plan_id: [""]
    });
  }

  getData() {
    this.http.get(this.getUrl).subscribe(
      (res: any) => {
        this.post_name = res.data["title"];
        this.post_cate = res.data["currentcategory"].category.parent;
        this.post_scate = res.data["currentcategory"].category_id;
        this.post_loc = res.data["listingregions"][0].region_id;
        this.post_add = res.data["location"];
        this.post_desc = res.data["content"];
        this.post_email = res.data["contact_email"];
        this.post_phone = res.data["phone"];
        this.post_mobile = res.data["mobile"];
        this.post_web = res.data["website"];
        this.post_fb = res.data["facebook_url"];
        this.post_yt = res.data["youtube_url"];
        this.post_tw = res.data["twitter_url"];
        this.post_inst = res.data["instagram_url"];
        this.post_linked = res.data["linkedin_url"];
        this.post_pint = res.data["pintrest_url"];
        this.post_logo = res.data["listinglogo"];
        this.post_cover = res.data["featuredImage"];
        this.post_gall = res.data["galleries"];
        this.post_vurl = res.data["video_url"];
        this.latlong = res.data["lat"];
        this.latitude = res.data["ng"];
        this.locatclick = res.data["location"];
        this.post_map = res.data["mapview_url"];
        this.plan_id = res.data.plan_id;
        /*res.data.status=='publish' && res.data.type_id=='696' */
        if (res.data.status == "publish" && res.data.type_id == "696") {
          this.curtype = true;
          console.log("test" + res.data.type_id);
        }

        /* Sub Category */
        this.onSelectload("" + this.post_cate);

        this.editlist.patchValue({
          buss_name: this.post_name,
          buss_cate: this.post_cate,
          buss_scate: this.post_scate,
          buss_loc: this.post_loc,
          buss_add: this.post_add,
          buss_desc: this.post_desc,
          buss_email: this.post_email,
          buss_phone: this.post_phone,
          buss_mobile: this.post_mobile,
          buss_web: this.post_web,
          buss_fb: this.post_fb,
          buss_yt: this.post_yt,
          buss_tw: this.post_tw,
          buss_inst: this.post_inst,
          buss_linked: this.post_linked,
          buss_pint: this.post_pint,
          buss_vurl: this.post_vurl,
          map: this.post_map,
          buss_add_selected: "",
          plan_id: this.plan_id,
          buss_logo: this.post_logo,
          buss_cimg: this.post_cover,
          buss_gall: this.post_gall
        });
      },
      msg => {
        console.log(msg);
      }
    );
  }

  ngOnInit() {
    this.getcate();
    this.getRegion();
    /* this.getMobcode(); */
    this.getValidat();
    this.getData();
  }

  onSubmit() {
    /*if initial value title,website and not duplicate both*/
    var etitlevalid = this.editlist.get("buss_name").untouched;
    var ewebvalid = this.editlist.get("buss_web").untouched;
    console.log(etitlevalid + "--" + ewebvalid);
    if (etitlevalid || this.title_valid2 == "") {
      this.title_valid = "";
    } else {
      this.title_valid = "t";
    }
    if (ewebvalid || this.web_valid2 == "") {
      this.web_valid = "";
    } else {
      this.web_valid = "t";
    }
    console.log(
      "title_valid-" + this.title_valid + " - title_valid2-" + this.title_valid2
    );
    console.log("ewebvalid-" + ewebvalid + " - web_valid2-" + this.web_valid2);
    /* close if initial value and dublicate check */

    var form = this.editlist.value;

    var listingusedplan = this.editlist.get("plan_id").value;
    var selectState = this.editlist.get("buss_loc").value;

    if (selectState == "992" && listingusedplan == "766") {
      this.statelocsub = "1";
    } else {
      this.statelocsub = "";
      if (this.editlist.invalid) {
        this.warningmsg = true;
      }
      if (
        this.editlist.valid &&
        this.title_valid == "" &&
        this.web_valid == ""
      ) {
        this.successmsg = false;
        this.errormsg = false;
        this.warningmsg = false;

        this.loading = "t";
        console.log("submitted");

        if (this.locatclick == "") {
          alert("Not Created, Something wrong.");
          return false;
        } else {
          const url = environment.apiUrl + "/listings/listings/" + this.editId;

          this.http
            .post(
              url,
              {
                title: form.buss_name,
                content: form.buss_desc,
                location: this.locatclick,
                contact_email: form.buss_email,
                website: form.buss_web,
                video_url: form.buss_vurl,
                phone: form.buss_phone,
                mobile: form.buss_mobile,
                mobileprefix: form.buss_mob_cd,
                logo: this.logo,
                featured_image_id: this.cimg,
                galleries: this.galleryid,
                type: "696",
                mapview_url: form.map,
                facebook_url: form.buss_fb,
                twitter_url: form.buss_tw,
                youtube_url: form.buss_yt,
                instagram_url: form.buss_inst,
                linkedin_url: form.buss_linked,
                pintrest_url: form.buss_pint,
                category_id: form.buss_cate,
                subcate_id: form.buss_scate,
                region_id: form.buss_loc,
                lat: this.latitude,
                lng: this.longitude
              },
              {
                headers: new HttpHeaders().set("Authorization", this.Auth_Token)
              }
            )
            .subscribe(
              (res: any) => {
                // console.log(res);
                this.loading = "";
                this.successmsg = res.data;
                setTimeout(() => {
                  this.successmsg = "";
                  window.location.href = this.sitepath + "/all-business";
                }, 1500);
                // this.editlist.reset();
              },
              msg => {
                this.results = msg;
                this.results = msg.error;
                this.errormsg = msg["error"].error;
              }
            );
        }
      } else {
        this.validateAllFormFields(this.editlist);
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
