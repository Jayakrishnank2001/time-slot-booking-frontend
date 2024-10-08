import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'Close', duration: number = 4000): void {
    this._snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    })
  }
}
