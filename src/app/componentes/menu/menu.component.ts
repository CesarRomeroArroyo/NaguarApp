import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LocalstorageService } from '../../servicios/localstorage.service';
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
  pedido: any;
  constructor(private localStorage: LocalstorageService) { }

  ngOnInit() {
    if (this.localStorage.obtener('NAGUARA_PEDIDO')) {
      this.pedido = JSON.parse(this.localStorage.obtener('NAGUARA_PEDIDO'));
    }
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
