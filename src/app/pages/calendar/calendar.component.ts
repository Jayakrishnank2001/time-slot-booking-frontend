import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ISlotResponse, ITimeSlot } from '../../models/slot';
import { io } from 'socket.io-client';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { IResponse } from '../../models/model';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit, OnDestroy {
  selectedDate: Date | null = null;
  availableSlots: ITimeSlot[] = [];
  today = new Date()
  selectedSlot!: ITimeSlot
  private socket: any;
  userId!: string | null

  constructor(private _userService: UserService,
    private _authService: AuthService,
    private _snackBarService: SnackbarService,
    private _router: Router) { }

  ngOnInit(): void {
    this.socket = io('ws://localhost:3000');
    this.socket.on('timeSlotBooked', (updatedSlot: ITimeSlot) => {
      console.log(updatedSlot)
      this.viewAvailableSlots();
    });
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Socket connection closed');
    }
  }

  viewAvailableSlots() {
    if (this.selectedDate) {
      this._userService.getTimeSlots(this.selectedDate).subscribe({
        next: (res: ISlotResponse) => {
          this.availableSlots = res.timeSlots.sort((a: any, b: any) => {
            const timeA = new Date(`1970-01-01T${a.startTime}:00`).getTime();
            const timeB = new Date(`1970-01-01T${b.startTime}:00`).getTime();
            return timeA - timeB;
          });
          if (this.availableSlots.length === 0) {
            this._snackBarService.openSnackBar('No time slots available')
          }
        }
      })
    }
  }

  selectTimeSlot(slot: ITimeSlot) {
    this.selectedSlot = slot;
  }

  bookTimeSlot() {
    void Swal.fire({
      text: 'Do you want to book this time slot?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      this.userId = this._authService.extractUserIdFromToken('userToken')
      if (result.isConfirmed && this.userId) {
        this._userService.bookTimeSlot(this.selectedSlot._id, this.userId).subscribe({
          next: (res: IResponse) => {
            this._snackBarService.openSnackBar(res.message)
            this._router.navigate(['/user/blocked-slots'])
          }
        })
      }
    })
  }

  changeDate() {
    this.availableSlots = []
  }

}
