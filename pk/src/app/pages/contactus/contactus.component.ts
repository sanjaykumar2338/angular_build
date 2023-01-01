import { Component, OnInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { validateConfig } from "@angular/router/src/config";
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../src/environments/environment.prod";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-contactus",
  templateUrl: "./contactus.component.html",
  styleUrls: ["./contactus.component.css"]
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup;
  postUrl = environment.apiUrl + "contact-us";
  pagecontent: any;
  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  cloader: any;
  contsuccess: any;
  conterror: any;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/contact-us";
  seometa: any;

  constructor(
    private meta: Meta,
    private title: Title,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private doc
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {
    //this.getContent();

    this.contactForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      message: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      mobilenumber: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(this.mobilereg)
        ]
      ]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      var form = this.contactForm.value;
      this.cloader = "t";

      this.http
        .post(this.postUrl, {
          name: form.name,
          mobile: form.mobilenumber,
          email: form.email,
          message: form.message
        })
        .subscribe(
          (res: any) => {
            this.cloader = "";
            this.contsuccess = "t";
            this.conterror = "";
            setTimeout(() => {
              this.contsuccess = "";
              this.contactForm.reset();
            }, 3000);
            //console.log(res);
          },
          (msg: any) => {
            this.contsuccess = "";
            this.conterror = "t";
            console.log(msg);
          }
        );
    } else {
      this.validateAllFormFields(this.contactForm);
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

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute("href", this.seopath + "/contact-us");
  }
  /* SEO SETTINGS Close*/
}
