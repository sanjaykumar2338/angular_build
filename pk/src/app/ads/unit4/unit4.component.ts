import { Component, OnInit, Injectable, Inject, HostListener } from "@angular/core";

@Component({
  selector: 'app-unit4',
  templateUrl: './unit4.component.html',
  styleUrls: ['./unit4.component.css']
})
export class Unit4Component implements OnInit {
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
