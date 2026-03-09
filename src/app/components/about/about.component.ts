import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="about-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>About Abel Store</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Your one-stop shop for quality products at great prices.</p>
          <p>Browse our product catalog, add items to your cart, and manage your orders with ease.</p>
        </mat-card-content>
        <mat-card-actions>
          <a mat-raised-button color="primary" routerLink="/products">
            <mat-icon>storefront</mat-icon>
            Browse Products
          </a>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .about-container {
        padding: 2rem;
        max-width: 600px;
        margin: 0 auto;
      }
    `
  ]
})
export class AboutComponent {}
