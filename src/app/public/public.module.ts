import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';

import { HomeComponent } from './home/containers/home.component';
import { PublicComponent } from './public.component';
import { InfoComponent } from './footer-links/containers/info/info.component';
import { AboutusComponent } from './footer-links/components/about-us/about-us.component';
import { FaqsComponent } from './footer-links/components/faqs/faqs.component';
import { PrivacityComponent } from './footer-links/components/privacity/privacity.component';
import { TermsconditionsComponent } from './footer-links/components/termsconditions/termsconditions.component';
import { AssociatesComponent } from './footer-links/components/associates/associates.component';
import { ContactusComponent } from './footer-links/containers/contact-us/contact-us.component';
import { RegisterComponent } from './register/containers/register.component';
import { FormvendorComponent } from './register/components/form/vendors/form-vendor.component';
import { FormcustomerComponent } from './register/components/form/customers/form-customer.component';
import { ConfirmationdialogcustomerComponent } from './register/components/confirmation-dialog-customer/confirmation-dialog-customer.component';
import { ConfirmationdialogvendorComponent } from './register/components/confirmation-dialog-vendor/confirmation-dialog-vendor.component';
import { ViewproductComponent } from './products-views/view-product/view-product.component';
import { AllproductsComponent } from './products-views/all-products/all-products.component';
import { BusinessComponent } from './products-views/business/business.component';
import { WidgetcategoriesComponent } from './home/components/widget-categories/widget-categories.component';
import { WidgetsuscriptionComponent } from './home/components/widget-suscription/widget-suscription.component';
import { byDatePipe } from './home/components/widget-product/pipes/byDate.pipe';
import { byNamePipe } from './home/components/widget-product/pipes/byName.pipe';
import { productByDateComponent } from './home/components/widget-product/byDate/productByDate.component';
import { productsByNameComponent } from './home/components/widget-product/byName/productsByName.component';
import { orderByPipe } from './products-views/all-products/pipes/orderby.pipe';
import { ViewserviceComponent } from './products-views/view-servics/view-service.component';
import { createticketComponent } from './products-views/view-servics/createTicket/createTicket.component';
import { ServicsorderByPipe } from './products-views/all-servics/pipes/servics-orderby.pipe';
import { AllservicsComponent } from './products-views/all-servics/all-servics.component';
import { ProductsbusinessByDateComponent } from './products-views/business/components/widget-product/byDate/products-businessByDate.component';
import { ServicesbusinessbyDatePipe } from './products-views/business/components/widget-service/pipes/services-businessbyDate.pipe';
import { ServicesbusinessDateComponent } from './products-views/business/components/widget-service/byDate/services-businessByDate.component';
import { ProductsbusinessbyDatePipe } from './products-views/business/components/widget-product/pipes/products-businessbyDate.pipe';

@NgModule({
    imports: [
        PublicRoutingModule,
        SharedModule
    ],
    exports: [        
        ViewproductComponent,
        AllproductsComponent,
        BusinessComponent,
        ViewserviceComponent,
        createticketComponent,
    ],
    declarations: [
        PublicComponent,
        HomeComponent,
        RegisterComponent,
        FormvendorComponent,
        FormcustomerComponent,
        InfoComponent,
        AboutusComponent,
        FaqsComponent,
        PrivacityComponent,
        TermsconditionsComponent,
        AssociatesComponent,
        ContactusComponent,
        ConfirmationdialogcustomerComponent,
        ConfirmationdialogvendorComponent,
        ViewproductComponent,
        ViewserviceComponent,
        createticketComponent,
        AllproductsComponent,
        WidgetcategoriesComponent,
        WidgetsuscriptionComponent,
        BusinessComponent,
        productByDateComponent,
        productsByNameComponent,
        byDatePipe,
        byNamePipe,
        orderByPipe,
        ServicsorderByPipe,
        AllservicsComponent,
        ProductsbusinessByDateComponent,
        ServicesbusinessDateComponent,
        ServicesbusinessbyDatePipe,
        ProductsbusinessbyDatePipe,
    ],
    providers: [],
})
export class PublicModule {
    constructor(){}
}
