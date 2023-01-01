import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from "@angular/forms";
import { environment } from "../../../../../src/environments/environment.prod";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-citylanding",
  templateUrl: "./citylanding.component.html",
  styleUrls: ["./citylanding.component.css"]
})
export class CitylandingComponent implements OnInit {
  statename = this.route.snapshot.paramMap.get("state");
  cityname = this.route.snapshot.paramMap.get("city");

  contentUrl =
    environment.apiUrl +
    "local-marketing/region/" +
    this.statename +
    "/city/" +
    this.cityname;
  pagecontent: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private meta: Meta,
    private title: Title
  ) {
    this.setSeo();
    this.meta.updateTag({
      name: "robots",
      content: "index, follow"
    });
  }

  ngOnInit() {}

  setSeo() {
    this.http.get(this.contentUrl).subscribe(
      (res: any) => {
        this.pagecontent = res;
        this.title.setTitle(this.pagecontent.meta.title);
        this.meta.updateTag({
          name: "description",
          content: this.pagecontent.meta.description
        });
        this.meta.updateTag({
          name: "keywords",
          content: this.pagecontent.meta.keywords
        });

        this.meta.addTag({
          property: "og:description",
          content: this.pagecontent.meta.description
        });
        this.meta.addTag({ property: "og:url", content: this.router.url });

        this.meta.updateTag({
          name: "twitter:title",
          content: this.pagecontent.meta.description
        });
        this.meta.updateTag({
          name: "twitter:description",
          content: this.pagecontent.meta.keywords
        });
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }
}
