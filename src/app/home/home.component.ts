import { Component } from '@angular/core';
import {AccountService} from "../_services/account.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoginModeEnabled: boolean = false;
  constructor(public accountsService: AccountService) { }

  ngOnInit(): void { }


  loginToggle() {
    this.isLoginModeEnabled = !this.isLoginModeEnabled;
  }

  cancelRegistrationMode($isLoginModeEnabled: boolean) {
    this.isLoginModeEnabled = $isLoginModeEnabled;
  }
}
