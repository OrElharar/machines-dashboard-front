import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(public accountsService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.accountsService.logout();
    this.router.navigateByUrl("/");
  }
}
