import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { MyaccountComponent } from './containers/myaccount/myaccount.component';
import { EditaddressComponent } from './containers/profile/addresses/edit-address/edit-address.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { PurchasedetailComponent } from './containers/shoppinghistory/purchase-detail/purchasedetail.component';
import { ShoppinghistoryComponent } from './containers/shoppinghistory/shoppinghistory.component';
import { TicketsserviceComponent } from './containers/tickets-services/tickets-services.component';

const routes : Routes = [
  { path: '', component: AccountComponent, children:
    [
      { path: 'account-home', component: MyaccountComponent },
      { path: 'editprofile', component: ProfileComponent },
      { path: 'editaddress/:id', component: EditaddressComponent  },
      { path: 'shoppinghistory', component: ShoppinghistoryComponent, 
        children: [
          { path: 'purchase-details', component: PurchasedetailComponent }
        ] 
      },
      { path: 'ticketsservice', component: TicketsserviceComponent },
    ]
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}