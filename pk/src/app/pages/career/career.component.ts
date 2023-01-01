import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../src/environments/environment.prod";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";

@Component({
  selector: "app-career",
  templateUrl: "./career.component.html",
  styleUrls: ["./career.component.css"]
})
export class CareerComponent implements OnInit {
  careerForm: FormGroup;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/career";
  seometa: any;
  posturl = environment.apiUrl + "career";
  frmsuccess: any;
  frmerr: any;
  frmload: any;
  attname: any;
  attfile: any;
  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {
    this.validate();
  }

  validate() {
    this.careerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      phone: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(this.mobilereg)
        ]
      ],
      role: [""],
      position: [""],
      expre: [""],
      resume: [""]
    });
  }

  attach($event) {
    const imgUrl = environment.apiUrl + "career/upload-resume";
    var form = this.careerForm.value;
    const file = (<HTMLInputElement>event.target).files[0];

    const formData = new FormData();
    formData.append("file", file);
    this.http.post(imgUrl, formData).subscribe(
      (res: any) => {
        console.log(res);
        this.attname = res.filename;
        this.attfile = res.path;
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }

  onSubmit() {
    if (this.careerForm.valid) {
      var form = this.careerForm.value;
      this.frmload = "t";
      this.http
        .post(this.posturl, {
          first_name: form.firstName,
          last_name: form.lastName,
          mobile: form.phone,
          email: form.email,
          job_role: form.role,
          job_position: form.position,
          yearsofexperience: form.expre,
          file_name: this.attname,
          resume: this.attfile
        })
        .subscribe(
          (res: any) => {
            this.frmsuccess = res.message;
            this.frmerr = "";
            this.frmload = "";
            setTimeout(() => {
              this.frmsuccess = "";
              this.careerForm.reset();
            }, 3000);
          },
          (msg: any) => {
            this.frmerr = "t";
            this.frmsuccess = "";
            this.frmload = "";
            console.log(msg);
          }
        );
    } else {
      this.validateAllFormFields(this.careerForm);
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
    link.setAttribute("href", this.seopath + "/career");
  }
  /* SEO SETTINGS Close*/
}
