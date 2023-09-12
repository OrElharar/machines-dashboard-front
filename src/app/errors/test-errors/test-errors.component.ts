import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent {
  baseUrl = "https://localhost:5001/api/";
  validationsErrorMessages: string[] = [];
    constructor(private http: HttpClient) { }

    get404Error() {
        this.http.get(this.baseUrl + "buggy/not-found").subscribe({
            next: _response => {},
            error: error => console.log(error)
        });
    }

    get400Error() {
        this.http.get(this.baseUrl + "buggy/bad-request").subscribe({
            next: _response => {},
            error: error => console.log(error)
        });
    }

    get500Error() {
        this.http.get(this.baseUrl + "buggy/server-error").subscribe({
            next: _response => {},
            error: error => console.log(error)
        });
    }

    get401Error() {
        this.http.get(this.baseUrl + "buggy/auth").subscribe({
            next: _response => {},
            error: error => console.log(error)
        });
    }

    get400ValidationError() {
        this.http.post(this.baseUrl + "accounts/register", {}).subscribe({
            next: _response => {},
            error: error => {
              console.log(error);
              this.validationsErrorMessages = error;
            }
        });
    }
}
