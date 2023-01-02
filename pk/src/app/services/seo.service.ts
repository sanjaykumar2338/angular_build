import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}
  gtitle: any;

  getseo(title) {
    this.gtitle = title;
    this.title.setTitle("testsasrt1111");
    this.meta.updateTag({
      name: "description",
      content: "test"
    });
    console.log("test->" + title);
  }
}
