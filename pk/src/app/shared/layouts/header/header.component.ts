import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import { AuthService } from "../../../auth/auth.service";
import { Observable } from "rxjs";
import { environment } from "../../../../../src/environments/environment.prod";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import * as $ from "jQuery";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  logeduser: any;
  logedname: any;
  showmenu: boolean = false;
  showmenu1: boolean = false;
  siteUrl = "https://walldirectory.com/";
  siteUrl2 = environment.sitepath;
  listregions = environment.apiUrl + "listings/regions";
  listofregion: any;
  usertype = "";
  logtype: any;
  isLoggedIn = "";

  menutoggle = {
    tb1: false,
    tb2: false,
    tb3: false,
    tb4: false
  };
  parent = "";

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private logedUser: AuthService,
    private http: HttpClient
  ) { }

  sr1Form = this.fb.group({
    loc: ["", Validators.required],
    keyword: ["", Validators.required]
  });

  menuopen(tmenu) {
    if (this.menutoggle[tmenu] == true) {
      this.menutoggle[tmenu] = false;
    } else {
      this.menutoggle = {
        tb1: false,
        tb2: false,
        tb3: false,
        tb4: false
      };
      this.menutoggle[tmenu] = true;
    }
  }
  ngOnInit() {

    /*menu dropdown name show used*/
    this.logeduser = localStorage.getItem("logeduser");
    this.logedname = localStorage.getItem("logedname");
    this.logtype = localStorage.getItem("usertype");
    this.searchloc();
    this.isLoggedIn = this.logedUser.getToken();
    if (this.isLoggedIn) {
      this.isLoggedIn = this.isLoggedIn;
    } else {
      this.isLoggedIn = "";
    }

    if (this.isLoggedIn && this.logtype == 2) {
      this.usertype = "2";
    }
    if (this.isLoggedIn && this.logtype == 3) {
      this.usertype = "3";
    }
  }

  ngAfterViewInit() {
    this.doClassicLoad();

    $(".ts-menu-5").on("click", function () {
      $(".mob-right-nav").css("right", "0px");
    });

    $(".mob-right-nav-close").on("click", function () {
      $(".mob-right-nav").css("right", "-270px");
    });
  }

  mouseEnter(){
    $(".cat-menu").fadeIn(50);
  }

 mouseLeave(){
   $(".cat-menu").fadeOut(50);
 }
 mobshow(){
  $(".mob-right-nav").css("right", "0px");
 }
 mobhide(){
  $(".mob-right-nav").css("right", "-270px");
 }
 
  doClassicLoad() {
      $(".t-bb").hover(function () {
        $(".cat-menu").fadeIn(50);
      });
      $(".ts-menu").mouseleave(function () {
        $(".cat-menu").fadeOut(50);
      });
  }

  searchloc() {
    this.http.get(this.listregions).subscribe((reg: any) => {
      this.listofregion = reg.data;
      //console.log(reg);
    });
  }

  ontopSearch($event) {
    var form = this.sr1Form.value;
    var searchUrl =
      "?search_keyword=" + form.keyword + "&search_region=" + form.loc;
    //this.router.navigate(['/listings'], { queryParams: { keyword : form.keyword, lat : '', lng : '' } } );
    window.location.href = environment.siteUrl + "listings" + searchUrl;
    // console.log(form);
  }

  /* shownav1() {
    this.showmenu1 = true;
    console.log("show");
  }
  hidenav1() {
    this.showmenu1 = false;
    console.log("hide");
  }

  shownav() {
    this.showmenu = true;
    console.log("show");
  }
  hidenav() {
    this.showmenu = false;
    console.log("hide");
  } */
}
