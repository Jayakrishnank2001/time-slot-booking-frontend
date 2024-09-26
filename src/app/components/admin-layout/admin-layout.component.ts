import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, RouterModule, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent implements OnInit{

  email: string = 'admin@gmail.com'
  avatarImage: string = 'assets/images/people-profile-graphic_24911-21373.avif';

  constructor(private _authService: AuthService,
    private _router:Router) { }
  
  ngOnInit(): void {
    
  }

  logOut():void {
    this._authService.clearToken('adminToken')
    this._router.navigate(['/login'])
  }

}
