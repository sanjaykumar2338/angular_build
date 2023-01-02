import { Component, OnInit, Injectable, Inject, HostListener } from "@angular/core";

@Component({
  selector: 'app-unit1',
  templateUrl: './unit1.component.html',
  styleUrls: ['./unit1.component.css']
})


export class Unit1Component implements OnInit {
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
