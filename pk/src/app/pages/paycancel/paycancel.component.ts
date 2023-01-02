import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paycancel',
  templateUrl: './paycancel.component.html',
  styleUrls: ['./paycancel.component.css']
})
export class PaycancelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.removeItem('package');
    localStorage.removeItem('reUrl');
  }

}
