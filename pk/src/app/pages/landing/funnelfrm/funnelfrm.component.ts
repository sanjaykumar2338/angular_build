import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../../../src/environments/environment.prod";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthService } from "../../../auth/auth.service";
import { PLATFORM_ID } from "@angular/core";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";

@Component({
  selector: "app-funnelfrm",
  templateUrl: "./funnelfrm.component.html",
  styleUrls: ["./funnelfrm.component.css"]
})
export class FunnelfrmComponent implements OnInit {
  index: number = 1;
  loading = false;
  promoForm: FormGroup;
  erromsg: any;

  urlreg =
    "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";

  novaildreg = /^[0-9][0-9]*([.][0-9]{2}|)$/;

  promoObjectives = [
    { id: 1312, text: "Drive traffic to website" },
    { id: 1313, text: "Connect with leads" },
    { id: 1314, text: "Sell products or services" },
    { id: 1315, text: "Improve business reputation" }
  ];

  /*  promoObjectives = [
    { id: 1312, text: "Display ads" },
    { id: 1313, text: "Target audience interests" },
    { id: 1314, text: "Reach interested audience" },
    { id: 1315, text: "Connect with customers" }
  ]; */
  nextClicked = false;
  promoTypes: any = [];
  promoCategories: any = [];
  promoSubCategories: any = [];
  states: any = [];
  file: File;
  selectedCate: any;
  subCates: any;
  imgupload: any;

  logeduser: any;
  auth_Token: any;
  logedemail: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}

  ngOnInit() {
    this.getCategory();
    this.getRegion();

    this.promoForm = this.fb.group({
      promo_objective: ["", Validators.required],
      promo_type: ["", Validators.required],
      title: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      subcategory: ["", Validators.required],
      promotion_url: [
        "",
        [Validators.required, Validators.pattern(this.urlreg)]
      ],
      company_website: [
        "",
        [Validators.required, Validators.pattern(this.urlreg)]
      ],
      region: ["", Validators.required],
      city: ["", Validators.required],
      address: ["", Validators.required],
      zip: ["", [Validators.required, Validators.pattern(this.novaildreg)]],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      phone: ["", [Validators.required, Validators.pattern(this.novaildreg)]],
      image: ["", Validators.required],
      imageInput: ["", Validators.required],
      lat: "",
      lng: ""
    });

    if (isPlatformBrowser(this._platformId)) {
      this.logeduser = this.authService.getUser();
      this.auth_Token = this.authService.getToken();
    }

    this.http
      .get(environment.apiUrl + "auth/" + this.logeduser + "/profile", {
        headers: new HttpHeaders().set("Authorization", this.auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.logedemail = res.data.email;
          this.promoForm.patchValue({
            email: this.logedemail
          });
        },
        (msg: any) => {
          console.log("+" + msg);
        }
      );
  }

  get f() {
    return this.promoForm.controls;
  }

  getCategory() {
    const cateurl = environment.apiUrl + "listings/categories";
    this.http.get(cateurl).subscribe((res: any) => {
      this.promoCategories = res.data;
    });
  }

  getSubcate(pcate: string) {
    this.selectedCate = null;
    // console.log('changed.'+pcate);
    const scateurl =
      environment.apiUrl + "listings/categories/subcategories/" + pcate;
    this.http.get(scateurl).subscribe((res: any) => {
      this.subCates = res.data;
    });
  }

  getpromoType(id) {
    const url = environment.apiUrl + "listings/type/promotions/" + id;
    this.http.get(url).subscribe((res: any) => {
      this.promoTypes = res.data;
    });
  }

  getRegion() {
    const url = environment.apiUrl + "listings/regions/";
    this.http.get(url).subscribe((res: any) => {
      this.states = res.data;
    });
  }

  setRegionName(event) {
    this.f["region"].patchValue(event.target.value);
  }

  onFileChange($event) {
    this.file = $event.target.files[0];
    const imgUrl = environment.apiUrl + "upload/single";

    if ($event.target.files.length > 0) {
      this.imgupload = "t";
      const formData = new FormData();
      formData.append("image", this.file);
      this.http.post(imgUrl, formData).subscribe(
        (res: any) => {
          //this.logo=res['id'];
          // console.log(res['id']+'-----');
          this.promoForm.patchValue({ image: res.id });
          this.loading = false;
          this.imgupload = "";
        },
        (msg: any) => {
          this.imgupload = "";
          if (msg.error.success == 0) {
            alert("File size too large (> 4 MB).");
          } else {
            console.log(msg);
          }
          this.loading = false;
        }
      );
    }
  }

  loadRegion(event) {
    let id = event.target.value;
    if (id) {
      this.http.get(environment.apiUrl + "/listings/regions/" + id).subscribe(
        (res: any) => {
          this.promoForm.patchValue({ lat: res.data.lat, lng: res.data.lng });
        },
        (msg: any) => {
          console.log(msg);
        }
      );
    }
  }

  nextStep(index) {
    this.nextClicked = true;

    this.getpromoType(this.f["promo_objective"].value);

    if (this.index == 1 && this.f["promo_objective"].valid) {
      // this.nextClicked = true;
      // this.loading = false;
      this.index = this.index + 1;
    } else if (this.index == 2 && this.f["promo_type"].valid) {
      this.index = this.index + 1;
    } else if (
      this.index == 3 &&
      (this.f["title"].valid &&
        this.f["company_website"].valid &&
        this.f["category"].valid &&
        this.f["subcategory"].valid &&
        this.f["description"].valid)
    ) {
      this.index = this.index + 1;
    } else if (
      this.index == 4 &&
      (this.f["region"].valid &&
        this.f["city"].valid &&
        this.f["address"].valid &&
        this.f["zip"].valid)
    ) {
      this.nextClicked = false;
      this.index = this.index + 1;
    } else if (
      this.index == 5 &&
      (this.f["first_name"].valid &&
        this.f["last_name"].valid &&
        this.f["email"].valid &&
        this.f["phone"].valid &&
        this.f["image"].valid)
    ) {
      this.nextClicked = false;
      this.loading = true;
      this.onSubmit();
    }
  }

  backStep(index) {
    if (this.index == 2) {
      this.f["promo_type"].setValue("");
    }
    this.index = this.index - 1;
  }

  onSubmit() {
    //console.log(this.promoForm.value+'---');/
    this.http
      .post(
        environment.apiUrl + "local-marketing/promotion/add",
        this.promoForm.value
      )
      .subscribe(
        (res: any) => {
          this.loading = false;
          console.log(res);
          this.index = this.index + 1;
        },
        (msg: any) => {
          console.log(msg);
          this.loading = false;
          this.erromsg = msg.error;
        }
      );
  }
}
