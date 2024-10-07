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
  calculatedEndTime!: string;

  timeOptions = [
    { label: '15 min', value: 15 },
    { label: '30 min', value: 30 },
    { label: '45 min', value: 45 },
    { label: '1 hr', value: 60 }
  ];
  selectedDuration=30


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
    this.calculateEndTime()
  }

  scheduleEvent() {
    this.userId = this._authService.extractUserIdFromToken('token')
    if (this.detailsForm.valid && this.userId && this.selectedDate) {
      const formData = this.detailsForm.getRawValue()
      this._userService.bookSlot(this.userId, this.seletedSlot._id, formData.name,this.selectedDate,this.calculatedEndTime).subscribe({
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

  calculateEndTime(): void {
    const startTime = this.convertTimeToDate(this.seletedSlot.startTime);
    const endTime = new Date(startTime.getTime() + this.selectedDuration * 60000);
    this.calculatedEndTime = this.formatTime(endTime);
  }

  convertTimeToDate(time: string): Date {
    const [hoursMinutes, modifier] = time.split(' ');
    let [hours, minutes] = hoursMinutes.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  formatTime(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const modifier = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${formattedMinutes} ${modifier}`;
  }

}
