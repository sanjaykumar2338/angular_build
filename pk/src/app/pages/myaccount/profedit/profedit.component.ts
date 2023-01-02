import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component({
  selector: "app-profedit",
  templateUrl: "./profedit.component.html",
  styleUrls: ["./profedit.component.css"]
})
export class ProfeditComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/my-profile";
  seometa: any;

  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  phonereg = /^[0-9][0-9]*([.][0-9]{2}|)$/;

  listcountry: any;
  listRegs: any;
  mobCodes: any;
  results: any;
  errormsg: any;
  successmsg: any;

  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  url = environment.apiUrl + "auth/" + this.logeduser + "/profile";
  fileData: File = null;
  profileForm: FormGroup;
  imgpath = environment.apiUrl;

  pfname: any;
  plname: any;
  pphone: any;
  pmobile: any;
  pmcd: any;
  pdob: any;
  pimg: any;
  pimg1: any;
  paddress: any;
  pstate: any;
  pcountry: any;
  data: any;
  profimg: any;

  facebook_url: any;
  twitter_url: any;
  pin_url: any;
  linked_url: any;
  snapchat_url: any;
  instagram_url: any;
  youtube_url: any;

  urlreg =
    "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";

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
      content: "noindex"
    });
    this.meta.updateTag({
      name: "googlebot",
      content: "noindex"
    });
  }

  async ngOnInit() {
    await this.getValidat();
    await this.getCountry();
    /* await this.getMobcode(); */
    await this.getRegion();
    await this.getProfile();
  }

  getValidat() {
    this.profileForm = this.fb.group({
      prof_fname: ["", Validators.required],
      prof_lname: ["", Validators.required],
      prof_pwd: ["", [Validators.minLength(6)]],
      prof_cpwd: ["", [Validators.minLength(6)]],
      prof_phone: [
        "",
        [Validators.required, Validators.pattern(this.phonereg)]
      ],
      prof_mobile: [
        "",
        [
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(this.mobilereg)
        ]
      ],
      prof_dob: [""],
      prof_img: [""],
      paddress: ["", Validators.required],
      state: ["", Validators.required],
      country: ["", Validators.required],
      facebook_url: ["", Validators.pattern(this.urlreg)],
      twitter_url: ["", Validators.pattern(this.urlreg)],
      pin_url: ["", Validators.pattern(this.urlreg)],
      linked_url: ["", Validators.pattern(this.urlreg)],
      instagram_url: ["", Validators.pattern(this.urlreg)],
      youtube_url: ["", Validators.pattern(this.urlreg)],
      snapchat_url: ["", Validators.pattern(this.urlreg)]
    });
  }

  getProfile() {
    this.http
      .get(this.url, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.data = res.data;

          this.pfname = this.data.first_name;
          this.plname = this.data.last_name;
          this.pphone = this.data.phone;
          this.pmobile = this.data.mobile ? this.data.mobile : "";
          this.pdob = this.data.dob;
          this.paddress = this.data.address ? this.data.address : "";
          this.pstate = this.data.state ? this.data.state : "";
          this.pcountry = this.data.country ? this.data.country : "";
          this.pimg = this.data.userimage ? this.data.userimage : "";

          this.facebook_url = this.data.facebook_url
            ? this.data.facebook_url
            : "";
          this.twitter_url = this.data.twitter_url ? this.data.twitter_url : "";
          this.pin_url = this.data.pintrest_url ? this.data.pintrest_url : "";
          this.linked_url = this.data.linkedin_url
            ? this.data.linkedin_url
            : "";
          this.instagram_url = this.data.instagram_url
            ? this.data.instagram_url
            : "";
          this.youtube_url = this.data.youtube_url ? this.data.youtube_url : "";
          this.snapchat_url = this.data.snapchat ? this.data.snapchat : "";

          //console.log("--img-"+this.data.userimage.medium);

          this.profileForm.patchValue({
            prof_fname: this.data.first_name,
            prof_lname: this.data.last_name,
            prof_phone: this.data.phone,
            prof_mobile: this.data.mobile ? this.data.mobile : "",
            prof_dob: this.data.dob,
            paddress: this.data.address,
            state: this.data.state ? this.data.state : "",
            country: this.data.country ? this.data.country : "",

            facebook_url: this.data.facebook_url ? this.data.facebook_url : "",
            twitter_url: this.data.twitter_url ? this.data.twitter_url : "",
            pin_url: this.data.pintrest_url ? this.data.pintrest_url : "",
            linked_url: this.data.linkedin_url ? this.data.linkedin_url : "",
            snapchat_url: this.data.snapchat ? this.data.snapchat : "",
            instagram_url: this.data.instagram_url
              ? this.data.instagram_url
              : "",
            youtube_url: this.data.youtube_url ? this.data.youtube_url : ""
          });
        },
        msg => {
          console.log(msg);
        }
      );
  }

  /*  getMobcode() {
    const url = environment.apiUrl + "listings/mobileprefix";
    this.http.get(url).subscribe((res: any) => {
      this.mobCodes = res;
    });
  } */

  getRegion() {
    const url = environment.apiUrl + "listings/regions";
    this.http.get(url).subscribe((res: any) => {
      this.listRegs = res.data;
    });
  }

  getCountry() {
    const url = environment.apiUrl + "auth/countries";
    this.http.get(url).subscribe((res: any) => {
      this.listcountry = res.data;
    });
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

  imgUpload(event) {
    const imgUrl = environment.apiUrl + "upload/single";
    var form = this.profileForm.value;
    const file = event.target.files[0];
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", file);
      this.http.post(imgUrl, formData).subscribe(
        (res: any) => {
          this.profimg = res.id;
          if (this.profimg) {
            this.pimg1 = environment.apiUrl + res.small;
            this.pimg = "";
          }
        },
        msg => {
          console.log(msg);
        }
      );
    }
  }

  dateselected() {
    this.profileForm.get("prof_dob").touched;
    console.log("re");
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profimg);
      var form = this.profileForm.value;
      console.log(form);
      var editUrl = environment.apiUrl + "auth/editprofile/" + this.logeduser;
      this.http
        .post(
          editUrl,
          {
            first_name: form.prof_fname,
            last_name: form.prof_lname,
            password: form.prof_cpwd,
            avatar_url: this.profimg,
            phone: form.prof_phone,
            mobile: form.prof_mobile,
            dob: form.prof_dob,
            address: form.paddress,
            state: form.state,
            country: form.country,
            facebook_url: form.facebook_url,
            twitter_url: form.twitter_url,
            instagram_url: form.instagram_url,
            linkedin_url: form.linked_url,
            pintrest_url: form.pin_url,
            youtube_url: form.youtube_url,
            snapchat: form.snapchat_url
          },
          { headers: new HttpHeaders().set("Authorization", this.Auth_Token) }
        )
        .subscribe(
          data => {
            console.log(data);
            this.successmsg = data;
            // this.profileForm.reset();
            window.location.href = environment.siteUrl + "my-profile";
          },
          msg => {
            console.log(msg);
            this.results = msg.error;
            this.errormsg = msg["error"].error;
          }
        );
    } else {
      this.validateAllFormFields(this.profileForm);
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
