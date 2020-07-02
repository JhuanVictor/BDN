import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { ListaPesquisaComponent, NovaLista, NovoItem } from './lista-pesquisa/lista-pesquisa.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  declarations: [ListaPesquisaComponent, NovaLista, NovoItem],
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    ClipboardModule,
  ],
  exports: [
    ListaPesquisaComponent,
    NovaLista,
    NovoItem
  ]
})
export class ListaModule { }
