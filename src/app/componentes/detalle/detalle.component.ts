import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FirebaseService } from '../../servicios/firebase.service';
import { LocalstorageService } from '../../servicios/localstorage.service';

declare var $: any;
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  productos: any;
  producto: any = {categoria: '', descripcion: '', imagen: '', nombre: '', precio: '', cantidad: '', observaciones: ''};
  pedido: any = [];
  constructor(private activatedRoute: ActivatedRoute, private service: FirebaseService, private localStorage: LocalstorageService) {}

  ngOnInit() {
    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
    }
  );
    this.activatedRoute.params.subscribe((params: Params) => {
      this.service.obtenerPorCategoria('productos', params['id']).subscribe(
        result => {
          this.productos = result;
          console.log(this.productos);
        }
      );
    });
  }

  agregarProducto(producto: any) {
    this.producto.categoria = producto.categoria;
    this.producto.descripcion = producto.descripcion;
    this.producto.imagen = producto.imagen;
    this.producto.nombre = producto.nombre;
    this.producto.precio = producto.precio;
    console.log(this.producto);
    $('.modal').modal('open');
  }

  agregarPedido() {
    if (this.localStorage.obtener('NAGUARA_PEDIDO')) {
      this.pedido = JSON.parse(this.localStorage.obtener('NAGUARA_PEDIDO'));
      this.pedido.forEach(ped => {
        if (ped.nombre === this.producto.nombre) {
          ped.cantidad = parseInt(ped.cantidad, 0) + parseInt(this.producto.cantidad, 0);
          ped.observaciones = this.producto.observaciones;
        } else {
          this.pedido.push(this.producto);
        }
      });
      this.localStorage.agregar('NAGUARA_PEDIDO', JSON.stringify(this.pedido));
      this.producto = {};
    } else {
      this.pedido.push(this.producto);
      this.localStorage.agregar('NAGUARA_PEDIDO', JSON.stringify(this.pedido));
      this.producto = {};
    }
  }

}
