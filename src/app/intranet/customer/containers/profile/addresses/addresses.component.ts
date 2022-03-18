import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/core/shared/models/address.model';
import { Customer } from 'src/app/core/shared/models/customer.model';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss']
})

export class AddressesComponent implements OnInit {
    constructor(private userService: UsersService, private fb: FormBuilder, private cookietoken: CookiesTokenService) { }

    currentCustomer: Customer | any;
    addresses: Address | any;
    addressForm : FormGroup | any;
    ngOnInit() { 
        this.loadAddresses();
        this.addressForm = this.fb.group ({
            cust_id: this.cookietoken.getUser().cust,
            address: ['', Validators.required ]
        });
    }

    loadAddresses(){
        this.userService.getCustomer().subscribe(res=>{
            this.currentCustomer = res[0];
            this.userService.getCustomerAddresses().subscribe(addresses =>this.addresses = addresses)
        });
    }

    registerAddress(){
        this.userService.insertCustomerAddress(this.addressForm.value).subscribe(result =>{
            if(!result['insertaddress']){
                Swal.fire({
                    title: 'Error Al Agregar, Intenta Nuevamente',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Direccion Agregada!',
                    icon:'success'
                }).then(() => {
                    this.reloadPage();
                });
            }
        });
    }

    deleteAddress(address_id : string){
        this.userService.deleteCustomerAddress(address_id).subscribe(result =>{
            if(!result['delete']){
                Swal.fire({
                    title: 'Error Intenta De Nuevo',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Direccion Eliminada',
                    icon:'success'
                }).then(() => {
                    this.reloadPage();
                });
            }
        });
    }

    reloadPage(){
        window.location.reload();
    }
}