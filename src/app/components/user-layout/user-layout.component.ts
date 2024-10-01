import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from "../../pages/calendar/calendar.component";

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, RouterModule, CommonModule, CalendarComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent implements OnInit {

  userId!: string | null
  userData: IUser = {}
  avatarImage: string = 'assets/images/people-profile-graphic_24911-21373.avif';

  constructor(private _userService: UserService,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
    this.userId = this._authService.extractUserIdFromToken('token')
    if (this.userId)
      this._userService.getUserData(this.userId).subscribe({
        next: (res) => {
          this.userData = res
        }
      })
  }

  logOut() {
    this._authService.clearToken('token')
    this._router.navigate(['/login'])
  }

  isActive(link: string): boolean {
    return this._router.url.includes(link.toLowerCase());
  }

}
