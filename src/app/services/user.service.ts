import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { ISlotResponse } from '../models/slot';
import { IResponse } from '../models/model';
import { IBooking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environments.baseURL

  constructor(private _http: HttpClient) { }

  getUserData(userId: string) {
    return this._http.get<IUser>(`${this.baseURL}/user-details/${userId}`)
  }

  getTimeSlots(date: Date) {
    return this._http.get<ISlotResponse>(`${this.baseURL}/get-timeSlots?date=${date}`)
  }

  bookTimeSlot(slotId: string, userId: string) {
    return this._http.post<IResponse>(`${this.baseURL}/book-time-slot`, { slotId, userId })
  }

  getBookedSlots(userId: string) {
    return this._http.get<IBooking[]>(`${this.baseURL}/booked-slots/${userId}`)
  }

  cancelBooking(bookingId: string) {
    return this._http.put<IResponse>(`${this.baseURL}/cancel-booking`, { bookingId })
  }

}
