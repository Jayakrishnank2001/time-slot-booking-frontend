import { FormGroup, FormArray } from '@angular/forms';

export function resetForm(form: FormGroup) {
  form.reset();
  
  Object.keys(form.controls).forEach(key => {
    const control = form.get(key);
    control?.setErrors(null);
    control?.markAsUntouched();
    control?.markAsPristine();

    if (control instanceof FormGroup) {
      resetForm(control);
    }

    if (control instanceof FormArray) {
      control.controls.forEach(arrayControl => {
        if (arrayControl instanceof FormGroup) {
          resetForm(arrayControl);
        } else {
          arrayControl.setErrors(null);
          arrayControl.markAsUntouched();
          arrayControl.markAsPristine();
        }
      });
    }
  });
}