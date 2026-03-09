import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ProductService } from '../../services/product.service';
import { Product, Category } from '../../models/product.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  categories: Category[] = [];
  model = {
    name: '',
    description: '',
    price: null as number | null,
    originalPrice: null as number | null,
    category: '',
    image: '',
    quantity: 10,
    inStock: true,
    rating: 4,
    reviews: 0,
    discount: null as number | null,
    releaseDate: new Date().toISOString().slice(0, 10)
  };

  minPrice = 0.01;
  maxPrice = 999999.99;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.productService.getCategories().subscribe(cats => (this.categories = cats));
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.snackBar.open('Please fix form errors (required fields and valid price range).', 'Close', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }

    const price = Number(this.model.price);
    if (price < this.minPrice || price > this.maxPrice) {
      this.snackBar.open(`Price must be between ${this.minPrice} and ${this.maxPrice}.`, 'Close', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    const product = this.productService.addProduct({
      name: this.model.name,
      description: this.model.description,
      price,
      originalPrice: this.model.originalPrice ? Number(this.model.originalPrice) : undefined,
      category: this.model.category,
      image: this.model.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      inStock: this.model.inStock,
      quantity: this.model.quantity,
      rating: this.model.rating,
      reviews: this.model.reviews,
      discount: this.model.discount != null ? Number(this.model.discount) : undefined,
      releaseDate: new Date(this.model.releaseDate)
    });

    this.snackBar.open(`Product "${product.name}" added to catalog.`, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
    form.resetForm({
      name: '',
      description: '',
      price: null,
      originalPrice: null,
      category: '',
      image: '',
      quantity: 10,
      inStock: true,
      rating: 4,
      reviews: 0,
      discount: null,
      releaseDate: new Date().toISOString().slice(0, 10)
    });
  }
}
