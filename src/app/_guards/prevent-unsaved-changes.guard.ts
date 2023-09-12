import { CanDeactivateFn } from '@angular/router';

export const preventUnsavedChangesGuard: CanDeactivateFn<any> = (component) => {
  if (component.machineForm?.dirty) {
    return confirm("Are you sure you want to continue? \nAny unsaved changes will be lost");
  }
  return true;
};
