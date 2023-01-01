import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import { environment } from "../../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";

@Component({
  selector: "app-statelanding",
  templateUrl: "./statelanding.component.html",
  styleUrls: ["./statelanding.component.css"]
})
export class StatelandingComponent implements OnInit {
  statename = this.route.snapshot.paramMap.get("state");

  stateownerUrl =
    environment.apiUrl + "listings/owners/region/" + this.statename;
  landingimgpath = environment.apiUrl;

  nameofloc: any;
  owner: any;
  imgPath = environment.imgPath;
  siteUrl = environment.siteUrl;

  contentUrl = environment.apiUrl + "local-marketing/region/" + this.statename;
  pagecontent: any;

  enqUrl = environment.apiUrl + "listings/owners/send-email";
  ownerEnq: FormGroup;
  enqloader: any;
  succmsg: any;
  errormsg: any;
  getid: any;

  seopath = environment.sitepath;
  seourl = this.contentUrl;
  seometa: any;

  video_iframe: any;
  showVideoPlayer = false;
  thumbnail: any;
  hideblink: boolean = false;

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
    //this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {
    this.getvalid();
    this.getOwner();

    this.setSeo();

    /*  this.route.paramMap.subscribe(params => {
      console.log(params);
    }); */

    /**this.http.get(this.contentUrl).subscribe(
    (res: any) => { 
        this.nameofloc=res.name;
    }); */
  }

  getOwner() {
    this.http.get(this.stateownerUrl).subscribe(
      (res: any) => {
        this.owner = res;
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

  /* SEO SETTINGS */
  setSeo() {
    this.http.get(this.contentUrl).subscribe(
      (res: any) => {
        this.pagecontent = res;
        const vurl = "https://www.youtube.com/embed/" + res.video_url;
        this.video_iframe = this.sanitizer.bypassSecurityTrustResourceUrl(vurl);

        this.seometa = this.pagecontent.localMarketingMeta;
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

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute(
      "href",
      "https://walldirectory.com/local-marketing/" + this.statename
    );
  }
  /* SEO SETTINGS Close*/

  /* setSeo() {
    this.http.get(this.contentUrl).subscribe(
      (res: any) => {
        this.pagecontent = res;
        const vurl = "http://www.youtube.com/embed/" + res.video_url;
        this.video_iframe = this.sanitizer.bypassSecurityTrustResourceUrl(vurl);
        console.log(vurl + "--");

        this.title.setTitle(this.pagecontent.localMarketingMeta.title);
        this.meta.updateTag({
          name: "description",
          content: this.pagecontent.localMarketingMeta.description
        });
        this.meta.updateTag({
          name: "keywords",
          content: this.pagecontent.localMarketingMeta.keywords
        });

        this.meta.addTag({
          property: "og:description",
          content: this.pagecontent.localMarketingMeta.description
        });
        this.meta.addTag({ property: "og:url", content: this.router.url });

        this.meta.updateTag({
          name: "twitter:title",
          content: this.pagecontent.localMarketingMeta.description
        });
        this.meta.updateTag({
          name: "twitter:description",
          content: this.pagecontent.localMarketingMeta.keywords
        });
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  } */

  playVideo() {
    this.showVideoPlayer = true;
    this.hideblink = true;
  }
  scroll(id) {
    console.log("scrolling to" + id);
    let el = document.getElementById(id);
    el.scrollIntoView();
    window.scrollBy(0, -50);
  }
}
