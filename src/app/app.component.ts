import {Component, OnInit} from '@angular/core';
import {AccountService} from "./_services/account.service";
import {IUser} from "./_models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'Machines Dashboard App';

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.setCurrentUser();
  }


  setCurrentUser() {
    const userString = localStorage.getItem("user");
    const user: IUser = userString != null ? JSON.parse(userString) : null;
    this.accountService.setCurrentUser(user);
  }
}


