import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-invoicedetail",
  templateUrl: "./invoicedetail.component.html",
  styleUrls: ["./invoicedetail.component.css"],
  host: { class: "invoicedetail_page" }
})
export class InvoicedetailComponent implements OnInit {
  bid = this.route.snapshot.paramMap.get("id");
  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  billingUrl = environment.apiUrl + "orders/" + this.bid + "/invoice";
  billingdata: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http
      .get(this.billingUrl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.billingdata = res;
        },
        msg => {
          console.log(msg);
        }
      );
  }

  onPrint() {
    document.body.className += " " + "home";
    window.print();
  }
}
