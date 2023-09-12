import {Component, OnInit} from '@angular/core';
import {IPagination} from "../../_models/pagination";
import {IUser} from "../../_models/user";
import {UserParams} from "../../_models/userParams";
import {MachinesService} from "../../_services/machines.service";
import {AccountService} from "../../_services/account.service";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {IMachineFullData} from "../../_models/machine-card-data";

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.css'],


})
export class MachinesListComponent implements OnInit{
  machines: IMachineFullData[] = [];
  pagination: IPagination | undefined;
  user: IUser | undefined;
  userParams: UserParams | undefined;

  constructor(private membersService: MachinesService, private accountService: AccountService, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user == null)
          return;
        this.user = user;
        this.userParams = new UserParams({user});
      }
    })
  }

  ngOnInit(): void {
    this.loadMachines();
  }

  loadMachines() {
    if(this.userParams == null)
      return;
    this.membersService.getMachinesFullData(this.userParams).subscribe({
      next: response => {
        this.machines = response;
      }
    });
  }

  onClickAddMachine() {
    this.router.navigateByUrl("/machines/add",);
  }

}
