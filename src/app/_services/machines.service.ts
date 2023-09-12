import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IMachine} from "../_models/machine";
import {combineLatest, map, Observable, of, tap} from "rxjs";
import {UserParams} from "../_models/userParams";
import {CaseMapperService} from "./case-mapper.service";
import {ManufacturersService} from "./manufacturers.service";
import {IManufacturer} from "../_models/manufacturer";
import {IMachineFullData} from "../_models/machine-card-data";

@Injectable({
  providedIn: 'root'
})
export class MachinesService {
  baseUrl: string = environment.apiUrl;
  machines: IMachine[] = [];
  constructor(private http: HttpClient, private caseMapperService: CaseMapperService, private manufacturersService: ManufacturersService) { }

  private mapMachine(machine: IMachine) {
    return {...machine, purchasedAt: new Date(machine.purchasedAt)};
  }
  getMachines(userParams: UserParams) {
    if(this.machines.length > 0 && !userParams.isRefreshing)
      return of(this.machines);
    return this.http.get<IMachine[]>(`${this.baseUrl}machines/`).pipe(
      tap((response) => {
        this.machines = response.map(this.mapMachine);
      }),
      map(_response => {
        return this.machines;
      })
    );
  }

  getMachine(id: number) {
    const machine = this.machines.find((machineElement)=> machineElement.id === id);
    if(machine !== undefined)
      return of(machine);
    const machineId = String(id);
    return this.http.get<IMachine>(`${this.baseUrl}machines/${machineId}`).pipe(
      map(response => {
        return this.mapMachine(response);
      })
    );
  }

  updateMachine(machine: IMachine) {
    const machineDTO = this.caseMapperService.toSnakeCase(machine);
    return this.http.put(`${this.baseUrl}machines/`, machineDTO).pipe(
      map(() => {
        const index = this.machines.findIndex((machineElement)=> machineElement.id === machine.id);
        this.machines[index] = {...this.machines[index], ...machine};
      })
    );
  }


  deletePhoto(machineId: number) {
    return this.http.delete(`${this.baseUrl}machines/${machineId}/images`).pipe(
      map(() => {
        const index = this.machines.findIndex((machineElement)=> machineElement.id === machineId);
        if (index === -1)
          return;
        this.machines[index].imageUrl = undefined;
      })
    );
  }

  addMachineImageUrl(machineId: number, imageUrl: string) {
    const index = this.machines.findIndex((machineElement)=> machineElement.id === machineId);
    if (index === -1)
      return this.getMachine(machineId);
    this.machines[index].imageUrl = imageUrl;
    return of(this.machines[index]);
  }

  deleteMachine(id: number) {
    const machineId = String(id);
    return this.http.delete(`${this.baseUrl}machines/${machineId}`).pipe(
      map(() => {
        this.machines = this.machines.filter((machineElement)=> machineElement.id !== id);
      })
    );
  }

  addMachine(machine: IMachine) {
    const machineDTO = this.caseMapperService.toSnakeCase(machine);
    return this.http.post<IMachine>(`${this.baseUrl}machines/`, machineDTO).pipe(
      map((response) => {
        const newMachine = this.mapMachine(response);
        console.log({newMachine})
        this.machines.push(newMachine);
        return response;
      })
    );
  }

  getMachinesFullData(userParams: UserParams): Observable<IMachineFullData[]> {
    return combineLatest([
      this.getMachines(userParams),
      this.manufacturersService.getManufacturers(),
    ]).pipe(
      map(([machines, manufacturers]) => {
        const manufacturersIndex: Record<number, IManufacturer> = {};
        manufacturers.forEach((manufacturer) => {
          manufacturersIndex[manufacturer.id] = manufacturer;
        });

        return machines.map((machine: IMachine) => ({
          ...machine,
          manufacturerName: manufacturersIndex[machine.manufacturerId]?.name || "Unknown",
        }));
      })
    );
  }

  getMachineFullData(id: number): Observable<IMachineFullData> {
    return combineLatest([
      this.getMachine(id),
      this.manufacturersService.getManufacturers(),
    ]).pipe(
      map(([machine, manufacturers]) => {
        return {
          ...machine,
          manufacturerName: manufacturers.find((manufacturer) => manufacturer.id === machine.manufacturerId)?.name,
        };
      })
    );
  }
}
