import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/containers/home.component';
import { PublicComponent } from './public.component';

import { InfoComponent } from './footer-links/containers/info/info.component';
import { TermsconditionsComponent } from './footer-links/components/termsconditions/termsconditions.component';
import { PrivacityComponent } from './footer-links/components/privacity/privacity.component';
import { FaqsComponent } from './footer-links/components/faqs/faqs.component';
import { AssociatesComponent } from './footer-links/components/associates/associates.component';
import { AboutusComponent } from './footer-links/components/about-us/about-us.component';
import { ContactusComponent } from './footer-links/containers/contact-us/contact-us.component';
import { RegisterComponent } from './register/containers/register.component';
import { ViewproductComponent } from './products-views/view-product/view-product.component';
import { AllproductsComponent } from './products-views/all-products/all-products.component';
import { BusinessComponent } from './products-views/business/business.component';
import { ViewserviceComponent } from './products-views/view-servics/view-service.component';
import { AllservicsComponent } from './products-views/all-servics/all-servics.component';

const routes : Routes = [
    { path: '', component: PublicComponent, children:
        [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'info', component: InfoComponent, children:
                [
                    {path: 'aboutus', component: AboutusComponent},
                    {path: 'faqs', component: FaqsComponent},
                    {path: 'privacity', component: PrivacityComponent},
                    {path: 'termsconditions', component: TermsconditionsComponent},
                    {path: 'associates', component:AssociatesComponent},
                ] 
            },
            { path: 'contactus', component: ContactusComponent },
            { path: "viewproduct/:id", component: ViewproductComponent },
            { path: "viewservice/:id", component: ViewserviceComponent },
            { path: "allproducts/:search" , component: AllproductsComponent},
            { path: "allproducts" , component: AllproductsComponent},
            { path: "allservics/:search" , component: AllservicsComponent},
            { path: "allservics" , component: AllservicsComponent},
            { path: "business/:id" , component: BusinessComponent}
        ]
    }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
