import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import * as $ from "jQuery";
import { LOCAL_STORAGE, WINDOW } from "@ng-toolkit/universal";

@Component({
  selector: "app-dashmenu",
  templateUrl: "./dashmenu.component.html",
  styleUrls: ["./dashmenu.component.css"]
})
export class DashmenuComponent implements OnInit {
  Auth_Token = this.window.localStorage.getItem("token");
  logeduser = this.window.localStorage.getItem("logedUser");
  url = environment.apiUrl + "auth/" + this.logeduser + "/profile";
  profcount =
    environment.apiUrl + "auth/" + this.logeduser + "/profile-percent";
  userdet: any;
  proimg: boolean = false;
  profcomplet: any;
  imgPath = environment.imgPath;
  contreview =
    environment.apiUrl + "auth/" + this.logeduser + "/dashboard/counts";
  recounts: any;
  userRole: any;

  dropdown: boolean = false;
  hideModal: boolean = false;
  cusertype = "owner";

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getProDetail();
    this.getProfComplete();
    this.getReviewcount();
    this.userRole = this.localStorage.getItem("usertype");
    if (this.userRole == 3) {
      this.window.location.href = "/agent";
    }
  }

  ngAfterViewInit() {
    this.cusertype = this.localStorage.getItem("utype")
      ? this.localStorage.getItem("utype")
      : "owner";
    /* if (this.cusertype == "" || this.cusertype === null) {
      $(".apopup").click();
      $("#exampleModal").modal({
        backdrop: "static",
        keyboard: false
      });
    } */
  }

  usertype(type) {
    this.localStorage.removeItem("utype");
    this.localStorage.setItem("utype", type);
    this.cusertype = type;
    if (this.cusertype != "") {
      /* $("#exampleModal").hide();
      $(".modal-backdrop").hide(); */
      this.window.location.href = "/myaccount";
    }
  }

  showdrop() {
    this.dropdown = !this.dropdown;
  }

  getProDetail() {
    this.http
      .get(this.url, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe((res: any) => {
        this.userdet = res.data;
        if (res.data) {
          if (this.userdet.userimage.id != "") {
            this.proimg = true;
          }
        }
      });
  }

  getProfComplete() {
    this.http
      .get(this.profcount, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe((res: any) => {
        this.profcomplet = res;
        //console.log(this.profcomplet);
      });
  }

  getReviewcount() {
    this.http
      .get(this.contreview, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.recounts = res;
          //console.log(res);
        },
        (msg: any) => {
          console.log(msg);
        }
      );
  }
}
