import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { CustomerModule } from './customer/customer.module';
import { VendorModule } from './vendor/vendor.module';


@NgModule({
    imports: [
        SharedModule,
        CustomerModule,
        VendorModule,
    ],
    exports: [],
    declarations: [
    ],
    providers: [],
})
export class IntranetModule { }
