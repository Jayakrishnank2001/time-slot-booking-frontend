import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { SnackbarService } from '../../services/snackbar.service';
import { IResponse } from '../../models/model';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent implements OnInit {

  isOTPVisible = false;
  otpForm!: FormGroup
  email!: string

  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private _snackBarService: SnackbarService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.otpForm = this._fb.group({
      otp: ['', [Validators.required]]
    })
    this._route.queryParams.subscribe(params => {
      this.email = params['email'];
      const message = params['message']
      if (message) {
        this._snackBarService.openSnackBar(message)
        this._router.navigate([])
      }
    });
  }


  toggleOTPVisibility() {
    this.isOTPVisible = !this.isOTPVisible;
  }

  onSubmit() {
    if (this.otpForm.valid) {
      const formData = this.otpForm.getRawValue()
      this._authService.verifyOTP(formData.otp, this.email).subscribe({
        next: (res: IResponse) => {
          if (res.status === 'success') {
            this._router.navigate(['/login'], {
              queryParams: { message: 'Registration successful! Please log in.' }
            })
          } else {
            console.log(res, res.message)
            this._snackBarService.openSnackBar(res.message)
          }
        }
      })
    }
  }

  resendOTP() {
    this._authService.resendOTP(this.email).subscribe({
      next: (res: IResponse) => {
        this._snackBarService.openSnackBar(res.message)
      }
    })
  }

}
