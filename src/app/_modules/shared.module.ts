import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ToastrModule} from "ngx-toastr";
import {TabsModule} from "ngx-bootstrap/tabs";
import {NgxSpinnerModule} from "ngx-spinner";
import {FileUploadModule} from "ng2-file-upload";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {TimeagoModule} from "ngx-timeago";
import {ButtonsModule} from "@progress/kendo-angular-buttons";
import { GridModule } from '@progress/kendo-angular-grid';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {DateInputsModule} from "@progress/kendo-angular-dateinputs";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgxPaginationModule} from "ngx-pagination";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    NgxSpinnerModule.forRoot({
      type: "line-scale",
    }),
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule,
    TimeagoModule.forRoot(),
    GridModule,
    DropDownListModule,
    DateInputsModule,
    NgxDatatableModule,
    NgxPaginationModule,
    MatSlideToggleModule,
  ],
    exports: [
        BsDropdownModule,
        TabsModule,
        ToastrModule,
        NgxSpinnerModule,
        FileUploadModule,
        BsDatepickerModule,
        PaginationModule,
        ButtonsModule,
        GridModule,
        TimeagoModule,
        DropDownListModule,
        DateInputsModule,
        NgxDatatableModule,
        NgxPaginationModule,
        MatSlideToggleModule
    ]
})
export class SharedModule { }
