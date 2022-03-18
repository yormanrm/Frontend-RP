import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './core/shared/components/not-found/not-found.component';

import { HasRoleGuard } from './core/shared/guards/has-role.guard';
import { IsAuthenticatedGuard } from './core/shared/guards/is-authenticated.guard';
import { CartcheckoutComponent } from './intranet/cart/cart-checkout/cart-checkout.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: 'account', canActivate:[IsAuthenticatedGuard, HasRoleGuard], data: {role: 'Customer' }, loadChildren: () => import('./intranet/customer/customer.module').then(m => m.CustomerModule) },
  { path: 'account-vendor', canActivate:[IsAuthenticatedGuard, HasRoleGuard], data: {role: 'Vendor' }, loadChildren: () => import('./intranet/vendor/vendor.module').then(m => m.VendorModule) },
  { path: 'checkout', canActivate:[ IsAuthenticatedGuard ], component: CartcheckoutComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }