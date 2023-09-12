import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MachinesService} from "../../_services/machines.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {percentValidator} from "../../utils/form-validations";
import {IMachineFullData} from "../../_models/machine-card-data";

@Component({
  selector: 'app-machine-edit',
  templateUrl: './machine-edit.component.html',
  styleUrls: ['./machine-edit.component.css']
})
export class MachineEditComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if(this.machineForm?.dirty) {
      $event.returnValue = true;
    }
  }
  machineForm: FormGroup;
  machine: IMachineFullData | undefined;
  machineStatusOptions: { label: string; value: string }[] = [{value: "0", label: "Inactive"},{value: "1", label: "Active"}]
  constructor(private rout: ActivatedRoute, private machinesService: MachinesService, private formBuilder: FormBuilder) {
    this.machineForm = this.formBuilder.group({
      name: ['', Validators.required],
      capacityInPercent: [null, [Validators.required, percentValidator()]],
      purchasedAt: [null, Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadMachine();
  }

  private loadFormData() {
    if(this.machine == null)
      return;
    this.machineForm.patchValue({
      name: this.machine.name,
      capacityInPercent: this.machine.capacityInPercent,
      purchasedAt: this.machine.purchasedAt,
      status: this.machine.status
    })
    this.machineForm.markAsPristine();
  }

  private loadMachine() {
    const machineIdString = this.rout.snapshot.paramMap.get("id");
    if(machineIdString == null)
      return;
    const machineId = parseInt(machineIdString);
    this.machinesService.getMachineFullData(machineId).subscribe({
      next: machine => {
        if(machine == null)
          return;
        this.machine = machine;
          this.loadFormData();
      }
    })
  }
  updateMachine() {
    const updateMachine = {...this.machine, ...this.machineForm.value}
    this.machinesService.updateMachine(updateMachine).subscribe({
      next: () => {
        this.loadMachine();
      }
    })
  }

  resetForm() {
    if(this.machine == null)
      return;
    this.machineForm.reset(this.machine);
  }

  onPurchasedAtChange($event: Date | null) {
    if(this.machine == null || $event == null)
      return;
    this.machineForm.patchValue({
      purchasedAt: $event
    })
    this.machineForm.markAsDirty();
  }

  statusChange($event: { label: string; value: string }): void {
    if(this.machine == null)
      return;
    this.machineForm.patchValue({
      status: $event.value
    })
    this.machineForm.markAsDirty();
  }
}
