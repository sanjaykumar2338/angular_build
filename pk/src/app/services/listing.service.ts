import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class ListingService {
  slug = this.route.snapshot.paramMap.get("slug");
  getListingUrl = environment.apiUrl + "listings/listings/" + this.slug;

  reviewlistUrl = environment.apiUrl + "listings/reviews/list/parent/";

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getContent(slug) {
    return this.http.get(environment.apiUrl + "listings/listings/" + slug);
  }

  getReviews(id) {
    return this.http.get(this.reviewlistUrl + id);
  }
}
