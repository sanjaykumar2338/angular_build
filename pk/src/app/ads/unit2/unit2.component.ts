import { Component, OnInit, Injectable, Inject, HostListener } from "@angular/core";

@Component({
  selector: 'app-unit2',
  templateUrl: './unit2.component.html',
  styleUrls: ['./unit2.component.css']
})
export class Unit2Component implements OnInit {

  public screenWidth: any;
  constructor() { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }
}
