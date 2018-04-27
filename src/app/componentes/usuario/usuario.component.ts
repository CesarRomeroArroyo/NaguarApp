import { LocalstorageService } from '../../servicios/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario: any = {nombre: '', correo: '', telefono: '', direccion: ''};
  constructor(private localStorage: LocalstorageService, private service: FirebaseService) { }

  ngOnInit() {
    if (this.localStorage.obtener('NAGUARA_USER')) {
      this.usuario = JSON.parse(this.localStorage.obtener('NAGUARA_USER'));
    }
  }

  guardarUsuario() {
    if (this.localStorage.obtener('NAGUARA_USER')) {
      this.localStorage.agregar('NAGUARA_USER', JSON.stringify(this.usuario));
      this.service.guardarDatos('clientes', this.usuario);
    }
    console.log(this.usuario);
  }

}
