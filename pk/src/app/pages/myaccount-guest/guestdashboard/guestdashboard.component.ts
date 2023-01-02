import { Component, OnInit } from "@angular/core";
import * as $ from "jQuery";
@Component({
  selector: "app-guestdashboard",
  templateUrl: "./guestdashboard.component.html",
  styleUrls: ["./guestdashboard.component.css"]
})
export class GuestdashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
    $(".apopup").click();
    $("#exampleModal").modal({
      backdrop: "static",
      keyboard: false
    });
  }

  usertype(type) {
    localStorage.removeItem("utype");
    localStorage.setItem("utype", type);

    $("#exampleModal").hide();
    $(".modal-backdrop").hide();
  }
}
