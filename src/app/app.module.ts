import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_ROUTING } from './app.routes';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { MenuBackComponent } from './componentes/menu-back/menu-back.component';
import { LocalstorageService } from './servicios/localstorage.service';
import { AppSettings } from './app.settings';
import { FirebaseService } from './servicios/firebase.service';
import { DetalleComponent } from './componentes/detalle/detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    UsuarioComponent,
    MenuComponent,
    MenuBackComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    LocalstorageService,
    AppSettings,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
