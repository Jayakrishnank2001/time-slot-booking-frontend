import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const userToken = authService.getToken('token');
    if (userToken) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};