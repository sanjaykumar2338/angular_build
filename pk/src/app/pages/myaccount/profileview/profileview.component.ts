import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component({
  selector: "app-profileview",
  templateUrl: "./profileview.component.html",
  styleUrls: ["./profileview.component.css"]
})
export class ProfileviewComponent implements OnInit {
  seopath = environment.sitepath;
  seourl = environment.apiUrl + "pages/my-profile";
  seometa: any;

  profDetails: any;
  profState: any;
  logedname: any;
  profStatename: any;
  stateid: any;

  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");
  url = environment.apiUrl + "auth/" + this.logeduser + "/profile";

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private http: HttpClient
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
  }

  getDetail() {
    this.http
      .get(this.url, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.profDetails = res.data;
          this.logedname = localStorage.getItem("logedname");
        },
        msg => {
          console.log(msg);
        }
      );
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

  /*
  getState(id){   
    if(this.profDetails){
      const stateUrl=environment.apiUrl+"/listings/regions/"+id;
      this.http.get (stateUrl, { headers: new HttpHeaders().set('Authorization', this.Auth_Token) }).subscribe(
        data => {
           this.profStatename=data;
        }
      );
    }
  }

  getCountry(){
    if(this.profDetails.country){
      const cntyUrl=environment.apiUrl+"/auth/countries"+this.profDetails.state;
      this.http.get (cntyUrl, { headers: new HttpHeaders().set('Authorization', this.Auth_Token) }).subscribe(
        data => {
          this.profState=data;
        },
        msg=>{
          console.log(msg);
        }
      );
    }
  }*/
}
