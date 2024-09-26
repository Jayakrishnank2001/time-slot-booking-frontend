import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ITimeSlot } from '../models/slot';
import { IResponse } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseURL=environments.baseURL

  constructor(private _http: HttpClient) { }
  
  createSlot(slotData: ITimeSlot) {
    return this._http.post<IResponse>(`${this.baseURL}/create-slot`,slotData)
  }
}
