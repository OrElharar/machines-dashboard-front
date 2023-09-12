import { Component, Input, Output, EventEmitter } from '@angular/core';
import {IMachineFullData} from "../../_models/machine-card-data";

@Component({
  selector: 'app-machine-card',
  templateUrl: './machine-card.component.html',
  styleUrls: ['./machine-card.component.css']
})
export class MachineCardComponent {
  @Input() machine: IMachineFullData | undefined;
  @Input() buttonText: string = "Edit";
  @Input() buttonDisabled: boolean = false;
  @Output() buttonClicked = new EventEmitter<void>();

  constructor() {}

  onClickButton() {
    this.buttonClicked.emit();
  }
}
