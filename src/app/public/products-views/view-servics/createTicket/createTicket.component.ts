import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Servics } from 'src/app/core/shared/models/service.model';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { ServicsService } from 'src/app/core/shared/services/servics/servics.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-createticket',
    templateUrl: './createTicket.component.html',
    styleUrls: ['./createTicket.component.scss']
})

export class createticketComponent implements OnInit {
    
    constructor(private cookietoken:CookiesTokenService, private fb: FormBuilder, private route: ActivatedRoute, private servicsServices: ServicsService, private router:Router) { }
    insertTicketCustomerForm : FormGroup | any;
    insertTicketVendorForm : FormGroup | any;
    isLogged: boolean | any;
    roleLogged: string | any;
    service_id: string | any;
    routeSub: Subscription | any; 
    currentService: Servics | any;
    ngOnInit() {

        this.routeSub = this.route.params.subscribe(params => {
            this.service_id = params['id']
            this.servicsServices.getService(this.service_id).subscribe(res => this.currentService = res[0])
        });

        this.isLogged = this.cookietoken.isLogged();
        this.roleLogged = this.cookietoken.getUser().role;
    

        this.insertTicketVendorForm = this.fb.group ({
            vendor_id: this.cookietoken.getUser().vend,
            service_id: this.service_id,
            seller_id: ['', Validators.required],
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            comment: ['', Validators.required],
        });

        this.insertTicketCustomerForm = this.fb.group ({
            cust_id: this.cookietoken.getUser().cust,
            service_id: this.service_id,
            seller_id: ['', Validators.required],
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            comment: ['', Validators.required],
        });
    }


    insertTicket(){
        var orderValue = (<HTMLInputElement>document.getElementById('seller')).value;
        if(this.cookietoken.getUser().vend != null){
            this.insertTicketVendorForm.patchValue({
                seller_id: orderValue.toString()
            });
            this.servicsServices.createTicketVendor(this.insertTicketVendorForm.value).subscribe(result =>{
                if(!result['insert']){
                    Swal.fire({
                        title: 'Error, Inteta De Nuevo',
                        icon:'error'
                    })
                }
                else{
                  Swal.fire({
                      title: 'Ticket Enviado, Espera A Que El Vendedor Se Ponga En Contacto Contigo',
                      icon:'success'
                  }).then(() => {
                        this.router.navigate(['/account-vendor/ticketsservice']);
                    });
                }
            })
        }
        if(this.cookietoken.getUser().cust != null){
            this.insertTicketCustomerForm.patchValue({
                seller_id: orderValue.toString()
            });
            this.servicsServices.createTicketCustomer(this.insertTicketCustomerForm.value).subscribe(result =>{
                if(!result['insert']){
                    Swal.fire({
                        title: 'Error, Inteta De Nuevo',
                        icon:'error'
                    })
                }
                else{
                  Swal.fire({
                      title: 'Ticket Enviado, Espera A Que El Vendedor Se Ponga En Contacto Contigo',
                      icon:'success'
                  }).then(() => {
                        this.router.navigate(['/account/ticketsservice']);
                    });
                }
            })
        }
    }

}