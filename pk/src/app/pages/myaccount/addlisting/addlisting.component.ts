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
import { ListingService } from "./listing.service";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
//import 'rxjs/add/operator/map';
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-addlisting",
  templateUrl: "./addlisting.component.html",
  styleUrls: ["./addlisting.component.css"]
})
export class AddlistingComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/add-business";
  seometa: any;

  sitepath = environment.sitepath;
  starteractive = localStorage.getItem("starteractive");
  loading: any;
  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  planurl =
    environment.apiUrl + "auth/profile/" + this.logeduser + "/RemainingListing";
  listPosturl = environment.apiUrl + "listings/listings";

  // urlreg = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
  urlreg =
    "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";

  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  phonereg = /^[0-9][0-9]*([.][0-9]{2}|)$/;
  // phonereg = /(\d{3})(\d{3})(\d{4})/;
  galleryid = [];

  cateloader: any;
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
  mapUrl = "";
  getloc: object;
  latlong: any;
  latitude: any;
  longitude: any;
  galluploaded: boolean;

  userplan: any;
  allListing: any;
  nullplan: any;
  planexp: boolean = false;
  nolisting: any;
  nopromo: any;
  title_valid: any;
  stateloc: any;
  statelocsub: any;
  titlechecker: any;
  web_valid: any;
  websitechecker: any;

  /*editor*/
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    width: "100%",
    minHeight: "5rem",
    placeholder: " Business Description *",
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
    private fb: FormBuilder,
    private http: HttpClient,
    private listingservice: ListingService,
    private router: Router,
    private meta: Meta,
    private title: Title
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

  ngOnInit() {
    sessionStorage.removeItem("addedEmail");
    this.user_plan();
    this.getcate();
    this.getRegion();
    this.getMobcode();

    if (this.starteractive) {
      setTimeout(() => {
        this.starteractive = "";
        localStorage.removeItem("starteractive");
      }, 3000);
    }
  }

  user_plan() {
    this.http
      .get(this.planurl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.userplan = res.data;

          this.addlist.patchValue({
            plan_id: this.userplan.plan.plan_id,
            billing_id: this.userplan.plan.billing_id
          });

          /*        console.log('00-'+this.userplan.listing[0].ListingCount);
        console.log('01-'+this.userplan.promotion[0].PromotionCount);
        console.log('1-'+this.userplan.plan.TotalBusiness);
        console.log('2-'+this.userplan.plan.TotalPromotion);*/
          console.log(
            this.userplan.listing[0].ListingCount +
            "" +
            this.userplan.plan.TotalBusiness
          );

          if (this.userplan.plan.planstatus == "Active") {
            console.log("1--" + this.userplan.listing[0].ListingCount);
            console.log("plan count--" + this.userplan.plan.TotalBusiness);
            if (
              this.userplan.listing[0].ListingCount <
              this.userplan.plan.TotalBusiness
            ) {
              console.log("true");
              this.allListing = true;
            } else {
              console.log("false");
              this.allListing = false;
            }
          } else if (this.userplan.plan.planstatus == "Expired") {
            this.planexp = true;
          }
        },
        (msg: any) => {
          const myObjStr = msg;
          this.nullplan = true;
          console.log(myObjStr["error"].error["message"]);
        }
      );
  }

  getcate() {
    const cateurl = environment.apiUrl + "listings/categories";
    this.http.get(cateurl).subscribe((res: any) => {
      this.listCates = res.data;
    });
  }

  getRegion() {
    const regurl = environment.apiUrl + "listings/regions";
    this.http.get(regurl).subscribe((res: any) => {
      this.listRegs = res.data;
    });
  }

  getMobcode() {
    const moburl = environment.apiUrl + "listings/mobileprefix";
    this.http.get(moburl).subscribe(res => {
      this.mobCodes = res;
    });
  }

  onSelect(pcate: string) {
    this.cateloader = "t";
    this.selectedCate = null;
    // console.log('changed.'+pcate);
    const scateurl =
      environment.apiUrl + "listings/categories/subcategories/" + pcate;
    this.http.get(scateurl).subscribe((res: any) => {
      this.subCates = res.data;
      this.addlist.get("buss_scate").setValue("");
      this.cateloader = "";
    });
    this.addlist.get("buss_scate").setValue("");
  }

  /* Title duplicate check only for listing not for promotions*/
  OnTitle(event) {
    this.titlechecker = "t";
    var listingname = this.addlist.get("buss_name").value;
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
          this.titlechecker = "";
        },
        (msg: any) => {
          if (listingname != "") {
            this.titlechecker = "";
            this.title_valid = "t";
          }
          console.log(msg.error.message);
        }
      );
  }

  OnWebsite(event) {
    this.websitechecker = "t";
    var websitelink = this.addlist.get("buss_web").value;
    var typename = event.value;
    this.http
      .post(environment.apiUrl + "listings/listings/website/exist", {
        website: websitelink
      })
      .subscribe(
        (res: any) => {
          //console.log(res);
          this.web_valid = "";
          this.websitechecker = "";
        },
        (msg: any) => {
          if (websitelink != "") {
            this.websitechecker = "";
            this.web_valid = "t";
          }
          console.log(msg.error.message);
        }
      );
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

  addlist = this.fb.group({
    buss_name: ["", Validators.required],
    buss_cate: ["", Validators.required],
    buss_scate: ["", Validators.required],
    buss_desc: ["", Validators.required],
    buss_loc: ["", Validators.required],
    buss_add: ["", Validators.required],
    buss_add_selected: [""],
    buss_email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    ],
    buss_phone: ["", [Validators.required, Validators.pattern(this.phonereg)]],
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
    buss_fb: ["", Validators.pattern(this.urlreg)],
    buss_yt: ["", Validators.pattern(this.urlreg)],
    buss_tw: ["", Validators.pattern(this.urlreg)],
    buss_inst: ["", Validators.pattern(this.urlreg)],
    buss_linked: ["", Validators.pattern(this.urlreg)],
    buss_pint: ["", Validators.pattern(this.urlreg)],
    buss_vurl: ["", Validators.pattern(this.urlreg)],
    buss_logo: ["", Validators.required],
    buss_cimg: [""],
    buss_gall: [""],
    term: ["", Validators.required],
    plan_id: [""],
    billing_id: [""]
  });

  wiz1Form = this.fb.group({
    interest: ["", Validators.required]
  });

  logoUpload(event) {
    const imgUrl = environment.apiUrl + "upload/single";
    var form = this.addlist.value;
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
    var form = this.addlist.value;
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

  /*
  galleryUpload(event) {
    this.galluploaded= true;
    const coverimgUrl = environment.apiUrl+'/upload/single';
    var form = this.addlist.value;
    const file = event.target.files[0];
    var filesAmount = event.target.files.length;
    const formData: any = new FormData();
    var gall=[];

    for (let i = 0; i < filesAmount; i++) {
      
      this.cimg='';
      const formData = new FormData();
      formData.append('image', file);

this.http.post(coverimgUrl, formData)
      .subscribe((res:any) => {
        this.cimg=res.id;
       // console.log(i+'-'+this.cimg);
       gall.push(this.cimg);
       console.log('aleng-'+gall.length);

      },
      msg => {
         console.log(msg);
      })
      
    }

    console.log(gall.length);

    var uploadedImg =  this.galleryurls.length;
    console.log(this.galleryurls.length);
    if(filesAmount==uploadedImg){
     
        console.log(this.galleryurls.length+"--"+this.galleryurls);
    }
  }
 */

  galleryUpload(event) {
    const coverimgUrl = environment.apiUrl + "upload/multiple";
    const formData: any = new FormData();
    const files: Array<File> = <Array<File>>event.target.files;
    //console.log(files);
    var array = "";

    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i], files[i]["name"]);
    }
    //console.log('form data variable :   '+ formData);
    /**this.http.post(coverimgUrl, formData).map(res1=>
   console.log(res1[0]['id']))
      .subscribe(res => console.log('files', res)) */

    this.http.post(coverimgUrl, formData).subscribe(
      res => {
        //console.log('test'+JSON.stringify(res));
        this.results = JSON.stringify(res);
        JSON.parse(this.results, (key, value) => {
          if (key === "id") {
            // console.log(key+''+value);
            this.galleryid.push(value);
          }
          //return value;
        });
        console.log("ary-" + this.galleryid);
      },
      msg => {
        console.log(msg);
      }
    );
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

  onSubmit() {
    localStorage.removeItem("starteractive");

    var form = this.addlist.value;

    if (form.buss_loc == "992" && form.plan_id == 766) {
      this.statelocsub = "1";
    } else {
      this.statelocsub = "";
      if (
        this.addlist.valid &&
        this.title_valid == "" &&
        this.web_valid == ""
      ) {
        if (this.selectedLoc == "" && this.locatclick == "") {
          alert("Location Not added. Try again");
          return false;
        } else {
          this.loading = "t";

          sessionStorage.setItem("addedEmail", form.buss_email);

          this.http
            .post(
              this.listPosturl,
              {
                title: form.buss_name,
                content: form.buss_desc,
                location: this.locatclick,
                status: "pending",
                lat: this.latitude,
                lng: this.longitude,
                contact_email: form.buss_email,
                website: form.buss_web,
                video_url: form.buss_vurl,
                phone: form.buss_phone,
                mobile: form.buss_mobile,
                logo: this.logo,
                featured_image_id: this.cimg,
                galleries: this.galleryid,
                user_id: this.logeduser,
                facebook_url: form.buss_fb,
                twitter_url: form.buss_tw,
                youtube_url: form.buss_yt,
                instagram_url: form.buss_inst,
                linkedin_url: form.buss_linked,
                pintrest_url: form.buss_pint,
                mapview_url: form.map,
                type: "696",
                category_id: form.buss_cate,
                subcate_id: form.buss_scate,
                region_id: form.buss_loc,
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
                this.successmsg = res;
                this.loading = "";
                this.addlist.reset();
                window.location.href = this.sitepath + "/thankyou/" + res.data;
              },
              msg => {
                this.loading = "";
                this.results = msg;
                this.results = msg.error;
                this.errormsg = msg["error"].error;
              }
            );
        }
      } else {
        this.validateAllFormFields(this.addlist);
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
