import { Injectable, Component } from "@angular/core";
import { environment } from "../../../../../src/environments/environment.prod";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class HomeserviceService {
  serviceCateUrl = environment.apiUrl + "home/top-categories";
  cateCont: any;

  serviceStateUrl = environment.apiUrl + "home/top-regions";
  stateCont: any;

  newListingUrl = environment.apiUrl + "home/new-businesses";
  bussCont: any;

  fourServiceUrl = environment.apiUrl + "home/promos";
  exploreCont: any;
  engageCont: any;
  shopCont: any;
  reviewCont: any;

  newReviewsUrl = environment.apiUrl + "home/new-reviews";
  newreviewCont: any;

  listCateUrl = environment.apiUrl + "listings/categories";
  listcateCont: any;

  listregionUrl = environment.apiUrl + "listings/regions";
  listregionCont: any;

  constructor(private http: HttpClient, private router: Router) {}

  findService() {
    return this.http.get(this.serviceCateUrl);
  }

  listCate() {
    return this.http.get(this.listCateUrl);
  }

  listRegion() {
    return this.http.get(this.listregionUrl);
  }

  stateService() {
    return this.http.get(this.serviceStateUrl);
  }

  newBusiness() {
    return this.http.get(this.newListingUrl);
  }

  exploreSec() {
    return this.http.get(this.fourServiceUrl + "/1312");
  }

  enagageSec() {
    return this.http.get(this.fourServiceUrl + "/1313");
  }

  shopSec() {
    return this.http.get(this.fourServiceUrl + "/1314");
  }

  reviewSec() {
    return this.http.get(this.fourServiceUrl + "/1315");
  }

  newReviews() {
    return this.http.get(this.newReviewsUrl);
  }
}
