import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL=environments.baseURL

  constructor(private _http: HttpClient) { }
  
  getUserData(userId: string) {
    return this._http.get<IUser>(`${this.baseURL}/user-details/${userId}`)
  }

}
