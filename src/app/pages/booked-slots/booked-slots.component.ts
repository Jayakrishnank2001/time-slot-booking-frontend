import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { IBooking } from '../../models/booking';
import { IResponse } from '../../models/model';
import { SnackbarService } from '../../services/snackbar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booked-slots',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './booked-slots.component.html',
  styleUrl: './booked-slots.component.css'
})
export class BookedSlotsComponent implements OnInit {

  userId!: string | null
  bookedSlots: IBooking[] = []

  constructor(private _userService: UserService,
    private _authService: AuthService,
    private _snackBarService: SnackbarService) { }

  ngOnInit(): void {
    this.getBookedSlots()
  }

  getBookedSlots() {
    this.userId = this._authService.extractUserIdFromToken('token')
    if (this.userId) {
      this._userService.getBookedSlots(this.userId).subscribe({
        next: (res: IBooking[]) => {
          this.bookedSlots = res
        }
      })
    }
  }

  cancelBooking(bookingId: string) {
    void Swal.fire({
      text: 'Do you want to cancel this slot?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this._userService.cancelBooking(bookingId).subscribe({
          next: (res: IResponse) => {
            this._snackBarService.openSnackBar(res.message)
            this.getBookedSlots()
          }
        })
      }
    })
  }

}
