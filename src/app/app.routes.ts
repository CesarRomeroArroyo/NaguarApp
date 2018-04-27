import { PrincipalComponent } from './componentes/principal/principal.component';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';


const APP_ROUTES: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
