import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IManufacturer} from "../_models/manufacturer";
import {map, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManufacturersService {
  baseUrl: string = environment.apiUrl;
  manufacturers: IManufacturer[] = [];
  constructor(private http: HttpClient) { }

  getManufacturers() {
    if(this.manufacturers.length > 0)
      return of(this.manufacturers);
    return this.http.get<IManufacturer[]>(`${this.baseUrl}manufacturers/`).pipe(
      map(response => {
        this.manufacturers = response;
        return response;
      })
    );
  }
}
