import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/product-list/product-list.component').then((m) => m.ProductListComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./components/product-detail/product-detail.component').then((m) => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/shopping-cart/shopping-cart.component').then((m) => m.ShoppingCartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./components/checkout/checkout.component').then((m) => m.CheckoutComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then((m) => m.AboutComponent)
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin/admin.component').then((m) => m.AdminComponent)
  },
  { path: '**', redirectTo: '' }
];
