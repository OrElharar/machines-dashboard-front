import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent {
  @Input() format: string = 'yyyy-MM-dd HH:mm';
  @Input() value: Date = new Date();
  @Input() header: string | undefined;
  @Input() maxDate: Date  = new Date();
  @Output() valueChange = new EventEmitter<Date>();

  constructor() { }

  onValueChange(value: Date) {
    this.valueChange.emit(value);
  }
}
