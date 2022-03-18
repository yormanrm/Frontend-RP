import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { EditbusinessComponent } from './containers/edit-business/edit-business.component';
import { MyaccountComponent } from './containers/myaccount/myaccount.component';
import { EditproductComponent } from './containers/products/components/edit-product/editproduct.component';
import { ProductsComponent } from './containers/products/products.component';
import { EditaddressComponent } from './containers/profile/addresses/edit-address/edit-address.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { SaledetailsComponent } from './containers/saleshistory/sale-details/sale-details.component';
import { SalesComponent } from './containers/saleshistory/saleshistory.component';
import { EditservicsComponent } from './containers/servics/components/edit-servics/editservics.component';
import { ServicsComponent } from './containers/servics/servics.component';
import { PurchasedetailComponent } from './containers/shoppinghistory/purchase-detail/purchasedetail.component';
import { ShoppinghistoryComponent } from './containers/shoppinghistory/shoppinghistory.component';
import { SuscriptionComponent } from './containers/suscription/suscription.component';
import { TicketsrequestComponent } from './containers/tickets-request/tickets-request.component';
import { ViewTicketRequestCustomerComponent } from './containers/tickets-request/view-ticket-request-customer/modal-ticketcustomer.component';
import { ViewTicketRequestVendorComponent } from './containers/tickets-request/view-ticket-request-vendor/modal-ticketvendor.component';
import { TicketsserviceComponent } from './containers/tickets-services/tickets-services.component';

const routes : Routes = [
  { path: '', component: AccountComponent, children:
    [
      { path: 'account-home', component: MyaccountComponent },
      { path: 'editprofile', component: ProfileComponent },
      { path: 'suscription', component: SuscriptionComponent },
      { path: 'editaddress/:id', component: EditaddressComponent  },
      { path: 'editbusiness', component: EditbusinessComponent },
      { path: 'shoppinghistory', component: ShoppinghistoryComponent, 
        children: [
          { path: 'purchase-details', component: PurchasedetailComponent }
        ] 
      },
      { path: 'editproduct/:id', component: EditproductComponent},
      { path: 'products', component: ProductsComponent },
      { path: 'saleshistory', component: SalesComponent, 
      children: [
        { path: 'sale-details', component: SaledetailsComponent }
      ] 
      },
      { path: 'servics', component: ServicsComponent },
      { path: 'editservics/:id', component: EditservicsComponent },
      { path: 'viewticketrequestcustomer/:id', component: ViewTicketRequestCustomerComponent },
      { path: 'viewticketrequestvendor/:id', component: ViewTicketRequestVendorComponent },
      { path: 'ticketsservice', component: TicketsserviceComponent },
      { path: 'ticketsrequest', component: TicketsrequestComponent },
    ]
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class VendorRoutingModule {}