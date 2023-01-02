import { Component, OnInit, Injectable, Inject, HostListener } from "@angular/core";

@Component({
  selector: 'app-unit5',
  templateUrl: './unit5.component.html',
  styleUrls: ['./unit5.component.css']
})
export class Unit5Component implements OnInit {

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


