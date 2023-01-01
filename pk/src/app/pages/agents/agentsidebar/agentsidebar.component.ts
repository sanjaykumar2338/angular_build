import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import * as $ from "jQuery";
import { LOCAL_STORAGE, WINDOW } from "@ng-toolkit/universal";

@Component({
  selector: "app-agentsidebar",
  templateUrl: "./agentsidebar.component.html",
  styleUrls: ["./agentsidebar.component.css"]
})
export class AgentsidebarComponent implements OnInit {
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
  prof = environment.apiUrl + "agent/" + this.logeduser + "/profile-percent";
  dropdown: boolean = false;
  hideModal: boolean = false;
  cusertype = "owner";
  procomplete: any;

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getProDetail();
    this.getProfComplete();
    this.userRole = this.localStorage.getItem("usertype");
    if (this.userRole != 3) {
      this.window.location.href = "/myaccount";
    }
    /* this.getReviewcount(); */

    this.http
      .get(this.prof, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.procomplete = res;
          console.log(res);
        },
        msg => {
          console.log(msg);
        }
      );
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
        console.log(res);
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
