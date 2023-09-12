import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {IUser} from "../_models/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  setCurrentUser(user: IUser | null) {
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUserSource.next(user);
  }


  login(model: any) {
    return this.http.post<IUser>(this.baseUrl + "accounts/login", model).pipe(
      map((user: IUser) => {
        if(user) {
          this.setCurrentUser(user);
        }
      })
    );
  }
  register(model: any) {
    return this.http.post<IUser>(this.baseUrl + "accounts/register", model).pipe(
      map((user: IUser) => {
        if(user) {
          this.setCurrentUser(user);
        }
        return user;
    })
    )
  }

  logout() {
    // localStorage.removeItem("user");
    this.setCurrentUser(null);
  }
}
