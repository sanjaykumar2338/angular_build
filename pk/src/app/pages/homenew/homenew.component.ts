import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../src/environments/environment.prod";

@Component({
  selector: "app-homenew",
  templateUrl: "./homenew.component.html",
  styleUrls: ["./homenew.component.css"]
})
export class HomenewComponent implements OnInit {
  contentUrl = environment.apiUrl + "pages/how-it-works";
  pagecontent: any;

  constructor(
    private meta: Meta,
    private title: Title,
    private http: HttpClient
  ) {
    this.setSeo();
  }

  getContent() {
    this.http.get(this.contentUrl).subscribe(
      (res: any) => {
        this.pagecontent = res;
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }

  ngOnInit() {
    this.getContent();
    console.log('live 2');
  }

  setSeo() {
    this.http.get(this.contentUrl).subscribe(
      (res: any) => {
        this.pagecontent = res;
        this.title.setTitle(this.pagecontent.metas.title);
        this.meta.updateTag({
          name: "description",
          content: this.pagecontent.metas.description
        });
        this.meta.updateTag({
          name: "keywords",
          content: this.pagecontent.metas.keywords
        });
      },
      (msg: any) => {
        console.log(msg);
      }
    );
  }
}
