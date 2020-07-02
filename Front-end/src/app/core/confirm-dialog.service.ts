import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor( private dialog: MatDialog) { }

  openConfimDialog(acao: string, tipo: string, nome: string ){
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: 'Tem certeza que deseja ' + acao + ' o(a) ' + tipo + ' ' + nome + '?'
      }
    })
  }
}
