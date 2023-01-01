import { Injectable, Component } from "@angular/core";
import { environment } from "../../environments/environment.prod";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserdetailService {
  dashUrl = environment.apiUrl + "auth/" + this.getUser() + "/dashboard/counts";
  dashcount: any;

  constructor(private http: HttpClient, private router: Router) {}

  getDashcounts() {
    return this.http.get(this.dashUrl, {
      headers: new HttpHeaders().set("Authorization", this.getToken())
    });
  }

  getUser(): string {
    return window.localStorage.getItem("logedUser");
  }

  getUsername(): string {
    return window.localStorage.getItem("logedname");
  }

  getToken(): string {
    return window.localStorage.getItem("token");
  }

  getChoosePackage(): string {
    return window.localStorage.getItem("package");
  }
}
