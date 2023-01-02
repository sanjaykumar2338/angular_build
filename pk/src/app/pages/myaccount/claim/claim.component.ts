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
  selector: "app-claim",
  templateUrl: "./claim.component.html",
  styleUrls: ["./claim.component.css"]
})
export class ClaimComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/claim-your-business";
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

  claimForm: FormGroup;

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

  ngOnInit() {
    const Auth_Token = localStorage.getItem("token");
    const logeduser = localStorage.getItem("logedUser");
    const url = environment.apiUrl + "auth/profile/" + logeduser + "/listings";
    const formdata = environment.apiUrl + "auth/profile/" + logeduser;

    this.claimForm = this.fb.group({
      listname: ["", Validators.required],
      claim_fname: ["", Validators.required],
      claim_lname: ["", Validators.required],
      claim_cont: [
        "",
        [Validators.required, Validators.pattern(this.phonereg)]
      ],
      claim_email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      claim_msg: ["", Validators.required]
    });

    this.http
      .get(formdata, {
        headers: new HttpHeaders().set("Authorization", Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.prof_fname = res.data["first_name"];
          this.prof_lname = res.data["last_name"];
          this.prof_email = res.data["email"];

          this.claimForm.patchValue({
            claim_fname: this.prof_fname,
            claim_lname: this.prof_lname,
            claim_email: this.prof_email
          });
        },
        msg => {
          console.log(msg);
        }
      );

    this.http
      .get(url, { headers: new HttpHeaders().set("Authorization", Auth_Token) })
      .subscribe(
        (res: any) => {
          this.mylists = res.data;
        },
        msg => {
          console.log(msg);
        }
      );
  }

  /* getmyListing() {
    const Auth_Token = localStorage.getItem("token");
    const logeduser = localStorage.getItem("logedUser");
    const url = environment.apiUrl + "auth/profile/" + logeduser;

    this.http
      .get(url, { headers: new HttpHeaders().set("Authorization", Auth_Token) })
      .subscribe(
        (res: any) => {
          this.mylists = res.data["listings"];
          this.prof_fname = res.data["first_name"];
          this.prof_lname = res.data["last_name"];
          this.prof_email = res.data["email"];
        },
        msg => {
          console.log(msg);
        }
      );
  } */

  onSubmit() {
    if (this.claimForm.valid) {
      var form = this.claimForm.value;
      const url = environment.apiUrl + "listings/claimlistings";
      const Auth_Token = localStorage.getItem("token");
      const logeduser = localStorage.getItem("logedUser");

      this.http
        .post(
          url,
          {
            listing_id: form.listname,
            first_name: form.claim_fname,
            last_name: form.claim_lname,
            contact_no: form.claim_cont,
            email: form.claim_email,
            content: form.claim_msg
          },
          { headers: new HttpHeaders().set("Authorization", Auth_Token) }
        )
        .subscribe(
          data => {
            console.log(data);
            this.successmsg = data;
            this.claimForm.reset();
            setTimeout(function() {
              window.location.href =
                environment.siteUrl + "/claim-your-business";
            }, 3000);
          },
          msg => {
            this.results = msg;
            this.results = msg.error;
            this.errormsg = msg["error"].error;
          }
        );
    } else {
      this.validateAllFormFields(this.claimForm);
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
