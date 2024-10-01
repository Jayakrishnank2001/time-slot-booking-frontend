import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ISlot, SlotRes } from '../../models/booking';
import { validateByTrimming } from '../../helpers/validations';
import { emailValidators } from '../../shared/validators';
import { IResponse } from '../../models/model';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {

  selectedDate: string | null = null;
  minDate!: Date;
  userData!: IUser
  userId!: string | null
  timeSlots: ISlot[] = []
  seletedSlot!: ISlot
  userName!: string
  userEmail!: string
  showDetailsForm: boolean = false;
  detailsForm!: FormGroup

  constructor(private _authService: AuthService,
    private _userService: UserService,
    private _fb: FormBuilder,
    private _snackBarService: SnackbarService,
    private _router: Router) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.getUserData()
    this.detailsForm = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [validateByTrimming(emailValidators)]],
    })
  }

  getUserData() {
    this.userId = this._authService.extractUserIdFromToken('token')
    if (this.userId)
      this._userService.getUserData(this.userId).subscribe({
        next: (res) => {
          this.userData = res
        }
      })
  }

  onDateSelect(date: string) {
    if(this.userId)
    this._userService.getSlots(date,this.userId).subscribe({
      next: (res: SlotRes) => {
        this.timeSlots = res.slots
        this.selectedDate = date
      }
    })
  }

  selectTimeSlot(slot: ISlot) {
    this.seletedSlot = slot
    this.showDetailsForm = true
  }

  scheduleEvent() {
    this.userId = this._authService.extractUserIdFromToken('token')
    if (this.detailsForm.valid && this.userId && this.selectedDate) {
      const formData = this.detailsForm.getRawValue()
      this._userService.bookSlot(this.userId, this.seletedSlot._id, formData.name,this.selectedDate).subscribe({
        next: (res: IResponse) => {
          if (res.status === 'success') {
            this._snackBarService.openSnackBar(res.message)
            setTimeout(() => {
              this._router.navigate(['/user/booked-slots'])
            }, 2000)
          }
        }
      })
    }
  }

  goBack() {
    this.showDetailsForm = false
  }

}
