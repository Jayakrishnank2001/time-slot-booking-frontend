import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    const userToken = authService.getToken('userToken');
    const adminToken = authService.getToken('adminToken');
    const currentUrl = state.url;

    if (currentUrl.includes('user')) {
        if (userToken) {
            return true;
        } else {
            router.navigate(['/login']);
            return false;
        }
    } else if (currentUrl.includes('admin')) {
        if (adminToken) {
            return true;
        } else {
            router.navigate(['/login']);
            return false;
        }
    }

    router.navigate(['/login']); // Redirect to login for any other case
    return false;
};