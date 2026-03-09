import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';
import { HighlightDiscountDirective, PriceHighlightDirective } from '../../directives/product.directive';

/**
 * Presentational product card component.
 * Uses @Input for product data and @Output for add-to-cart communication
 * (parent/cart coordination via event binding).
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HighlightDiscountDirective,
    PriceHighlightDirective
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  /** Product to display - input from parent (product-list) */
  @Input({ required: true }) product!: Product;

  /** Emitted when user adds product to cart - parent handles via CartService */
  @Output() addToCart = new EventEmitter<Product>();
}
