import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MachinesService} from "../../_services/machines.service";
import {ManufacturersService} from "../../_services/manufacturers.service";
import {IManufacturer} from "../../_models/manufacturer";
import {IMachine} from "../../_models/machine";
import {percentValidator} from "../../utils/form-validations";

@Component({
  selector: 'app-machine-add',
  templateUrl: './machine-add.component.html',
  styleUrls: ['./machine-add.component.css']
})
export class MachineAddComponent implements OnInit{
  manufacturers: IManufacturer[] = [];
  machineForm: FormGroup;
  machineStatusOptions: { label: string; value: string }[] = [{value: "0", label: "Inactive"},{value: "1", label: "Active"}]
  constructor(private rout: Router, private machinesService: MachinesService, private formBuilder: FormBuilder, private manufacturesService: ManufacturersService) {
    this.machineForm = this.formBuilder.group({
      name: [null as null | string, Validators.required],
      capacityInPercent: [null as  null | number, [Validators.required, percentValidator()]],
      purchasedAt: [new Date(), Validators.required],
      status: [null as  null | string, Validators.required],
      yearOfManufacture: [null as  null | number, Validators.required],
      manufacturerId: [null as  null | string, Validators.required],
    });
  }

  ngOnInit() {
    this.loadManufacturers();
  }

  private loadManufacturers() {
    this.manufacturesService.getManufacturers().subscribe({
      next: manufacturers => {
        this.manufacturers = manufacturers;
      }
    })
  }
  addMachine() {
    const machine: IMachine = {...this.machineForm.value };
    this.machinesService.addMachine(machine).subscribe({
      next: () => {
        this.rout.navigateByUrl("/machines");
      }
    })
  }


  onPurchasedAtChange($event: Date | null) {
    if($event == null)
      return;
    this.machineForm.patchValue({
      purchasedAt: $event
    })
    this.machineForm.markAsDirty();
  }

  statusChange($event: { label: string; value: string }): void {
    this.machineForm.patchValue({
      status: $event.value
    })
    this.machineForm.markAsDirty();
  }

  manufacturersChange($event: IManufacturer) {
    this.machineForm.patchValue({
      manufacturerId: $event.id
    })
    this.machineForm.markAsDirty();
  }

  getManufacturerName(manufacturerId: number | undefined): string {
    if(manufacturerId == null)
      return "Not Provided Yet";
    const manufacturer = this.manufacturers.find(m => m.id == manufacturerId);
    return manufacturer?.name ?? "Unknown";

  }

  touchedFormProperty(property: string) {
    this.machineForm.get(property)?.markAsTouched();
  }

  getStatus() {
    const status = this.machineForm.get('status')?.value;
    return status == null ? "Not Provided Yet" :
      status === '0' ? 'Inactive' : 'Active';
  }
}
