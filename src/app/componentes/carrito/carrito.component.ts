import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../servicios/localstorage.service';
import { FirebaseService } from '../../servicios/firebase.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as $ from 'jquery';
import * as $$ from 'materialize-css';

declare var $: any;
declare var Materialize: any;
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  estado = 0;
  pedido: any;
  producto: any = {categoria: '', descripcion: '', imagen: '', nombre: '', precio: '', precioTotal: '', cantidad: '', observaciones: ''};
  configuracion: any;
  total: number;
  user: any;
  idPedido: any;
  observacionesCancelar: any;
  constructor(private localStorage: LocalstorageService, private service: FirebaseService, private router: Router) { }

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
    if (this.localStorage.obtener('NAGUARA_PEDIDO')) {
      this.pedido = JSON.parse(this.localStorage.obtener('NAGUARA_PEDIDO'));
      this.calcularTotales();
    }
    this.user = JSON.parse(this.localStorage.obtener('NAGUARA_USER'));
    this.validarPedidoActivo();
  }

  validarPedidoActivo() {
    this.service.obtenerPorCorreo(this.user.correo).subscribe(
      result => {
        console.log(result);
        if (result.length > 0) {
          this.estado = 1;
          this.idPedido = result[0].id;
        } else {
          this.estado = 0;
        }
      }
    );
  }

  calcularTotales() {
    this.service.obtener('configuraciones').subscribe(
      result => {
        this.total = 0;
        this.configuracion = result;
        this.pedido.forEach(ped => {
          this.total += parseInt(ped.precioTotal, 0);
        });
        this.total += parseInt(this.configuracion[0].domicilio, 0);
      }
    );
  }

  editarProducto(producto: any) {
    this.producto = producto;
    $('#modalEditar').modal('open');
  }

  modificarPedido() {
    this.pedido = JSON.parse(this.localStorage.obtener('NAGUARA_PEDIDO'));
      this.pedido.forEach(ped => {
        if (ped.nombre === this.producto.nombre) {
          ped.cantidad = parseInt(this.producto.cantidad, 0);
          ped.precioTotal = parseInt(ped.cantidad, 0) * parseInt(ped.precio, 0);
          ped.observaciones = this.producto.observaciones;
        } else {
          this.producto.precioTotal = parseInt(this.producto.cantidad, 0) * parseInt(this.producto.precio, 0);
          this.pedido.push(this.producto);
        }
      });
      this.localStorage.agregar('NAGUARA_PEDIDO', JSON.stringify(this.pedido));
      this.producto = {};
      this.calcularTotales();
  }

  borrarProducto(producto) {
    swal({
      text: 'Esta seguro de borrar el producto?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Borrarlo'
    }).then((result) => {
      if (result.value) {
       this.accionBorrado(producto);
      }
    });
  }

  accionBorrado(producto) {
    this.pedido = this.pedido.forEach(ped => {
      if (ped.id === producto.id) {
        return ped;
      }
    });
    if (this.pedido === undefined) {
      this.localStorage.eliminar('NAGUARA_PEDIDO');
      this.router.navigateByUrl('/user');
      return;
    }
    this.localStorage.agregar('NAGUARA_PEDIDO', JSON.stringify(this.pedido));
  }

  enviarPedido() {
    swal({
      text: 'El pedido fue enviado correctamente',
      type: 'success',
      confirmButtonText: 'Aceptar'
    });
    this.estado = 1;
    const pedidoEnviado = {mail: this.user.correo, usuario: this.user, pedido: this.pedido, estado: this.estado};
    this.service.guardarDatos('pedidos', pedidoEnviado);
  }

  cancelarPedido() {
    $('#modalEliminar').modal('open');
  }

  confirmaCancelarPedido() {
    this.service.eliminarDatos('pedidos', this.idPedido);
    const pedidoEnviado = {mail: this.user.correo, usuario: this.user, pedido: this.pedido,
      estado: this.estado, observaciones: this.observacionesCancelar};
    this.service.guardarDatos('pedidosCancelados', pedidoEnviado);
    swal({
      text: 'El pedido fue cancelado correctamente',
      type: 'success',
      confirmButtonText: 'Aceptar'
    });
    this.localStorage.eliminar('NAGUARA_PEDIDO');
    this.router.navigateByUrl('/user');
  }

}
