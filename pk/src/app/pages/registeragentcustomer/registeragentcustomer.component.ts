import { Component, OnInit, Injectable, Inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup,
  AbstractControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { RegisterService } from "../register/register.service";
import { environment } from "../../../environments/environment.prod";
import { AuthService } from "../../auth/auth.service";
import { Meta, Title } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";
@Component({
  selector: "app-registeragentcustomer",
  templateUrl: "./registeragentcustomer.component.html",
  styleUrls: ["./registeragentcustomer.component.css"]
})
export class RegisteragentcustomerComponent implements OnInit {
  homefeed: any;
  regdata: any;
  results: any;
  errormsg: any;
  sendmsg: any;
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/register";
  seometa: any;
  loader: any;
  logdata: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rs: RegisterService,
    private http: HttpClient,
    private logedUser: AuthService,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc
  ) {
    this.setSeo();

    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {
    this.homefeed = this.logedUser.getToken();
    if (this.homefeed) {
      this.router.navigate(["/myaccount"]);
      console.log("Loged in");
    } else {
      console.log("Not Login");
      return true;
    }
  }

  checkPasswords(registerForm: FormGroup) {
    const pass = registerForm.controls.pass.value;
    const confirmPass = registerForm.controls.cpass.value;
    return pass == confirmPass ? null : { notSame: true };
  }

  mustBeChecked(registerForm: FormGroup) {
    const term = registerForm.controls.term.value;
    if (term.value) {
      return true;
    } else {
      return null;
    }
  }

  registerForm = this.fb.group(
    {
      agentid: ["", Validators.required],
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      pass: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      cpass: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      term: ["", [Validators.required]]
    },
    {
      validator: this.checkPasswords
    }
  );

  onSubmit() {
    var form = this.registerForm.value;

    if (this.registerForm.valid) {
      this.loader = "t";
      console.log("form submitted");
      //this.registerForm.reset();

      const url = environment.apiUrl + "agent/user-register";

      this.http
        .post(url, {
          referral_id: form.agentid,
          first_name: form.fname,
          last_name: form.lname,
          email: form.email,
          password: form.pass
        })
        .subscribe(
          (res: any) => {
            this.login(res.data.username, form.pass);
            this.loader = "";
            this.regdata = res.data;
            this.registerForm.reset();
            this.sendmsg = true;
            this.errormsg = false;
          },
          (msg: any) => {
            this.loader = "";
            this.results = msg;
            this.results = msg.error;
            console.log(this.results);
            this.sendmsg = false;
            this.errormsg = msg["error"].error;
          }
        );
    } else {
      this.validateAllFormFields(this.registerForm);
    }
  }

  login(u, p) {
    const url = environment.apiUrl + "auth/login/";
    console.log(u + "--" + p);
    this.http
      .post(url, {
        username: u,
        password: p
      })
      .subscribe(
        (data: any) => {
          this.logdata = data;
          localStorage.setItem("token", this.logdata.data.token);
          localStorage.setItem("logedUser", this.logdata.data.User.id);
          localStorage.setItem("logedname", this.logdata.data.User.username);
          localStorage.setItem("usertype", this.logdata.data.User.role_id);
          localStorage.setItem("agentid", this.logdata.data.User.uuid);
          localStorage.setItem("userlog", this.logdata.data.User.referral_id);
          window.location.href = environment.siteUrl + "plans";
        },
        (msg: any) => {
          console.log(msg);
        }
      );
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

  /* SEO SETTINGS */
  setSeo() {
    this.http.get(this.seourl).subscribe(
      (res: any) => {
        this.seometa = res;
        if (this.seometa.metas.title) {
          this.title.setTitle(this.seometa.metas.title);
          this.meta.updateTag({
            name: "twitter:title",
            content: this.seometa.metas.title
          });
          this.meta.updateTag({
            name: "og:title",
            content: this.seometa.metas.title
          });
        }

        this.meta.addTag({
          property: "og:url",
          content: this.seopath + "" + this.router.url
        });

        if (this.seometa.metas.description) {
          this.meta.updateTag({
            name: "description",
            content: this.seometa.metas.description
          });
          this.meta.addTag({
            property: "og:description",
            content: this.seometa.metas.description
          });
          this.meta.updateTag({
            name: "twitter:description",
            content: this.seometa.metas.description
          });
        }
        if (this.seometa.metas.keywords) {
          this.meta.updateTag({
            name: "keywords",
            content: this.seometa.metas.keywords
          });
        }
      },
      (msg: any) => {
        //console.log(msg);
      }
    );

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute("href", this.seopath + "/register");
  }
  /* SEO SETTINGS Close*/
}
