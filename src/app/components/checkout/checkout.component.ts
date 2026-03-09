import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { CartService } from '../../services/cart.service';
import { Cart, CustomerInfo } from '../../models/product.model';
import { CheckoutConfirmDialogComponent, CheckoutConfirmData } from './checkout-confirm-dialog.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cart: Cart | null = null;
  orderPlaced = false;
  orderId = '';

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      if (cart.items.length === 0 && !this.orderPlaced) {
        this.router.navigate(['/cart']);
      }
    });
  }

  initializeForm(): void {
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5,}$/)]]
    });
  }

  getTaxAmount(): number {
    return this.cart ? parseFloat((this.cart.total * 0.1).toFixed(2)) : 0;
  }

  getShippingCost(): number {
    return this.cart && this.cart.total > 100 ? 0 : 15;
  }

  getFinalTotal(): number {
    if (!this.cart) return 0;
    return parseFloat((this.cart.total + this.getTaxAmount() + this.getShippingCost()).toFixed(2));
  }

  placeOrder(): void {
    if (this.checkoutForm.valid && this.cart) {
      const dialogData: CheckoutConfirmData = {
        cart: this.cart,
        subtotal: this.cart.total,
        tax: this.getTaxAmount(),
        shipping: this.getShippingCost(),
        total: this.getFinalTotal()
      };

      const dialogRef = this.dialog.open(CheckoutConfirmDialogComponent, {
        width: '450px',
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed && this.cart) {
          const customerInfo: CustomerInfo = this.checkoutForm.value;
          this.cartService.checkout(customerInfo).subscribe(order => {
            this.orderId = order.id;
            this.orderPlaced = true;
            this.snackBar.open('Order placed successfully!', 'Close', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });
          });
        }
      });
    } else {
      this.snackBar.open('Please fill all fields correctly', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}
