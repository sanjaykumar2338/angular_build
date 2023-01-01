import { Component, OnInit, Injectable, Inject, HostListener } from "@angular/core";

@Component({
  selector: 'app-unit3',
  templateUrl: './unit3.component.html',
  styleUrls: ['./unit3.component.css']
})
export class Unit3Component implements OnInit {

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

