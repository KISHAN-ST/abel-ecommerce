import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Cart } from '../../models/product.model';

export interface CheckoutConfirmData {
  cart: Cart;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

@Component({
  selector: 'app-checkout-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>shopping_cart</mat-icon>
      Confirm Order
    </h2>
    <mat-dialog-content>
      <p>Please review your order before placing it.</p>
      <div class="summary">
        <div class="row"><span>Items ({{ data.cart.itemCount }}):</span><span>{{ data.subtotal | currency }}</span></div>
        <div class="row"><span>Tax:</span><span>{{ data.tax | currency }}</span></div>
        <div class="row"><span>Shipping:</span><span>{{ data.shipping | currency }}</span></div>
        <div class="row total"><span>Total:</span><span>{{ data.total | currency }}</span></div>
      </div>
      <p class="confirm-text">Do you want to place this order?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">
        <mat-icon>check_circle</mat-icon>
        Place Order
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .summary { margin: 1rem 0; }
    .row { display: flex; justify-content: space-between; padding: 0.25rem 0; }
    .row.total { font-weight: bold; font-size: 1.1rem; margin-top: 0.5rem; }
    .confirm-text { margin-top: 1rem; }
    [mat-dialog-title] { display: flex; align-items: center; gap: 0.5rem; }
  `]
})
export class CheckoutConfirmDialogComponent {
  readonly data: CheckoutConfirmData = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<CheckoutConfirmDialogComponent>);

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
