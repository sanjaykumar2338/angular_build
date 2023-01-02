import { Component, OnInit, Injector, Inject } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../src/environments/environment.prod";
import { PageservService } from "../../../../src/app/services/pageserv.service";
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { AuthService } from "../../auth/auth.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-tests",
  templateUrl: "./tests.component.html",
  styleUrls: ["./tests.component.css"]
})
export class TestsComponent implements OnInit {
  cateSlug = this.route.snapshot.paramMap.get("child");
  parentSlug = this.route.snapshot.paramMap.get("slug");
  listCates: any;
  listSubcates: any;
  listRegs: any;

  tap1: boolean = false;
  tap2: boolean = false;
  tap3: boolean = false;
  close_wiz: boolean = false;
  phonereg = /^-?(0|[1-9]\d*)?$/;
  errcate = "";
  errscate = "";
  errloc = "";
  errdetail = "";

  step1() {
    this.tap1 = true;
    this.tap2 = false;
    this.tap3 = false;
  }

  step2() {
    var servselect = this.cateForm.get("buss_scate").value;
    if (servselect) {
      this.tap2 = true;
      this.tap1 = false;
      this.tap3 = false;
      this.errscate = "";
    } else {
      this.errscate = "t";
    }
  }

  step3() {
    var selectedloc = this.cateForm.get("buss_loc").value;
    if (selectedloc) {
      this.tap3 = true;
      this.tap1 = false;
      this.tap2 = false;
      this.errloc = "";
    } else {
      this.errloc = "t";
    }
  }

  constructor(
    private meta: Meta,
    private title: Title,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private pagerService: PageservService,
    private authservice: AuthService,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}

  ngOnInit() {
    this.subcate("133");
    this.step1();
    this.getRegion();
  }

  subcate(cate: string) {
    const cateurl =
      environment.apiUrl + "listings/categories/subcategories/" + cate;
    this.http.get(cateurl).subscribe((res: any) => {
      this.listSubcates = res.data;
    });
  }

  getRegion() {
    const regurl = environment.apiUrl + "listings/regions";
    this.http.get(regurl).subscribe((res: any) => {
      this.listRegs = res.data;
    });
  }

  closewiz() {
    var overlay = document.querySelector("body");
    overlay.classList.toggle("hide-overlay");
    this.close_wiz = true;
  }
  close_form() {
    var overlay = document.querySelector("body");
    overlay.classList.remove("hide-overlay");
    this.close_wiz = false;
    this.tap1 = true;
    this.tap2 = false;
    this.tap3 = false;
  }
  cont_step() {
    var overlay = document.querySelector("body");
    overlay.classList.remove("hide-overlay");

    this.close_wiz = false;
  }

  cateForm = this.fb.group({
    buss_cate: ["", Validators.required],
    buss_scate: ["", Validators.required],
    buss_loc: ["", Validators.required],
    fname: ["", Validators.required],
    lname: ["", Validators.required],
    phone: ["", [Validators.required, Validators.pattern(this.phonereg)]],
    cateid: [""],
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

  send() {
    var frm_name = this.cateForm.get("fname").valid;
    var frm_lname = this.cateForm.get("lname").valid;
    var frm_email = this.cateForm.get("email").valid;
    var frm_phone = this.cateForm.get("phone").valid;
    var frm_msg = this.cateForm.get("msg").valid;

    console.log(
      "frm_name" +
        frm_name +
        "frm_lname" +
        frm_lname +
        "frm_email" +
        frm_email +
        "frm_phone" +
        frm_phone +
        "frm_msg" +
        frm_msg
    );
    if (
      frm_name == true &&
      frm_lname == true &&
      frm_email == true &&
      frm_phone == true &&
      frm_msg == true
    ) {
      this.tap3 = true;
      this.tap1 = false;
      this.tap2 = false;
      this.errdetail = "";
      alert("Thanks");
    } else {
      this.errdetail = "t";
    }
  }
}
