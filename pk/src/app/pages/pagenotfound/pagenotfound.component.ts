import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { HomeserviceService } from "../home/services/homeservice.service";
import { environment } from "../../../../src/environments/environment.prod";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-pagenotfound",
  templateUrl: "./pagenotfound.component.html",
  styleUrls: ["./pagenotfound.component.css"]
})
export class PagenotfoundComponent implements OnInit {
  logeduser = localStorage.getItem("logedUser");
  logToken = localStorage.getItem("token");
  enqsucc: any;
  enqerr: any;
  enqloader: any;
  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/page-not-found-404";
  seometa: any;
  newListingUrl = environment.apiUrl + "home/new-businesses";
  bussCont: any;
  imgPath = environment.imgPath;
  siteUrl = environment.siteUrl;

  constructor(
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private logedUser: AuthService,
    private router: Router,
    public homeserv: HomeserviceService,
    private meta: Meta,
    private title: Title,
    private http: HttpClient
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "googlebot",
      content: "noindex"
    });
  }

  ngOnInit() {
    this.getlisting();
    this.meta.addTags([{ name: "robots", content: "noindex" }]);
  }

  getlisting() {
    this.http.get(this.newListingUrl).subscribe((res: any) => {
      this.bussCont = res;
    });
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
