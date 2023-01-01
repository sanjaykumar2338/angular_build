import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthService as socialLogin } from "angularx-social-login";
import { environment } from "../../../../src/environments/environment.prod";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private socialLogin: socialLogin
  ) {}

  ngOnInit() {
    this.socialLogin.signOut();
    localStorage.clear();
    //this.router.navigate([""]);
    window.location.href = environment.sitepath;
  }
}
