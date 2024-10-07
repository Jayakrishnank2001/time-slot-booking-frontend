import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { DecodedToken, IAuthResponse, IResponse } from '../models/model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
  
export class AuthService {

  baseURL = environments.baseURL
  private email: string = ''; 

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

  resendOTP(email: string) {
    return this._http.post<IResponse>(`${this.baseURL}/resend-otp`,{email})
  }

  extractUserIdFromToken(tokenKey: string) :string | null{
    const token = this.getToken(tokenKey)
    let decodedToken: DecodedToken
    if (token) {
      decodedToken = jwtDecode(token) 
      return decodedToken.id
    }
    return null
  }

  getToken(tokenKey: string): string | null {
    return localStorage.getItem(tokenKey)
  }

  setToken(tokenKey: string, token: string): void {
    localStorage.setItem(tokenKey, token)
  }

  clearToken(tokenKey: string): void {
    localStorage.removeItem(tokenKey)
  }


}
