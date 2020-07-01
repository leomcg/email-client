import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {

  constructor(private authService: AuthService) {}

  validate = (control: FormControl) => {
    const value = control.value;

    return this.authService.usernameAvailable(value)
    .pipe(
      map(response => {
        if (response.available) {
          return null;
        }
      }),
      catchError((err) => {
        if (err.error.username) {
          // of operator: shortcut to create an observable
          return of({ nonUniqueUsername: true });
        } else {
          return of({noConnection: true });
        }
      })
    );
  }
}
