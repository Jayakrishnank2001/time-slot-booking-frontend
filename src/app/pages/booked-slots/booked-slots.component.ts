import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booked-slots',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './booked-slots.component.html',
  styleUrl: './booked-slots.component.css'
})
export class BookedSlotsComponent implements OnInit {

  ngOnInit(): void {
    
  }
  
}
