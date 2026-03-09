import { HttpRequest, HttpHandlerFn, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';

/**
 * HTTP interceptor for network and API-level error handling.
 * Shows user feedback via MatSnackBar and rethrows for caller handling.
 */
export function httpErrorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message =
        error.error?.message ||
        (error.status === 0
          ? 'Network error. Please check your connection.'
          : `Request failed: ${error.status} ${error.statusText || 'Unknown error'}.`);
      snackBar.open(message, 'Close', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return throwError(() => error);
    })
  );
}
