import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent implements OnInit {

  userId!: string | null
  userData: IUser = {}

  constructor(private _userService: UserService,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
    this.userId = this._authService.extractUserIdFromToken('userToken')
    if (this.userId)
      this._userService.getUserData(this.userId).subscribe({
        next: (res) => {
          this.userData = res
          console.log(this.userData)
        }
      })
  }

  logOut() {
    this._authService.clearToken('userToken')
    this._router.navigate(['/login'])
  }

}
