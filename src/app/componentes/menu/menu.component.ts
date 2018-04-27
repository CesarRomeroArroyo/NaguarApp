import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import * as $$ from 'materialize-css';

declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('.button-collapse').sideNav({
        menuWidth: 250,
        edge: 'left',
        closeOnClick: true,
        draggable: true
      }
    );
  }

}
