import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../src/environments/environment.prod";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";

@Component({
  selector: "app-notfound",
  templateUrl: "./notfound.component.html",
  styleUrls: ["./notfound.component.css"]
})
export class NotfoundComponent implements OnInit {
  logeduser = localStorage.getItem("logedUser");
  logToken = localStorage.getItem("token");
  enqsucc: any;
  enqerr: any;
  enqloader: any;
  mobilereg = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {}

  listingEnq = this.fb.group({
    enq_fname: ["", Validators.required],
    enq_lname: ["", Validators.required],
    enq_email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    ],
    enq_phone: [
      "",
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(this.mobilereg)
      ]
    ],
    listingid: [""],
    enq_cont: ["", [Validators.required, Validators.minLength(50)]]
  });

  webclicked(id) {
    this.http
      .post(
        environment.apiUrl +
          "listings/listings/id/" +
          id +
          "/track/action/view_website",
        {}
      )
      .subscribe(
        (res: any) => {
          console.log(res.data.message);
        },
        (msg: any) => {
          console.log(msg.error.error);
        }
      );

    if (this.logeduser && this.logToken) {
      this.http
        .post(
          environment.apiUrl +
            "listings/listings/" +
            id +
            "/visitor_view_website",
          {},
          {
            headers: new HttpHeaders().set("Authorization", this.logToken)
          }
        )
        .subscribe(
          (res: any) => {
            //console.log(res.data.message);
          },
          (msg: any) => {
            console.log(msg.error.error);
          }
        );
    }
  }

  pathcid(id) {
    this.listingEnq.patchValue({
      listingid: id
    });
  }

  onSubmitEnq() {
    if (this.listingEnq.valid) {
      this.enqloader = true;
      var form = this.listingEnq.value;
      const postEnqUrl =
        environment.apiUrl + "listings/listings/" + form.listingid + "/enquiry";
      this.http
        .post(postEnqUrl, {
          listing_id: form.listingid,
          first_name: form.enq_fname,
          last_name: form.enq_lname,
          email: form.enq_email,
          phone: form.enq_phone,
          message: form.enq_cont
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            this.enqsucc = res;
            this.enqerr = "";
            this.enqloader = "";
            this.listingEnq.reset();
            setTimeout(() => {
              this.enqsucc = "";
            }, 3000);
          },
          (msg: any) => {
            console.log(msg);
            this.enqsucc = "";
            this.enqerr = msg;
            this.enqloader = "";
            setTimeout(() => {
              this.enqerr = "";
            }, 3000);
          }
        );
    } else {
      this.validateAllFormFields(this.listingEnq);
    }
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
}
