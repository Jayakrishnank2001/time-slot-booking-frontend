import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { IAuthResponse, IResponse } from '../models/model';

@Injectable({
  providedIn: 'root'
})
  
export class AuthService {

  baseURL=environments.baseURL

  constructor(private _http: HttpClient) { }
  
  userLogin(email:string,password:string) {
    return this._http.post<IAuthResponse>(`${this.baseURL}/login`,{email,password})
  }

  userSignup(formData: IUser) {
    return this._http.post<IResponse>(`${this.baseURL}/signup`,formData)
  }

  verifyOTP(otp:string,email:string) {
    return this._http.post<IResponse>(`${this.baseURL}/verify-otp`,{otp,email})
  }

  resendOTP(email:string) {
    return this._http.post<IResponse>(`${this.baseURL}/resend-otp`,{email})
  }



}
