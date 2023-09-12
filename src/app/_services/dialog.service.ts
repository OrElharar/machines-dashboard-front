import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../dialogs/confirm/confirm.component";
import {IConfirmDialogData} from "../_models/confirm-dialog-data";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDialog(data: IConfirmDialogData): Observable<boolean> {
    return this.dialog.open(ConfirmComponent,{
      data,
      width: '400px',
      disableClose: true
    }).afterClosed();
  }
}
