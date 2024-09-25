import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateByTrimming } from '../../helpers/validations';
import { emailValidators, mobileValidators } from '../../shared/validators';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  isPasswordVisible = false;

  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signupForm = this._fb.group({
      userName: ['',[Validators.required]],
      email: ['', [validateByTrimming(emailValidators)]],
      phone: ['',[validateByTrimming(mobileValidators)]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
   
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}
