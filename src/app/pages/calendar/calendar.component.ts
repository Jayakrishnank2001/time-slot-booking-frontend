import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  selectedDate: Date | null = null;
  availableSlots: string[] = [];
  dateClass = (date: Date): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today ? 'disabled-date' : '';
  }

  viewAvailableSlots() {
    if (this.selectedDate) {
      this.availableSlots = ['10:00 AM - 11:00 AM', '12:00 PM - 01:00 PM'];
    }
  }
}
