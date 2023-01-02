import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../../src/app/auth/auth.service";

import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
   yearlist: number[] = [];
  
  selectPack = "";
  packUrl = "";
  packdetail: any;
  results: any;
  errormsg: any;
  successmsg: any;
  freepacksuccess: any;
  sendmsg: boolean = false;
  checkoutForm: FormGroup;
  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  phonereg = /^[0-9][0-9]*([.][0-9]{2}|)$/;
  listcountry: any;
  listRegs: any;
  postUrl: any;
  pid: any;
  loading: any;
  paytype: any;
  ifRefferral: any;
  secretKey = "W@LLD!r@ct0rY";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService
  ) {
   
  }

  getpackDetail() {
    this.selectPack = localStorage.getItem("package");
    if (this.selectPack) {
      this.packUrl = environment.apiUrl + "plans/plans/" + this.selectPack;
      this.http.get(this.packUrl).subscribe(res => {
        this.packdetail = res;
        if (
          this.packdetail.id == "5640" ||
          this.packdetail.id == "5641" ||
          this.packdetail.id == "5132" ||
          this.packdetail.id == "5132"
        ) {
          this.paytype = "One Time";
        } else {
          this.paytype = "Month";
        }
      });
    }
  }

  ngOnInit() {

    let currentYear: number = new Date().getFullYear();
    
    for(let i = (currentYear); i < (currentYear +30); i++) {
        this.yearlist.push(i);
    }
    

    this.getpackDetail();
    this.getCountry();
    this.getRegion();

    const Auth_Token = localStorage.getItem("token");
    const logeduser = localStorage.getItem("logedUser");
    this.ifRefferral = this.authservice.getUserReferral();
    const url = environment.apiUrl + "auth/profile/" + logeduser;
/* console.log(Auth_Token); */
    /*   this.stripPayment(logeduser,Auth_Token); */

    this.checkoutForm = this.fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      phone: ["", [Validators.required, Validators.pattern(this.phonereg)]],
      company_name: ["", Validators.required],
      address1: ["", Validators.required],
      address2: [""],
      city: ["", Validators.required],
      postcode: ["", [Validators.required, Validators.pattern(this.phonereg)]],
      country: ["", Validators.required],
      state: ["", Validators.required],
      plan_id: [""],
      card_number:["",[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      exp_year:["",[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      exp_month:["",[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      cvc:["",[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
  }

  
  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      var form = this.checkoutForm.value;
      this.pid = localStorage.getItem("package");
      this.loading = "t";

      /* this.packUrl = environment.apiUrl + "orders/checkout"; */
      this.packUrl = environment.apiUrl + "orders/StripeCheckout";
      if (this.pid) {
        const Auth_Token = localStorage.getItem("token");
        const logeduser = localStorage.getItem("logedUser");
        this.http
          .post(
            this.packUrl,
            {
              first_name: form.first_name,
              last_name: form.last_name,
              email: form.email,
              phone: form.phone,
              address1: form.address1,
              city: form.city,
              state: form.state,
              country: form.country,
              postcode: form.postcode,
              user_id: logeduser,
              plan_id: this.selectPack,
              "card_number":this.encrypt(form.card_number),
              "exp_month": this.encrypt(form.exp_month),
              "exp_year": this.encrypt(form.exp_year),
              "cvc": this.encrypt(form.cvc)
            },
            { headers: new HttpHeaders().set("Authorization", Auth_Token) }
          )
          .subscribe(
            (res: any) => {

              this.http.post(environment.apiUrl+'orders/payment/stripecomplete', { 
                "order_id": res.order_id,
                "billingAgreement" : res.data
              },{ 
                headers: new HttpHeaders().set("Authorization", Auth_Token) }).subscribe((res2:any)=>{
                this.successmsg =res2.message;
                this.freepacksuccess = "";
                this.errormsg = "";
                if (this.successmsg) {
                  this.checkoutForm.reset();
                  setTimeout(function () {
                    window.location.href =environment.siteUrl+'payment-success/'+res.order_id; 
                  }, 1200);
                 
                }
              },  msg => {
                console.log(msg);
                this.sendmsg = false;
                this.successmsg='';
                this.freepacksuccess = "";
                this.results = msg.error;
                this.loading = "";
                this.errormsg = msg["error"].error;
              });
              
            },
            msg => {
              console.log(msg);
              this.sendmsg = false;
              this.successmsg='';
              this.freepacksuccess = "";
              this.results = msg.error;
              this.loading = "";
              this.errormsg = msg["error"].error;
            }
          );
      } else {
        this.loading = "";
        this.errormsg = "Missing Some Field / Try Again.";
      }
    } else {
      this.validateAllFormFields(this.checkoutForm);
    }
  }

  getRegion() {
    const url = environment.apiUrl + "listings/regions";
    this.http.get(url).subscribe((res: any) => {
      this.listRegs = res.data;
    });
  }

  getCountry() {
    const url = environment.apiUrl + "auth/countries";
    this.http.get(url).subscribe((res: any) => {
      this.listcountry = res.data;
    });
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

  /*
  stripPayment(logeduser, Auth_Token){
    this.http.post(environment.apiUrl+'orders/StripeCheckout',{
      first_name: 'test',
      last_name:'test',
      email: 'testsat@softalliancetech.com',
      phone: '1234567890',
      address1: 'test',
      city: 'test',
      state: '942',
      country: '1',
      postcode: '1231',
      user_id: 17356,
      plan_id: 766,
   
  
       "card_number":this.encrypt('4242424242424242'),
      "exp_month": this.encrypt('3'),
      "exp_year": this.encrypt('2024'),
      "cvc": this.encrypt('123') 
    },
    { headers: new HttpHeaders().set("Authorization", Auth_Token) }).subscribe((res: any) => {
      
       this.http.post(environment.apiUrl+'orders/payment/stripecomplete',
        { 
            "order_id": res.order_id,
            "billingAgreement" : res.data
        },{ headers: new HttpHeaders().set("Authorization", Auth_Token) }).subscribe((res2:any)=>{
          console.log('res'+res2);
        });
    });
   }*/


}
