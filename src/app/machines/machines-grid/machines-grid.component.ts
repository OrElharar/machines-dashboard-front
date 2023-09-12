import {Component, Input, OnInit} from '@angular/core';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {IMachine} from "../../_models/machine";
import {MachinesService} from "../../_services/machines.service";
import {UserParams} from "../../_models/userParams";
import {IUser} from "../../_models/user";
import {AccountService} from "../../_services/account.service";
import {filter, switchMap, take} from "rxjs";
import {Router} from "@angular/router";
import {DialogService} from "../../_services/dialog.service";
import {IConfirmDialogData} from "../../_models/confirm-dialog-data";

@Component({
  selector: 'app-machines-grid',
  templateUrl: './machines-grid.component.html',
  styleUrls: ['./machines-grid.component.css']
})
export class MachinesGridComponent implements OnInit {
  @Input() machines: IMachine[] | undefined;
  // public gridDataResult: GridDataResult = {data: [], total: 0};
  public kendoGridBinding: any[] = [];
  public user: IUser | undefined;
  public userParams: UserParams | undefined;
  public pageSizesOptions: number[] = [10, 20, 50];

  constructor(private accountService: AccountService, private machineService: MachinesService, private router: Router, private dialogService: DialogService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user == null)
          return;
        this.userParams = new UserParams({user, pageSize: this.pageSizesOptions[0], pageNumber: 0});
      }
    })
  }
  private loadGridDataResult(): void {
    if(this.userParams == null || this.machines == null)
      return;

    const startIndex = this.userParams.skip;
    const endIndex = this.userParams.skip + this.userParams.pageSize;
    const dataForCurrentPage = this.machines.slice(startIndex, endIndex);
    this.kendoGridBinding = this.machines;
  }

  public refresh(): void {
    if(this.userParams == null)
      return;
    this.machineService.getMachines(this.userParams).subscribe({
      next: response => {
        if(response == null)
          return;
        this.machines = response;
        this.loadGridDataResult();
      }
    })
  }

  ngOnInit() {
    if(this.machines == null)
      return;
    this.loadGridDataResult();
  }

  public pageChange(event: PageChangeEvent): void {
    if(this.userParams == null)
      return;
    this.userParams.skip = event.skip;
    this.loadGridDataResult();
  }

  pageSizeChange(value: number) {
    if(this.userParams == null || value === this.userParams.pageSize || value == null)
      return;
    this.userParams.pageSize = value;
    this.loadGridDataResult();
  }

  editItemClicked(machine: IMachine) {
      this.router.navigateByUrl(`/machines/edit/${machine.id}`);
  }

  deleteItemClicked(dataItem: IMachine) {
    const diaglogData: IConfirmDialogData = {
      title: "Delete Machine",
      message: `Are you sure you want to delete machine ${dataItem.name}?`,
      confirmText: "Delete",
      cancelText: "Cancel"
    }

    this.dialogService.confirmDialog(diaglogData)
      .pipe(
        filter((isConfirmed)=> isConfirmed),
        switchMap((_isConfirm) => {
            return this.machineService.deleteMachine(dataItem.id);
        })).subscribe({
            next: () => {
              this.refresh();
            }
    })
  }
  onClickRefresh() {
    if(this.userParams == null)
      return;
    this.userParams.isRefreshing = true;
    this.refresh();
  }

}
