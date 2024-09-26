import { Component, OnInit } from '@angular/core';
import { IBooking } from '../../models/booking';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { IResponse } from '../../models/model';
import Swal from 'sweetalert2';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-booked-slots',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './booked-slots.component.html',
  styleUrl: './booked-slots.component.css'
})
export class BookedSlotsComponent implements OnInit {

  bookedSlots: IBooking[] = []
  userId!: string | null

  constructor(private _userService: UserService,
    private _authService: AuthService,
  private _snackBarService:SnackbarService) { }

  ngOnInit(): void {
    this.getBookedSlots()
  }

  getBookedSlots() {
    this.userId = this._authService.extractUserIdFromToken('userToken')
    if (this.userId)
      this._userService.getBookedSlots(this.userId).subscribe({
        next: (res: IBooking[]) => {
          this.bookedSlots = res
        }
      })
  }

  cancelBooking(bookingId: string): void {
    void Swal.fire({
      text: 'Do you want to cancel the booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed)
        this._userService.cancelBooking(bookingId).subscribe({
          next: (res: IResponse) => {
            this._snackBarService.openSnackBar(res.message)
            this.getBookedSlots()
          }
        })
    })
  }

}
