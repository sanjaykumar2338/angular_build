import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-listsetting",
  templateUrl: "./listsetting.component.html",
  styleUrls: ["./listsetting.component.css"]
})
export class ListsettingComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/listing-settings";
  seometa: any;

  profSetting: any;
  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  url = environment.apiUrl + "auth/profile/" + this.logeduser + "/usersettings";
  postSetting = environment.apiUrl + "auth/settings/" + this.logeduser;

  profileSetting: FormGroup;
  preview1: boolean = false;
  pcall1: boolean = false;
  pinfo1: boolean = false;
  psocial1: boolean = false;
  pnodify1: boolean = false;
  newsletter: boolean = false;

  results: any;
  errormsg: any;
  successmsg: any;

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "noindex"
    });
    this.meta.updateTag({
      name: "googlebot",
      content: "noindex"
    });
  }

  ngOnInit() {
    this.getDetail();
    this.getValidat();
  }

  getValidat() {
    this.profileSetting = this.fb.group({
      preview: [""],
      pcall: [""],
      pinfo: [""],
      psocial: [""],
      pnodify: [""],
      smsrec: [""],
      newsletter: [""],
      pageview: [""],
      listingenq: [""],
      funnelform: [""],
      campaigns: [""]
    });
  }

  getDetail() {
    this.http
      .get(this.url, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.profSetting = res.data;
          if (res.data != "") {
            this.profileSetting.patchValue({
              preview: this.profSetting["_listingreview"],
              pcall: this.profSetting["_callnow"],
              pinfo: this.profSetting["_showcontactinfo"],
              psocial: this.profSetting["_showsocialmedia"],
              pnodify: this.profSetting["_allnotification"],
              smsrec: this.profSetting["_smsnotification"],
              newsletter: this.profSetting["_subscription"],
              pageview: this.profSetting["_views_visit_notification"],
              listingenq: this.profSetting["_contactenq_user_notification"],
              funnelform: this.profSetting["_funnel_form_notification"],
              campaigns: this.profSetting["_email_campaign_notification"]
            });
          }
        },
        msg => {
          console.log(msg);
        }
      );
  }

  chgs(event) {
    var form = this.profileSetting.value;
    /* form.pcall && */
    if (
      form.preview &&
      form.pinfo &&
      form.psocial &&
      form.smsrec &&
      form.newsletter &&
      form.pageview &&
      form.listingenq &&
      form.funnelform &&
      form.campaigns
    ) {
      this.profileSetting.patchValue({
        pnodify: true
      });
    } else {
      this.profileSetting.patchValue({
        pnodify: false
      });
    }
  }

  disableall(event) {
    var form = this.profileSetting.value;
    if (form.pnodify) {
      this.profileSetting.patchValue({
        preview: true,
        pcall: true,
        pinfo: true,
        psocial: true,
        pnodify: true,
        smsrec: true,
        newsletter: true,
        pageview: true,
        listingenq: true,
        funnelform: true,
        campaigns: true
      });
    } else {
      this.profileSetting.patchValue({
        preview: false,
        pcall: false,
        pinfo: false,
        psocial: false,
        pnodify: false,
        smsrec: false,
        newsletter: false,
        pageview: false,
        listingenq: false,
        funnelform: false,
        campaigns: false
      });
    }
  }

  onSubmit() {
    if (this.profileSetting.valid) {
      var form = this.profileSetting.value;
      console.log(form);
      this.http
        .post(
          this.postSetting,
          {
            _settingupdate: 1,
            _listingreview: form.preview == true ? 1 : 0,
            _callnow: form.pcall == true ? 1 : 0,
            _showcontactinfo: form.pinfo == true ? 1 : 0,
            _showsocialmedia: form.psocial == true ? 1 : 0,
            _allnotification: form.pnodify == true ? 1 : 0,
            _smsnotification: form.smsrec == true ? 1 : 0,
            _subscription: form.newsletter == true ? 1 : 0,
            _views_visit_notification: form.pageview == true ? 1 : 0,
            _contactenq_user_notification: form.listingenq == true ? 1 : 0,
            _funnel_form_notification: form.funnelform == true ? 1 : 0,
            _email_campaign_notification: form.campaigns == true ? 1 : 0
          },
          {
            headers: new HttpHeaders().set("Authorization", this.Auth_Token)
          }
        )
        .subscribe(
          (res: any) => {
            this.errormsg = "";
            this.successmsg = res;

            setTimeout(function() {
              window.location.href = environment.sitepath + "/settings";
            }, 3000);
          },
          (msg: any) => {
            this.successmsg = "";
            this.errormsg = msg["error"].error;
          }
        );
    } else {
      this.validateAllFormFields(this.profileSetting);
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
  }
  /* SEO SETTINGS Close*/
}
