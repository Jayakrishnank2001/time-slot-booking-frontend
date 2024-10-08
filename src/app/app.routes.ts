import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { OtpComponent } from './pages/otp/otp.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { authGuard } from './guards/auth.guard';
import { BookedSlotsComponent } from './pages/booked-slots/booked-slots.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'otp',
        component: OtpComponent
    },
    {
        path: 'user',
        component: UserLayoutComponent,
        canActivate:[authGuard],
        children: [
            {
                path: 'calendar',
                component: CalendarComponent
            },
            {
                path: 'booked-slots',
                component:BookedSlotsComponent
            }
        ]
    }
];
