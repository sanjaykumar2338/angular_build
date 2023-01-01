import { Component, OnInit, Inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../src/environments/environment.prod";
import { PageservService } from "../../../../src/app/services/pageserv.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-owners",
  templateUrl: "./owners.component.html",
  styleUrls: ["./owners.component.css"]
})
export class OwnersComponent implements OnInit {
  ownerUrl = environment.apiUrl + "listings/owners";
  owners: any;
  imgPath = environment.imgPath;
  siteUrl = environment.siteUrl;
  /*  public allItems: any[];
  pager: any = {};
  pagedItems: any[];
  lscounts: any;
  totpage: any; */

  lscounts: any;
  config: any;
  collection = [];
  tot: any;
  p: number = 1;

  enqUrl = environment.apiUrl + "listings/owners/send-email";
  ownerEnq: FormGroup;
  enqloader: any;
  succmsg: any;
  errormsg: any;
  getid: any;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/owners";
  seometa: any;

  listCates: any;
  searchUrl = environment.apiUrl + "listings/owners";
  ownerSearch: FormGroup;
  searchloader: any;
  results: any;
  mapUrl = "";
  getloc: object;
  latlong: any;
  latitude: any;
  longitude: any;

  constructor(
    private router: Router,
    private meta: Meta,
    private title: Title,
    private http: HttpClient,
    @Inject(DOCUMENT) private doc,
    private pagerService: PageservService,
    private fb: FormBuilder
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {
    this.getOwners();
    this.getvalid();
    this.getcate();
  }

  getOwners() {
    this.config = {
      currentPage: 1,
      itemsPerPage: 8
    };
    this.http.get(this.ownerUrl).subscribe(
      (res: any) => {
        this.collection = res.data;
        this.tot = res.count;
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }

  pageChange(newPage: number) {
    this.p = newPage; //page index change.

    var form = this.ownerSearch.value;
    var search_keyword = form.keywords ? form.keywords : "";
    var search_category = form.catename ? form.catename : "";
    var search_lat = this.latitude ? this.latitude : "";
    var search_lng = this.longitude ? this.longitude : "";

    this.http
      .get(
        this.ownerUrl +
          "?search_keyword=" +
          search_keyword +
          "&search_category=" +
          search_category +
          "&search_lat=" +
          search_lat +
          "&search_lng=" +
          search_lng +
          "&page=" +
          newPage
      )
      .subscribe(
        (res: any) => {
          this.collection = res.data;
          this.tot = res.count;

          window.scrollTo(0, 0);
        },
        (msg: any) => {
          console.log(msg);
        }
      );
  }

  /* setPage(page: number) {
    this.http.get(this.ownerUrl + "?page=" + page).subscribe(
      (res: any) => {
        this.owners = res.data;
        this.lscounts = res.count;
        this.totpage = res.pages;
      },
      (msg: any) => {
        console.log(msg);
      }
    );
    this.pager = this.pagerService.getPager(this.lscounts, page, 8);
    //this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    window.scrollTo(0, 0);
  }
 */

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

    this.ownerSearch = this.fb.group({
      keywords: [""],
      catename: [""],
      authorloc: [""]
    });
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

  getcate() {
    const cateurl = environment.apiUrl + "listings/categories";
    this.http.get(cateurl).subscribe((res: any) => {
      this.listCates = res.data;
    });
  }

  searchOwner() {
    this.searchloader = "t";
    var form = this.ownerSearch.value;
    var search_keyword = form.keywords ? form.keywords : "";
    var search_category = form.catename ? form.catename : "";
    var search_lat = this.latitude ? this.latitude : "";
    var search_lng = this.longitude ? this.longitude : "";
    this.http
      .get(
        this.searchUrl +
          "?search_category=" +
          search_category +
          "&search_keyword=" +
          search_keyword +
          "&search_lat=" +
          search_lat +
          "&search_lng=" +
          search_lng
      )
      .subscribe(
        (res: any) => {
          this.searchloader = "";
          this.collection = res.data;
          this.tot = res.count;

          window.scrollTo(0, 0);
        },
        (msg: any) => {
          this.searchloader = "";
          console.log(msg);
        }
      );
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
    link.setAttribute("href", this.seopath + "/owners");
  }
  /* SEO SETTINGS Close*/
}
