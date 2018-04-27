import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  productos: any;
  constructor(private activatedRoute: ActivatedRoute, private service: FirebaseService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.service.obtenerPorCategoria('productos', params['id']).subscribe(
        result => {
          this.productos = result;
          console.log(this.productos);
        }
      );
    });
  }

}
