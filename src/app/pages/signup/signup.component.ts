import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateByTrimming } from '../../helpers/validations';
import { emailValidators, mobileValidators } from '../../shared/validators';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { IResponse } from '../../models/model';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  isPasswordVisible = false;

  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _snackBarService:SnackbarService) { }

  ngOnInit(): void {
    this.signupForm = this._fb.group({
      userName: ['',[Validators.required]],
      email: ['', [validateByTrimming(emailValidators)]],
      phone: ['',[validateByTrimming(mobileValidators)]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData=this.signupForm.getRawValue()
      this._authService.userSignup(formData).subscribe({
        next: (res:IResponse) => {
          if (res.status === 'success') {
            const email = this.signupForm.get('email')!.value;
            this._router.navigate(['/otp'],{ queryParams: { email: email,message:'OTP sent to Email' } })
          } else {
            this._snackBarService.openSnackBar(res.message)
          }
        }
      })
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}
