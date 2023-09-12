import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from "./_modules/shared.module";
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import {ErrorInterceptor} from "./_interceptors/error.interceptor";
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import {JwtInterceptor} from "./_interceptors/jwt.interceptor";
import {GalleryComponent} from "ng-gallery";
import {LoadingInterceptor} from "./_interceptors/loading.interceptor";
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DatePickerComponent } from './_forms/date-picker/date-picker.component';
import { LoginComponent } from './login/login.component';
import { MachinesListComponent } from './machines/machines-list/machines-list.component';
import { MachinesGridComponent } from './machines/machines-grid/machines-grid.component';
import { MachineEditComponent } from './machines/machine-edit/machine-edit.component';
import { MachineCardComponent } from './machines/machine-card/machine-card.component';
import { DateTimePickerComponent } from './_forms/date-time-picker/date-time-picker.component';
import { PhotoEditorComponent } from './machines/photo-editor/photo-editor.component';
import { MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { MachineAddComponent } from './machines/machine-add/machine-add.component';
import { MachinesCardListComponent } from './machines/machines-table/machines-card-list.component';
import { ClientSidePaginationComponent } from './client-side-pagination/client-side-pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TextInputComponent,
    DatePickerComponent,
    LoginComponent,
    MachinesListComponent,
    MachinesGridComponent,
    MachineEditComponent,
    MachineCardComponent,
    DateTimePickerComponent,
    PhotoEditorComponent,
    ConfirmComponent,
    MachineAddComponent,
    MachinesCardListComponent,
    ClientSidePaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    GalleryComponent,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true, },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true, }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
