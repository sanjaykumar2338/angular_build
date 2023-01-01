import { Component, OnInit, Injector, Inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup,
} from "@angular/forms";
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";
import { PageservService } from "../../../../src/app/services/pageserv.service";
import { Meta, Title } from "@angular/platform-browser";
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, isPlatformServer, DOCUMENT } from "@angular/common";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-ownerdetail",
  templateUrl: "./ownerdetail.component.html",
  styleUrls: ["./ownerdetail.component.css"],
})
export class OwnerdetailComponent implements OnInit {

  imgPath = environment.imgPath;
  seopath = environment.sitepath;
  /* seourl = environment.apiUrl + "listings/categories/slug/" + this.authorslug; */
  seourl = "/";
  seometa: any;
  siteUrl = environment.sitepath;
  authorslug = this.route.snapshot.paramMap.get("single");
  userprof = environment.apiUrl + "auth/" + this.authorslug;
  userdetail: any;
  title_c: any;
  crating: any;
  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  phonereg = /^[0-9][0-9]*([.][0-9]{2}|)$/;
  enqsucc: any;
  enqerr: any;
  enqloader: any;
  joinloader: any;
  totjoiner: any;
  noresult = "";


  logToken: any;
  isLoggedIn = "";
  logeduser: any;
  logedname: any;
  isUsertype: any;

  constructor(
    private meta: Meta,
    private title: Title,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private pagerService: PageservService,
    private authservice: AuthService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    @Inject(DOCUMENT) private doc
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow",
    });
  }

  async ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.logeduser = this.authservice.getUser();
      this.logedname = this.authservice.getUsername();
      this.isLoggedIn = this.authservice.getToken();
      this.isUsertype = this.authservice.getUserType();
    }


    this.http.get(this.userprof).subscribe(
      (res: any) => {
        this.userdetail = res.data[0];
        this.totjoiner = res.joiner;
        console.log(this.userdetail);
      },
      (msg: any) => {
        this.noresult = "t";
        console.log(msg.error.error);
      }
    );

  }

  truncateHTML(text: string): string {
    let charlimit = 220;
    if (!text || text.length <= charlimit) {
      return text;
    }

    let without_html = text.replace(/<(?:.|\n)*?>/gm, "");
    let shortened = without_html.substring(0, charlimit);
    return shortened + "...";
  }

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
            headers: new HttpHeaders().set("Authorization", this.logToken),
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

  onSubmitEnq() {
    if (this.listingEnq.valid) {
      this.enqloader = true;
      var form = this.listingEnq.value;
      //console.log(form);
      const postEnqUrl =
        environment.apiUrl + "listings/listings/" + form.listingid + "/enquiry";
      this.http
        .post(postEnqUrl, {
          listing_id: form.listingid,
          first_name: form.enq_fname,
          last_name: form.enq_lname,
          email: form.enq_email,
          phone: form.enq_phone,
          message: form.enq_cont,
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

  listingEnq = this.fb.group({
    enq_fname: ["", Validators.required],
    enq_lname: ["", Validators.required],
    enq_email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ],
    ],
    enq_phone: [
      "",
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(this.mobilereg),
      ],
    ],
    listingid: [""],
    enq_cont: ["", [Validators.required]],
  });

  pathcid(id) {
    /* console.log(id); */
    this.listingEnq.patchValue({
      listingid: id,
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
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

    this.http.get(this.userprof).subscribe(
      (res: any) => {
        if (res.data[0].first_name) {
          this.title_c = res.data[0].first_name + ' ' + res.data[0].last_name;
        } else {
          this.title_c = this.authorslug;
        }
      });

    this.title.setTitle(this.authorslug + " - Walldirectory Business Owner ");
    this.meta.updateTag({
      name: "twitter:title",
      content: this.authorslug + " - Walldirectory Business Owner ",
    });
    this.meta.updateTag({
      name: "og:title",
      content: this.authorslug + " - Walldirectory Business Owner ",
    });

    this.meta.updateTag({
      name: "description",
      content:
        "Walldirectory Business Owner " + this.authorslug + " #walldirectory",
    });
    this.meta.addTag({
      property: "og:description",
      content:
        "Walldirectory Business Owner " + this.authorslug + " #walldirectory",
    });
    this.meta.updateTag({
      name: "twitter:description",
      content:
        "Walldirectory Business Owner " + this.authorslug + " #walldirectory",
    });

    this.meta.updateTag({
      name: "keywords",
      content:
        this.authorslug +
        "| Walldirectory | Usa business website | online business advertising ",
    });

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute("href", this.seopath + "/author/" + this.authorslug);

    this.meta.updateTag({
      name: "robots",
      content: "index, follow",
    });
  }
  /* SEO SETTINGS Close*/
}
