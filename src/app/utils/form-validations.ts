import {ValidatorFn, AbstractControl } from '@angular/forms';

export function percentValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (isNaN(value) || value < 0 || value > 100) {
      return {percentInvalid: true};
    }
    return null;
  };
}
