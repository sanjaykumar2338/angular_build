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
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.css"]
})
export class VerifyComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/verify-your-business";
  seometa: any;

  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  phonereg = /^[0-9][0-9]*([.][0-9]{2}|)$/;
  mobCodes: any;
  results: any;
  errormsg: any;
  successmsg: any;

  mylists: any;
  prof_fname: any;
  prof_lname: any;
  prof_email: any;

  verifyForm: FormGroup;
  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  getListing = environment.apiUrl + "auth/profile/" + this.logeduser;
  verifyUrl = environment.apiUrl + "listings/verifylistings";

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
  }

  ngOnInit() {
    this.getValidat();
    this.getmyListing();
  }

  getValidat() {
    this.verifyForm = this.fb.group({
      listname: ["", Validators.required],
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      cont: ["", [Validators.required, Validators.pattern(this.phonereg)]],
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
  }

  getmyListing() {
    this.http
      .get(this.getListing, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.mylists = res.data["listings"];
          this.prof_fname = res.data["first_name"];
          this.prof_lname = res.data["last_name"];
          this.prof_email = res.data["email"];

          this.verifyForm.patchValue({
            fname: this.prof_fname,
            lname: this.prof_lname,
            email: this.prof_email
          });
        },
        msg => {
          console.log(msg);
        }
      );
  }

  onSubmit() {
    if (this.verifyForm.valid) {
      var form = this.verifyForm.value;

      this.http
        .post(
          this.verifyUrl,
          {
            listing_id: form.listname,
            first_name: form.fname,
            last_name: form.lname,
            contact_no: form.cont,
            email: form.email,
            content: form.msg
          },
          { headers: new HttpHeaders().set("Authorization", this.Auth_Token) }
        )
        .subscribe(
          data => {
            //console.log(data);
            this.successmsg = data;
            this.verifyForm.reset();
          },
          msg => {
            this.results = msg;
            this.results = msg.error;
            this.errormsg = msg["error"].error;
          }
        );
    } else {
      this.validateAllFormFields(this.verifyForm);
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
