import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../src/environments/environment.prod';

@Component({
  selector: 'app-termsidebar',
  templateUrl: './termsidebar.component.html',
  styleUrls: ['./termsidebar.component.css']
})
export class TermsidebarComponent implements OnInit {
siteurl=environment.siteUrl;

  constructor() { }

  ngOnInit() {
  }

}
