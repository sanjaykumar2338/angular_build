import { Component, OnInit, Inject } from "@angular/core";
import { AuthService } from "../../../auth/auth.service";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";

@Component({
  selector: "app-landhead",
  templateUrl: "./landhead.component.html",
  styleUrls: ["./landhead.component.css"]
})
export class LandheadComponent implements OnInit {
  userlog: any;

  constructor(
    private logedUser: AuthService,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.userlog = this.logedUser.getToken();
    }
  }
}
