import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit {

  isOTPVisible = false;
  otpForm!: FormGroup

  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router) { }

  ngOnInit(): void {
    this.otpForm = this._fb.group({
      otp: ['', [Validators.required]]
    })
  }


  toggleOTPVisibility() {
    this.isOTPVisible = !this.isOTPVisible;
  }

  onSubmit() {
    
  }

  resendOTP() {
    
  }

}
