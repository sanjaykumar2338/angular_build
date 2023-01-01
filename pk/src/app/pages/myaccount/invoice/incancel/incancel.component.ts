import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../../src/environments/environment.prod";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";

@Component({
  selector: 'app-incancel',
  templateUrl: './incancel.component.html',
  styleUrls: ['./incancel.component.css']
})
export class IncancelComponent implements OnInit {
  bid = this.route.snapshot.paramMap.get("id");
  cancel_sup: FormGroup;
  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  errormsg: any;
  successmsg: any;
  getValidat() {
    this.cancel_sup = this.fb.group({
      notes: ["", Validators.required],
    })
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
  ) { }



  ngOnInit() {
    this.getValidat();
    console.log(this.bid);
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

  onSubmit() {
    if (this.cancel_sup.valid) {
      if (confirm("Are you sure to Cancel? ")) {
        var form = this.cancel_sup.value;

        var cancelUrl = environment.apiUrl + "orders/subscription/cancel";
        this.http
          .post(
            cancelUrl,
            {
              order_id: this.bid,
              note: form.notes,
            },
            { headers: new HttpHeaders().set("Authorization", this.Auth_Token) }
          )
          .subscribe(
            data => {
              console.log(data);
              this.successmsg = data;
              //window.location.href = environment.siteUrl + "billing";
              setTimeout(() => {
                window.location.href = environment.siteUrl + "billing";
              }, 2000);
            },
            msg => {
              console.log(msg);
              this.errormsg = msg["error"];
            }
          );
      }

    }
    else {
      this.validateAllFormFields(this.cancel_sup);
    }
  }
}
