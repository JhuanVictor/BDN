import { ListaPesquisaComponent } from './lista/lista-pesquisa/lista-pesquisa.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [ { path: '', component: ListaPesquisaComponent} ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
