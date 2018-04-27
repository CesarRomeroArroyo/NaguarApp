import { Component, OnInit } from '@angular/core';


import * as $ from 'jquery';
import * as $$ from 'materialize-css';
import { FirebaseService } from '../../servicios/firebase.service';

declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  categorias: any;
  constructor(private service: FirebaseService) { }

  ngOnInit() {
    this.service.obtener('categorias').subscribe(
      result => {
        console.log(result);
        this.categorias = result;
      }
    );
  }

}
