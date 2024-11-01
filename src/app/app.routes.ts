import { Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'products/:filter', component: ProductsComponent },
  { path: 'product/form/:Code/:StoreCode/:id', component: ProductFormComponent }
];
