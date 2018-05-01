import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.settings';

@Injectable()
export class FirebaseService {
  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore, private appSettings: AppSettings) {}

  obtenerPedidosActivos(): Observable<any> {
    this.itemsCollection = this.db.collection<any>('pedidos', ref => ref.where('estado', '==', '1'));
    return this.itemsCollection.snapshotChanges().map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  obtener(tabla): Observable<any> {
    return this.items = this.db.collection(tabla).valueChanges();
  }

  obtenerPorId(tabla, idunico): Observable<any> {
    this.itemsCollection = this.db.collection<any>('pedidos', ref => ref.where('id', '==', idunico));
    return this.itemsCollection.snapshotChanges().map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  obtenerPorCorreo(idunico): Observable<any> {
    this.itemsCollection = this.db.collection<any>('pedidos', ref => ref.where('mail', '==', idunico));
    return this.itemsCollection.snapshotChanges().map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  validarUsuario(tabla, idunico): Observable<any> {
    this.itemsCollection = this.db.collection<any>('clientes', ref => ref.where('correo', '==', idunico));
    return this.itemsCollection.snapshotChanges().map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  obtenerPorCategoria(tabla, idunico): Observable<any> {
    this.itemsCollection = this.db.collection<any>('productos', ref => ref.where('categoria', '==', idunico));
    return this.itemsCollection.snapshotChanges().map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  guardarDatos(tabla: string, data)  {
    data.idunico = this.appSettings.guid();
    this.itemsCollection = this.db.collection<any>(tabla);
    this.itemsCollection.add(data);
  }

  eliminarDatos(tabla: string, id: any) {
    this.itemsCollection = this.db.collection<any>(tabla);
    this.itemsCollection.doc(id).delete().then(
      () => {
      }
    );
  }
}
