import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { IResponse } from '../../models/model';
import { SnackbarService } from '../../services/snackbar.service';
import { resetForm } from '../../helpers/formResetHelper';

@Component({
  selector: 'app-create-slot',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './create-slot.component.html',
  styleUrl: './create-slot.component.css',
})
export class CreateSlotComponent implements OnInit {

  slotForm!: FormGroup
  minDate!: Date

  constructor(private _fb: FormBuilder,
    private _adminService: AdminService,
    private _snackBarService: SnackbarService) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.slotForm = this._fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      status: ['available', Validators.required]
    });
    this.minDate = new Date();
  }

  onSubmit(): void {
    if (this.slotForm.valid) {
      const formData = this.slotForm.getRawValue()
      this._adminService.createSlot(formData).subscribe({
        next: (res: IResponse) => {
          if (res.status === 'success') {
            this._snackBarService.openSnackBar(res.message)
            resetForm(this.slotForm)
          } else {
            this._snackBarService.openSnackBar(res.message)
          }
        }
      })
    }
  }

}
