import { Component, OnInit, HostListener } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jQuery";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  emailRegex: any =
    "^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$";
  blogposts: any;
  suburl = environment.apiUrl + "home/newsletter-subscribe";
  failedsub: any;
  subscribed: any;
  loading: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @HostListener("click", ["$event"]) goToPage() {
    var ul = event.target as HTMLInputElement;
    //  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    // this.router.navigate([ul.getAttribute('href')]));
  }

  subscribeForm = this.fb.group({
    fname: ["", Validators.required],
    lname: ["", Validators.required],
    email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    ]
  });

  onSubscribe() {
    var formsubs = this.subscribeForm.value;
    if (this.subscribeForm.valid) {
      this.loading = true;
      this.http
        .post(this.suburl, {
          email: formsubs.email,
          firstName: formsubs.fname,
          lastName: formsubs.lname
        })
        .subscribe(
          (res: any) => {
            //console.log(res);
            this.subscribed = res;
            this.failedsub = "";
            this.loading = false;
            setTimeout(() => {
              this.subscribed = false;
            }, 3000);
          },
          (msg: any) => {
            //console.log(msg);
            this.subscribed = "";
            this.failedsub = msg["error"].title;
            this.loading = false;
            setTimeout(() => {
              this.failedsub = false;
            }, 3000);
          }
        );

      this.subscribeForm.reset();
    } else {
      this.validateAllFormFields(this.subscribeForm);
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

  ngOnInit() {
    this.recentBlog();
  }

  ngAfterViewInit() {
    $(".fixed-action-btn").addClass("active");
  }

  recentBlog() {
    const postUrl = environment.blogPost + "/resentposts";
    this.http.get(postUrl).subscribe(
      (res: any) => {
        this.blogposts = res.data;
      },
      msg => {
        console.log(msg["error"].error);
      }
    );
  }
}
