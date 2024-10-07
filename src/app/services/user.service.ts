import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { IBooking, SlotRes } from '../models/booking';
import { IResponse } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environments.baseURL

  constructor(private _http: HttpClient) { }

  getUserData(userId: string) {
    return this._http.get<IUser>(`${this.baseURL}/user-details/${userId}`)
  }

  getSlots(date:string,userId:string) {
    return this._http.get<SlotRes>(`${this.baseURL}/get-slots?date=${date}&userId=${userId}`)
  }

  bookSlot(userId: string, timeSlotId: string, invitee: string, bookingDate: string, endTime:string) {
    
    return this._http.post<IResponse>(`${this.baseURL}/book-slot`, { userId, timeSlotId, invitee, bookingDate, endTime })
  }

  getBookedSlots(userId:string) {
    return this._http.get<IBooking[]>(`${this.baseURL}/get-bookedSlots/${userId}`)
  }

  cancelBooking(bookingId: string) {
    return this._http.put<IResponse>(`${this.baseURL}/cancel-booking`,{bookingId})
  }




}
