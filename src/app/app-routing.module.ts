import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ListsComponent} from "./lists/lists.component";
import {MessagesComponent} from "./messages/messages.component";
import {authGuard} from "./_guards/auth.guard";
import {TestErrorsComponent} from "./errors/test-errors/test-errors.component";
import {NotFoundComponent} from "./errors/not-found/not-found.component";
import {ServerErrorComponent} from "./errors/server-error/server-error.component";
import {preventUnsavedChangesGuard} from "./_guards/prevent-unsaved-changes.guard";
import {MachinesListComponent} from "./machines/machines-list/machines-list.component";
import {MachineEditComponent} from "./machines/machine-edit/machine-edit.component";
import {MachineAddComponent} from "./machines/machine-add/machine-add.component";

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "",
        runGuardsAndResolvers: "always",
        canActivate: [authGuard],
        children: [
            {path: "machines", component: MachinesListComponent},
            {path: "machines/add", component: MachineAddComponent},
            {path: "machines/edit/:id", component: MachineEditComponent, canDeactivate: [preventUnsavedChangesGuard]},
            {path: "lists", component: ListsComponent},
            {path: "messages", component: MessagesComponent}
        ]
        },
    {path: "errors", component: TestErrorsComponent},
    {path: "not-found", component: NotFoundComponent},
    {path: "server-error", component: ServerErrorComponent},
    {path: "**", component: NotFoundComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
