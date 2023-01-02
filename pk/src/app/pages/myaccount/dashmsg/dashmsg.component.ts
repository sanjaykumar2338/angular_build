import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Component({
  selector: "app-dashmsg",
  templateUrl: "./dashmsg.component.html",
  styleUrls: ["./dashmsg.component.css"]
})
export class DashmsgComponent implements OnInit {
  logeduser = localStorage.getItem("logedUser");
  Auth_Token = localStorage.getItem("token");
  nodiUrl = environment.apiUrl + "auth/" + this.logeduser + "/notifications";
  nodifyList: any;
  nodifyList_count: any;
  read_all =
    environment.apiUrl + "auth/" + this.logeduser + "/notifications/readall";

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  readall() {
    this.http
      .post(
        this.read_all,
        {},
        {
          headers: new HttpHeaders().set("Authorization", this.Auth_Token)
        }
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          //window.location.href = environment.siteUrl + "messages";
        },
        msg => {
          console.log(msg);
        }
      );
  }

  ngOnInit() {
    this.http
      .get(this.nodiUrl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.nodifyList = res.data;
          this.nodifyList_count = res.count;
          console.log(res);
        },
        (msg: any) => {
          console.log(msg);
        }
      );
  }
}
