import { Component, OnInit, Inject, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import { environment } from "../../../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";
import { landingcontents } from "../../audience/audiencecontents";
@Component({
  selector: "app-audiencecate",
  templateUrl: "./audiencecate.component.html",
  styleUrls: ["./audiencecate.component.css"]
})
export class AudiencecateComponent implements OnInit {
  catename = this.route.snapshot.paramMap.get("cate");
  content = landingcontents[this.catename];
  //contentUrl=environment.apiUrl+'listings/categories/sub-categories/auto/'+this.catename;
  contentUrl =
    environment.apiUrl + "listings/categories/sub-categories/" + this.catename;
  pagecontent: any;
  cateurl =
    environment.apiUrl + "listings/categories/sub-categories/" + this.catename;
  subcatels: any;
  siteUrl = environment.siteUrl;
  landingimgpath = environment.apiUrl;
  imgpath = environment.apiUrl;
  catedata: any;

  cateOwnerUrl =
    environment.apiUrl + "listings/owners/category/" + this.catename;
  ownerls: any;

  enqUrl = environment.apiUrl + "listings/owners/send-email";
  ownerEnq: FormGroup;
  enqloader: any;
  succmsg: any;
  errormsg: any;
  getid: any;

  seopath = environment.sitepath;
  seourl = environment.apiUrl + "listings/categories/slug/" + this.catename;
  seometa: any;

  twfeed: any;
  public twitterfeed = [
    { cate: "auto", id: "AutoWallDirect" },
    { cate: "education", id: "eduWallDirect" },
    { cate: "entertainment", id: "EntertainLocal" },
    { cate: "family", id: "FamilyCareWall" },
    { cate: "fashion", id: "StyleWallDirect" },
    { cate: "financial", id: "FinanceWall" },
    { cate: "food-drink", id: "FoodWallDirect" },
    { cate: "health-beauty", id: "HealthWallDirec" },
    { cate: "home-garden", id: "HomeWallDirect" },
    { cate: "insurance", id: "InsureWall" },
    { cate: "legal", id: "LegalWall" },
    { cate: "medical", id: "MedicalWall" },
    { cate: "technology", id: "TechWallDirect" },
    { cate: "travel", id: "TourWall" }
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private meta: Meta,
    private title: Title,
    public sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private doc
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {
    this.subcate();
    this.getOwner();
    this.getvalid();
    /* this.get_tw(); */
    this.twitterfeeds();
  }

  subcate() {
    this.http.get(this.cateurl).subscribe(
      (res: any) => {
        this.subcatels = res.data;
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }

  getOwner() {
    this.http.get(this.cateOwnerUrl).subscribe(
      (res: any) => {
        this.ownerls = res;
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }

  getvalid() {
    this.ownerEnq = this.fb.group({
      ownermsg: ["", Validators.required],
      ownerid: [""],
      owneremail: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ]
    });
  }

  ownid(id) {
    //console.log(id+'-');
    this.succmsg = "";
    this.errormsg = "";
    this.ownerEnq.patchValue({ ownerid: id, owneremail: "", ownermsg: "" });
  }

  onSubmitEnq() {
    if (this.ownerEnq.valid) {
      this.enqloader = "t";
      var form = this.ownerEnq.value;
      this.http
        .post(this.enqUrl, {
          email: form.owneremail,
          message: form.ownermsg,
          owner_id: form.ownerid
        })
        .subscribe(
          (res: any) => {
            this.succmsg = "t";
            this.errormsg = "";
            this.enqloader = "";
            setTimeout(() => {
              this.succmsg = "";
              this.ownerEnq.reset();
            }, 2000);
            console.log(res);
          },
          (msg: any) => {
            this.errormsg = "t";
            this.succmsg = "";
            this.enqloader = "";
            setTimeout(() => {
              this.errormsg = "";
            }, 2000);
            //console.log(msg);
          }
        );
    } else {
      this.validateAllFormFields(this.ownerEnq);
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

  /*   get_tw() {
    const gettwid = this.twitterfeed.find(twid => twid.cate === this.catename);
    if (gettwid) {
      this.twfeed = "loop";
    } else {
      this.twfeed = "";
    }
  } */

  scroll(id) {
    console.log("scrolling to" + id);
    let el = document.getElementById(id);
    el.scrollIntoView();
    window.scrollBy(0, -50);
  }

  twitterfeeds() {
    const tid = environment.twitterfeed + this.catename;
    this.http.get(tid).subscribe(
      (res: any) => {
        this.twfeed = res.data;
      },
      msg => {
        console.log(msg["error"].error);
      }
    );
  }

  /* SEO SETTINGS */
  setSeo() {
    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute(
      "href",
      "https://walldirectory.com/audience-interest/" + this.catename
    );

    this.http.get(this.seourl).subscribe(
      (res: any) => {
        this.catedata = res.data[0];
        //this.seometa = res.data[0];
        console.log(this.catedata.thumbnail);
        this.seometa = res.data[0].audienceinterestmeta;

        if (this.seometa.title) {
          this.title.setTitle(this.seometa.title);
          this.meta.updateTag({
            name: "twitter:title",
            content: this.seometa.title
          });
          this.meta.updateTag({
            name: "og:title",
            content: this.seometa.title
          });
        }

        this.meta.addTag({
          property: "og:url",
          content: this.seopath + "" + this.router.url
        });

        if (this.seometa.description) {
          this.meta.updateTag({
            name: "description",
            content: this.seometa.description
          });
          this.meta.addTag({
            property: "og:description",
            content: this.seometa.description
          });
          this.meta.updateTag({
            name: "twitter:description",
            content: this.seometa.description
          });
        }
        if (this.seometa.keywords) {
          this.meta.updateTag({
            name: "keywords",
            content: this.seometa.keywords
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
