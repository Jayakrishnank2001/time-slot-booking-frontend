import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { validateByTrimming } from '../../helpers/validations';
import { emailValidators } from '../../shared/validators';
import { SnackbarService } from '../../services/snackbar.service';
import { IAuthResponse } from '../../models/model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  isPasswordVisible = false;

  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _snackBarService: SnackbarService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
    this._route.queryParams.subscribe(params => {
      let message = params['message'];
      if (message) {
        this._snackBarService.openSnackBar(message)
        this._router.navigate([])
      }
    });
  }

  private initializeForm(): void {
    this.loginForm = this._fb.group({
      email: ['', [validateByTrimming(emailValidators)]],
      password: ['', [Validators.required]]
    })
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.getRawValue()
      this._authService.userLogin(formData.email, formData.password).subscribe({
        next: (res: IAuthResponse) => {
          if (res.status === 'success' && res.role === 'user') {
            this._authService.setToken('userToken', res.token)
            this._router.navigate(['/user/calendar'])
          } else {
            if (res.status === 'success' && res.role === 'admin') {
              this._authService.setToken('adminToken', res.token)
              this._router.navigate(['/admin/create-slot'])
            } else {
              this._snackBarService.openSnackBar(res.message)
            }
          }
        }
      })
    }
  }




}

