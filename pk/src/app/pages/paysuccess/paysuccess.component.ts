import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment.prod';

@Component({
  selector: 'app-paysuccess',
  templateUrl: './paysuccess.component.html',
  styleUrls: ['./paysuccess.component.css']
})
export class PaysuccessComponent implements OnInit {
 
  orderId: string;
  orderToken: string;
  servUrl: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get("id");
    
    this.route.queryParams.subscribe(params => {
      this.orderToken=params['token'];
    });

    if(this.orderId && this.orderToken){
      this.servUrl=environment.apiUrl+"orders/payment/complete";
      this.http
        .patch (this.servUrl, {
          order_id: this.orderId,
          token: this.orderToken
        }).subscribe(
          data => {
            console.log(data);
          },
          msg=>{
            console.log(msg);
          }
        );
    }

    localStorage.removeItem('package');
    localStorage.removeItem('reUrl');
    
  }

}
