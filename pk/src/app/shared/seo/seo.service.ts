import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Title, Meta } from "@angular/platform-browser";
import { MetaService } from "@ngx-meta/core";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class SEOService {
  constructor(
    private title: Title,
    private readonly meta: MetaService,
    private router: Router,
    @Inject(DOCUMENT) private doc
  ) {}

  seos(test) {
    console.log("test" + test);
  }
  createLinkForCanonicalURL() {
    let link: HTMLLinkElement = this.doc.createElement("link");
    link.removeAttribute("rel");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute(
      "href",
      environment.siteUrl + (this.doc.URL == "/" ? "" : this.doc.URL)
    );
  }

  setMetaTags(pageTitle, metaTags) {
    this.title.setTitle(pageTitle);
    this.meta.setTitle(pageTitle);
    for (let tag of metaTags) {
      this.meta.setTag(tag.name, tag.content);
    }
    this.createLinkForCanonicalURL();
  }

  removeMetaTags(metaTags) {
    for (let tag of metaTags) {
      this.meta.removeTag('name="' + tag.name + '"');
    }
  }
}
