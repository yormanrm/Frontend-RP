import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/core/shared/models/address.model';
import { User } from 'src/app/core/shared/models/user.model';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { UsersService } from 'src/app/core/shared/services/users/users.service';

@Component({
    selector: 'cart-user',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent implements OnInit{
    constructor(private cookietoken: CookiesTokenService, private userService: UsersService, private fb: FormBuilder) { }



    @Output() shipmentData = new EventEmitter<any>();
    addresses: Address | any;
    defaultaddress: Address | any;
    currentUser: User | any;
    shipmentForm: FormGroup | any;



    ngOnInit() { 


        this.loadAddresses();
        this.loadUserInfo();


        this.shipmentForm = this.fb.group({
            name: ['', Validators.required ],
            paternal: ['', Validators.required ],
            maternal: ['', Validators.required ],
            email: ['', Validators.required ],
            phone1: ['', Validators.required ],
            phone2: [''],
            address: ['', Validators.required ],
        });


    }


    loadAddresses(){
        if(this.cookietoken.isLogged()){
            if(this.cookietoken.getUser().vend != null){
                this.userService.getVendorAddresses().subscribe( addresses => {
                    this.addresses = addresses;
                });
            }
            if(this.cookietoken.getUser().cust != null){
                this.userService.getCustomerAddresses().subscribe( addresses => {
                    this.addresses = addresses;
                });
            }
        }
    }



    loadUserInfo(){
        if(this.cookietoken.isLogged()){
            if(this.cookietoken.getUser().vend != null){
                this.userService.getVendor().subscribe( vendor => this.currentUser = vendor[0] );
            }
            if(this.cookietoken.getUser().cust != null){
                this.userService.getCustomer().subscribe( customer => this.currentUser = customer[0] );
            }
        }
    }
    
    

    shipmentDataSend(){
        if(this.shipmentForm.controls['address'].value.length != 0 ){
            this.shipmentData.emit(this.shipmentForm.value);
        }
        else{
            if(this.cookietoken.getUser().vend != null){
                this.userService.getVendorDefaultAddress().subscribe( address => {
                    this.defaultaddress = address[0];
                    const values = Object.keys(this.defaultaddress).map(key => this.defaultaddress[key]);
                    this.shipmentForm.patchValue({
                        address: values.toString()
                    })
                    this.shipmentData.emit(this.shipmentForm.value);
                });
            }
            if(this.cookietoken.getUser().cust != null){
                this.userService.getCustomerDefaultAddress().subscribe( address => {
                    this.defaultaddress = address[0];
                    const values = Object.keys(this.defaultaddress).map(key => this.defaultaddress[key]);
                    this.shipmentForm.patchValue({
                        address: values.toString()
                    })
                    this.shipmentData.emit(this.shipmentForm.value);
                });
            }
        }
    }



    reloadPage(){
            window.location.reload()
    }


    
}