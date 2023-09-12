import {Component, Input, OnInit} from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import {IMachine} from "../../_models/machine";
import {MachinesService} from "../../_services/machines.service";
import {UserParams} from "../../_models/userParams";
import {TableColumn} from "@swimlane/ngx-datatable";
import {IUser} from "../../_models/user";
import {AccountService} from "../../_services/account.service";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {IMachineFullData} from "../../_models/machine-card-data";

const paginationConfig: PaginationInstance = {
  id: 'custom-pagination', //
  itemsPerPage: 5,
  currentPage: 1,
};

@Component({
  selector: 'app-machines-table',
  templateUrl: './machines-card-list.component.html',
  styleUrls: ['./machines-card-list.component.css']
})
export class MachinesCardListComponent implements OnInit{
  @Input() machines: IMachineFullData[] | undefined;
  public user: IUser | undefined;
  public userParams: UserParams | undefined;
  public config: PaginationInstance = { ...paginationConfig };
  totalItems = 0;
  columns: TableColumn[] = [];
  public pageSizeOptions: number[] = [3, 5, 10];
  private filteredInput: string | undefined;


  constructor(private accountService: AccountService, private machineService: MachinesService, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user == null)
          return;
        this.userParams = new UserParams({user});
      }
    })
  }

  ngOnInit(): void {
    if(this.machines == null)
      return;
    this.loadFilteredMachines();
    this.columns = Object.keys(this.machines[0] || {}).map((columnName)=>{
      return {
        name: columnName,
        sortable: true
      }
    });
  }

  updateFilter(event: any): void {
    if(this.userParams == null)
      return;
    this.filteredInput = event.target.value;
    this.userParams.pageNumber = 1;
    this.filteredInput =  event.target.value.toLowerCase();
    this.loadFilteredMachines();
  }

  private loadFilteredMachines() {
    if(this.userParams == null)
      return;
    this.machineService.getMachinesFullData(this.userParams).subscribe({
      next: response => {
        const pageNumber = this.userParams?.pageNumber || 1;
        const pageSize = this.userParams?.pageSize || this.pageSizeOptions[1];
        const filteredMachines = response.filter((machine: IMachine) => {
          if(this.filteredInput == null || this.filteredInput === '')
            return true;
          return machine.name.toLowerCase().includes(this.filteredInput);
        })
        this.totalItems = filteredMachines.length;
        this.machines = filteredMachines.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
      }
    })
  }

  onClickRefresh() {
    if(this.userParams == null)
      return;
    this.userParams.isRefreshing = true;
    this.loadFilteredMachines();
    this.userParams.isRefreshing = false;
  }

  pageSizeChange($event: number) {
    if(this.userParams == null)
      return;
    this.userParams.pageSize = $event;
    this.loadFilteredMachines();

  }


  goToPage(number: number) {
    if(this.userParams == null)
      return;
    this.userParams.pageNumber = number;
    this.loadFilteredMachines();
  }

  editItemClicked(machine: IMachine) {
    this.router.navigateByUrl(`/machines/edit/${machine.id}`);
  }

}
