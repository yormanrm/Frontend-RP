import { NgModule } from '@angular/core';
import { MyaccountComponent } from './containers/myaccount/myaccount.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { EditprofileComponent } from './containers/profile/edit-profile/editprofile.component';
import { AddressesComponent } from './containers/profile/addresses/addresses.component';
import { EditcredentialsComponent } from './containers/profile/edit-credentials/editcredentials.component';
import { AccountComponent } from './account.component';
import { VendorRoutingModule } from './vendor-routing.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { ProductsComponent } from './containers/products/products.component';
import { InsertproductComponent } from './containers/products/components/modal-insertProduct/modal-insertproduct.component';
import { EditproductComponent } from './containers/products/components/edit-product/editproduct.component';
import { EditbusinessComponent } from './containers/edit-business/edit-business.component';
import { EditaddressComponent } from './containers/profile/addresses/edit-address/edit-address.component';
import { ServicsComponent } from './containers/servics/servics.component';
import { InsertservicsComponent } from './containers/servics/components/modal-insertServics/modal-insertservics.component';
import { EditservicsComponent } from './containers/servics/components/edit-servics/editservics.component';
import { TicketsrequestComponent } from './containers/tickets-request/tickets-request.component';
import { TicketsserviceComponent } from './containers/tickets-services/tickets-services.component';
import { SuscriptionComponent } from './containers/suscription/suscription.component';
import { ShoppinghistoryComponent } from './containers/shoppinghistory/shoppinghistory.component';
import { SalesComponent } from './containers/saleshistory/saleshistory.component';
import { ViewTicketRequestCustomerComponent } from './containers/tickets-request/view-ticket-request-customer/modal-ticketcustomer.component';
import { ViewTicketRequestVendorComponent } from './containers/tickets-request/view-ticket-request-vendor/modal-ticketvendor.component';

@NgModule({
    imports: [
        VendorRoutingModule,
        SharedModule
    ],
    exports: [
        MyaccountComponent,
        ProfileComponent,
        EditprofileComponent,
        AddressesComponent,
        EditcredentialsComponent,
        ProductsComponent,
        InsertproductComponent,
        EditproductComponent,
        EditbusinessComponent,
        EditaddressComponent,
        ServicsComponent,
        InsertservicsComponent,
        EditservicsComponent,
        TicketsrequestComponent,
        TicketsserviceComponent,
        SuscriptionComponent,
        ShoppinghistoryComponent,
        SalesComponent,
        ViewTicketRequestCustomerComponent,
        ViewTicketRequestVendorComponent
    ],
    declarations: [
        MyaccountComponent,
        ProfileComponent,
        EditprofileComponent,
        AddressesComponent,
        EditcredentialsComponent,
        AccountComponent,
        ProductsComponent,
        InsertproductComponent,
        EditproductComponent,
        EditbusinessComponent,
        EditaddressComponent,
        ServicsComponent,
        InsertservicsComponent,
        EditservicsComponent,
        TicketsrequestComponent,
        TicketsserviceComponent,
        SuscriptionComponent,
        ShoppinghistoryComponent,
        SalesComponent,
        ViewTicketRequestCustomerComponent,
        ViewTicketRequestVendorComponent
    ],
    providers: [],
})
export class VendorModule { }
