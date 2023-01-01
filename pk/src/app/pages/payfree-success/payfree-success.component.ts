import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../src/environments/environment.prod";

@Component({
  selector: "app-payfree-success",
  templateUrl: "./payfree-success.component.html",
  styleUrls: ["./payfree-success.component.css"]
})
export class PayfreeSuccessComponent implements OnInit {
  orderId: any;
  servUrl: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get("id");
    if (this.orderId) {
      /* this.servUrl = environment.apiUrl + "/orders/payment/complete";
      this.http
        .patch(this.servUrl, {
          order_id: this.orderId,
          token: ""
        })
        .subscribe(
          data => {
            console.log(data);
          },
          msg => {
            console.log(msg);
          }
        ); */
    }

    localStorage.removeItem("package");
    localStorage.removeItem("reUrl");
  }
}
