import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IConfirmDialogData} from "../../_models/confirm-dialog-data";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit{
  data: IConfirmDialogData | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) data: IConfirmDialogData) {
    this.data = data;
  }

  ngOnInit(): void {
  }

}
